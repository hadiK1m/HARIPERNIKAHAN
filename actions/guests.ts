"use server";

import { db } from "@/db/drizzle";
import { guests } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// 1. GET All Guests by Project
export async function getGuests(projectId: string) {
    return await db.query.guests.findMany({
        where: eq(guests.projectId, projectId),
        orderBy: [desc(guests.createdAt)],
    });
}

// 2. BULK ADD Guests (Core Feature)
export async function addBulkGuests(projectId: string, rawNames: string) {
    if (!rawNames.trim()) return { error: "Daftar nama kosong" };

    // Pecah string per baris, bersihkan spasi, filter yang kosong
    const namesList = rawNames
        .split("\n")
        .map((name) => name.trim())
        .filter((name) => name.length > 0);

    if (namesList.length === 0) return { error: "Tidak ada nama valid" };

    // Siapkan data untuk bulk insert
    const dataToInsert = namesList.map((name) => ({
        projectId: projectId,
        name: name,
        slug: crypto.randomUUID().slice(0, 8), // Magic code 8 karakter
    }));

    try {
        await db.insert(guests).values(dataToInsert);
        revalidatePath(`/dashboard/${projectId}/guests`); // Refresh halaman
        return { success: true, count: namesList.length };
    } catch (error) {
        console.error("Gagal insert tamu:", error);
        return { error: "Gagal menyimpan data tamu" };
    }
}

// 3. DELETE Guest
export async function deleteGuest(guestId: string, projectId: string) {
    await db.delete(guests).where(eq(guests.id, guestId));
    revalidatePath(`/dashboard/${projectId}/guests`);
}