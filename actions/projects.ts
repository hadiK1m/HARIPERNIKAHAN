"use server";

import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { createClient } from "@/utils/supabase/server"; // Pastikan utils ini ada, atau gunakan logic auth sendiri
import { redirect } from "next/navigation";
import { z } from "zod";

// 1. Definisikan Schema Validasi (Zod)
const ProjectSchema = z.object({
    name: z.string().min(1, "Nama Project wajib diisi"),
    slug: z.string().min(3, "Slug minimal 3 karakter").regex(/^[a-z0-9-]+$/, "Hanya huruf kecil, angka, dan strip"),
    groomName: z.string().min(1, "Nama Pria wajib diisi"),
    groomFather: z.string().optional(),
    groomMother: z.string().optional(),
    brideName: z.string().min(1, "Nama Wanita wajib diisi"),
    brideFather: z.string().optional(),
    brideMother: z.string().optional(),
    akadDate: z.string().optional(), // Nanti dikonversi ke Date
    akadAddress: z.string().optional(),
    akadMaps: z.string().optional(),
    resepsiDate: z.string().optional(),
    resepsiAddress: z.string().optional(),
    resepsiMaps: z.string().optional(),
});

export async function createProjectAction(formData: FormData) {
    // 2. Cek Autentikasi (Opsional, sesuaikan dengan auth kamu)
    // const supabase = createClient();
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) throw new Error("Unauthorized");

    // Hardcode user ID sementara jika belum setup Auth lengkap
    const userId = "00000000-0000-0000-0000-000000000000"; // Ganti dengan user.id nanti

    // 3. Ambil data dari FormData
    const rawData = {
        name: formData.get("name"),
        slug: formData.get("slug"),
        groomName: formData.get("groomName"),
        groomFather: formData.get("groomFather"),
        groomMother: formData.get("groomMother"),
        brideName: formData.get("brideName"),
        brideFather: formData.get("brideFather"),
        brideMother: formData.get("brideMother"),
        akadDate: formData.get("akadDate"),
        akadAddress: formData.get("akadAddress"),
        akadMaps: formData.get("akadMaps"),
        resepsiDate: formData.get("resepsiDate"),
        resepsiAddress: formData.get("resepsiAddress"),
        resepsiMaps: formData.get("resepsiMaps"),
    };

    // 4. Validasi Data
    const validated = ProjectSchema.parse(rawData);

    // 5. Simpan ke Database Drizzle
    const [newProject] = await db.insert(projects).values({
        userId: userId,
        name: validated.name,
        slug: validated.slug,
        groomName: validated.groomName,
        groomFather: validated.groomFather,
        groomMother: validated.groomMother,
        brideName: validated.brideName,
        brideFather: validated.brideFather,
        brideMother: validated.brideMother,
        // Konversi string date HTML ke Object Date JS
        akadDate: validated.akadDate ? new Date(validated.akadDate) : null,
        resepsiDate: validated.resepsiDate ? new Date(validated.resepsiDate) : null,
        akadAddress: validated.akadAddress,
        akadMaps: validated.akadMaps,
        resepsiAddress: validated.resepsiAddress,
        resepsiMaps: validated.resepsiMaps,
        status: "draft",
    }).returning({ id: projects.id });

    // 6. Redirect ke halaman detail project
    redirect(`/dashboard/${newProject.id}`);
}