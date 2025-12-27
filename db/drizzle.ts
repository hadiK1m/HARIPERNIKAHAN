import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Menggunakan connection string dari .env.local
const connectionString = process.env.DATABASE_URL!;

// Disable prefetch di serverless environment untuk performa
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });