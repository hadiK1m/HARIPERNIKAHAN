import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

// Perhatikan nama fungsinya sekarang "proxy", bukan "middleware"
export async function proxy(request: NextRequest) {
    // Logic update session Supabase tetap sama
    return await updateSession(request);
}

export const config = {
    // Matcher tetap sama: jalan di semua route kecuali static files
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};