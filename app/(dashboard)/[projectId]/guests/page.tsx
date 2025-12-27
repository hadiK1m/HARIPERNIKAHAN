import { getGuests } from "@/actions/guests";
import { getProject } from "@/actions/projects";
import GuestManager from "@/components/dashboard/guest-manager";
import { notFound } from "next/navigation";

export default async function ProjectGuestsPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;

    // Fetch data project & tamu secara paralel agar cepat
    const [project, guests] = await Promise.all([
        getProject(projectId),
        getGuests(projectId)
    ]);

    if (!project) return notFound();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium">Guest Engine</h2>
                <p className="text-sm text-muted-foreground">
                    Kelola daftar tamu undangan dan hasilkan link unik secara otomatis.
                </p>
            </div>

            <GuestManager
                projectId={projectId}
                projectSlug={project.slug}
                initialGuests={guests}
            />
        </div>
    );
}