"use server";

import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

// --- SCHEMA & VALIDATION ---
const ProjectSchema = z.object({
    name: z.string().min(1, "Nama Project wajib diisi"),
    slug: z.string().min(3, "Slug minimal 3 karakter").regex(/^[a-z0-9-]+$/, "Hanya huruf kecil, angka, dan strip"),
    groomName: z.string().min(1, "Nama Pria wajib diisi"),
    groomFather: z.string().optional(),
    groomMother: z.string().optional(),
    brideName: z.string().min(1, "Nama Wanita wajib diisi"),
    brideFather: z.string().optional(),
    brideMother: z.string().optional(),
    akadDate: z.string().optional(),
    akadAddress: z.string().optional(),
    akadMaps: z.string().optional(),
    resepsiDate: z.string().optional(),
    resepsiAddress: z.string().optional(),
    resepsiMaps: z.string().optional(),
});

// --- ACTIONS ---

// 1. GET Single Project
export async function getProject(id: string) {
    try {
        const data = await db.query.projects.findFirst({
            where: eq(projects.id, id),
        });
        return data;
    } catch (error) {
        return null;
    }
}

// 2. CREATE Project
export async function createProjectAction(formData: FormData) {
    // Hardcode user ID sementara (Nanti ganti dengan auth session user.id)
    const userId = "00000000-0000-0000-0000-000000000000";

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

    const validated = ProjectSchema.parse(rawData);

    const [newProject] = await db.insert(projects).values({
        userId: userId,
        name: validated.name,
        slug: validated.slug,
        // Data Pria
        groomName: validated.groomName,
        groomFather: validated.groomFather,
        groomMother: validated.groomMother,
        // Data Wanita (YANG TADI HILANG)
        brideName: validated.brideName,
        brideFather: validated.brideFather,
        brideMother: validated.brideMother,
        // Acara
        akadDate: validated.akadDate ? new Date(validated.akadDate) : null,
        resepsiDate: validated.resepsiDate ? new Date(validated.resepsiDate) : null,
        akadAddress: validated.akadAddress,
        akadMaps: validated.akadMaps,
        resepsiAddress: validated.resepsiAddress,
        resepsiMaps: validated.resepsiMaps,
        status: "draft",
    }).returning({ id: projects.id });

    redirect(`/dashboard/${newProject.id}`);
}

// 3. DELETE Project
export async function deleteProjectAction(id: string) {
    await db.delete(projects).where(eq(projects.id, id));
    redirect("/dashboard");
}