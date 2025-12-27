import { pgTable, uuid, text, timestamp, date, boolean, integer } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Tabel Projects (Data Master Undangan)
export const projects = pgTable("projects", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(), // Relasi ke auth.users Supabase
    name: text("name").notNull(), // Nama Project: "Andi & Rini Wedding"

    // URL/Slug unik untuk undangan (misal: haripernikahan.com/andi-rini)
    slug: text("slug").unique().notNull(),

    // Data Mempelai Pria
    groomName: text("groom_name").notNull(),
    groomFather: text("groom_father"),
    groomMother: text("groom_mother"),

    // Data Mempelai Wanita
    brideName: text("bride_name").notNull(),
    brideFather: text("bride_father"),
    brideMother: text("bride_mother"),

    // Detail Acara Akad
    akadDate: timestamp("akad_date"),
    akadAddress: text("akad_address"),
    akadMaps: text("akad_maps"),

    // Detail Acara Resepsi
    resepsiDate: timestamp("resepsi_date"),
    resepsiAddress: text("resepsi_address"),
    resepsiMaps: text("resepsi_maps"),

    // Konten & Media
    quote: text("quote"),
    musicUrl: text("music_url"), // URL file MP3 dari Supabase Storage
    templateId: text("template_id").default("template_a"), // 'template_a' | 'template_b'

    // Status Produksi
    status: text("status").default("draft"), // 'draft', 'production', 'active', 'archived'

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Tabel Guests (The Guest Engine)
export const guests = pgTable("guests", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id").references(() => projects.id, { onDelete: 'cascade' }).notNull(),

    name: text("name").notNull(), // Nama Tamu
    slug: text("slug").unique().notNull(), // Magic Code unik per tamu

    // Status Tamu
    isRsvp: boolean("is_rsvp").default(false),
    rsvpStatus: text("rsvp_status"), // 'hadir', 'tidak_hadir', 'ragu'
    rsvpMessage: text("rsvp_message"), // Ucapan doa

    createdAt: timestamp("created_at").defaultNow(),
});