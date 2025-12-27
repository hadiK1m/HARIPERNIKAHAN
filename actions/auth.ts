"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

// Schema Validasi Input Login
const LoginSchema = z.object({
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
});

export async function loginAction(formData: FormData) {
    const supabase = await createClient();

    // 1. Ambil data dari FormData
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    // 2. Validasi data menggunakan Zod
    const validated = LoginSchema.safeParse(data);

    if (!validated.success) {
        // FIX: Gunakan .issues bukan .errors untuk Zod versi terbaru
        return { error: validated.error.issues[0].message };
    }

    // 3. Proses Login ke Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    });

    if (error) {
        return { error: "Email atau password salah. Silakan coba lagi." };
    }

    // 4. Redirect ke Dashboard jika sukses
    redirect("/dashboard");
}

export async function logoutAction() {
    const supabase = await createClient();

    // Proses Logout
    await supabase.auth.signOut();

    // Kembalikan user ke halaman login
    redirect("/login");
}