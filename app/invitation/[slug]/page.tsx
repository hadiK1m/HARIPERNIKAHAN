import { getProjectBySlug } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Music } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Fitur SEO Next.js: Judul Tab Browser otomatis sesuai nama mempelai
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) return { title: "Undangan Tidak Ditemukan" };
    return {
        title: `The Wedding of ${project.groomName} & ${project.brideName}`,
        description: `Undangan Pernikahan ${project.groomName} & ${project.brideName}`,
    };
}

export default async function InvitationPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ to?: string }>; // Menangkap ?to=NamaTamu
}) {
    const { slug } = await params;
    const { to } = await searchParams; // Ambil nama tamu dari URL

    const project = await getProjectBySlug(slug);

    if (!project) return notFound();

    // Decode nama tamu (hilangkan %20 dll)
    const guestName = to ? decodeURIComponent(to) : "Tamu Undangan";

    return (
        <main className="min-h-screen bg-[#fdfbf7] text-zinc-800 font-sans selection:bg-amber-100">

            {/* HERO SECTION (Cover) */}
            <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 pt-12 pb-24 overflow-hidden">
                {/* Dekorasi Background Sederhana */}
                <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <div className="z-10 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <p className="tracking-[0.2em] text-sm uppercase text-amber-900/80">The Wedding of</p>

                    <h1 className="text-5xl md:text-7xl font-serif text-amber-950">
                        {project.groomName} <span className="text-amber-600/50">&</span> {project.brideName}
                    </h1>

                    <div className="py-6">
                        <div className="inline-block border-y border-amber-900/20 py-4 px-8 backdrop-blur-sm bg-white/30 rounded-lg">
                            <p className="text-sm text-amber-900 mb-2">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
                            {/* NAMA TAMU MUNCUL DI SINI */}
                            <h3 className="text-2xl font-bold text-black">{guestName}</h3>
                        </div>
                    </div>

                    <p className="max-w-md mx-auto text-amber-900/80 italic leading-relaxed">
                        &quot;{project.quote || "Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami."}&quot;
                    </p>

                    {/* Tombol Scroll (Bisa dikembangkan jadi buka undangan) */}
                    <div className="pt-8">
                        <Button className="rounded-full px-8 bg-amber-900 hover:bg-amber-800 text-white shadow-lg animate-bounce">
                            Buka Undangan
                        </Button>
                    </div>
                </div>
            </section>

            {/* DETAIL ACARA SECTION */}
            <section className="py-20 px-6 bg-white border-t border-amber-100">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">

                    {/* Kartu Akad */}
                    <div className="text-center space-y-4 p-8 rounded-2xl bg-amber-50/50 border border-amber-100">
                        <h2 className="font-serif text-3xl text-amber-900">Akad Nikah</h2>
                        <div className="flex justify-center text-amber-600">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">
                                {project.akadDate ? new Date(project.akadDate).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : "Tanggal Belum Diset"}
                            </p>
                            <p className="text-muted-foreground">
                                Pukul {project.akadDate ? new Date(project.akadDate).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) : "--:--"} WIB
                            </p>
                        </div>
                        <div className="text-sm text-zinc-600 px-4">
                            <MapPin className="w-4 h-4 inline-block mr-1 mb-1" />
                            {project.akadAddress || "Alamat belum diisi"}
                        </div>
                        {project.akadMaps && (
                            <Button variant="outline" className="mt-4 border-amber-200 text-amber-800 hover:bg-amber-100" asChild>
                                <a href={project.akadMaps} target="_blank">Lihat Lokasi</a>
                            </Button>
                        )}
                    </div>

                    {/* Kartu Resepsi */}
                    <div className="text-center space-y-4 p-8 rounded-2xl bg-amber-50/50 border border-amber-100">
                        <h2 className="font-serif text-3xl text-amber-900">Resepsi</h2>
                        <div className="flex justify-center text-amber-600">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">
                                {project.resepsiDate ? new Date(project.resepsiDate).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : "Tanggal Belum Diset"}
                            </p>
                            <p className="text-muted-foreground">
                                Pukul {project.resepsiDate ? new Date(project.resepsiDate).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) : "--:--"} WIB
                            </p>
                        </div>
                        <div className="text-sm text-zinc-600 px-4">
                            <MapPin className="w-4 h-4 inline-block mr-1 mb-1" />
                            {project.resepsiAddress || "Alamat belum diisi"}
                        </div>
                        {project.resepsiMaps && (
                            <Button variant="outline" className="mt-4 border-amber-200 text-amber-800 hover:bg-amber-100" asChild>
                                <a href={project.resepsiMaps} target="_blank">Lihat Lokasi</a>
                            </Button>
                        )}
                    </div>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-amber-950 text-amber-100/60 py-12 text-center text-sm">
                <p className="mb-2">Kami yang berbahagia,</p>
                <p className="font-serif text-xl text-amber-50 mb-8">{project.groomName} & {project.brideName}</p>
                <p>Built with WeddingOS Workshop</p>
            </footer>
        </main>
    );
}