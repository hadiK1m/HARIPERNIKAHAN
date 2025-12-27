import { getProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Settings, LayoutDashboard } from "lucide-react";

export default async function ProjectDetailLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ projectId: string }>;
}) {
    // Await params di Next.js 15+
    const { projectId } = await params;

    // Fetch data project untuk judul header
    const project = await getProject(projectId);

    if (!project) {
        return notFound();
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header Navigasi Detail Project */}
            <div className="flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/dashboard" className="hover:text-foreground flex items-center gap-1">
                            <ArrowLeft className="h-3 w-3" /> Kembali
                        </Link>
                        <span>/</span>
                        <span>{project.slug}</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
                </div>

                {/* Menu Tab Navigasi */}
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/${projectId}`}>
                        <Button variant="outline" size="sm" className="gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            Overview
                        </Button>
                    </Link>
                    <Link href={`/dashboard/${projectId}/guests`}>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Users className="h-4 w-4" />
                            Tamu
                        </Button>
                    </Link>
                    <Link href={`/dashboard/${projectId}/edit`}>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Settings className="h-4 w-4" />
                            Edit Info
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Konten Halaman (Overview / Guests / Edit) */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}