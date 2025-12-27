import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Membaca file .env.local agar bisa akses DATABASE_URL
dotenv.config({ path: ".env.local" });

export default defineConfig({
    // Lokasi file schema yang sudah kita bahas sebelumnya
    // Pastikan path ini SESUAI dengan lokasi file schema kamu
    schema: "./db/schema.ts",

    // Folder output migrasi (otomatis dibuat nanti)
    out: "./drizzle",

    // Jenis database
    dialect: "postgresql",

    // Koneksi database
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});