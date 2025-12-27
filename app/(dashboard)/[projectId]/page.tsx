import { getProject } from "@/actions/projects";
import { getGuests } from "@/actions/guests";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ProjectOverviewPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;
    const project = await getProject(projectId);
    const guests = await getGuests(projectId);

    if (!project) return null;

    return (
        <div className="space-y-6">
            {/* Kartu Statistik Cepat */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tamu</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{guests.length}</div>
                        <p className="text-xs text-muted-foreground">Orang terdaftar</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Link Undangan</CardTitle>
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium truncate">/{project.slug}</div>
                        <Button variant="link" className="px-0 h-auto text-xs" asChild>
                            <a href={`/invitation/${project.slug}`} target="_blank">Buka Link ↗</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Detail Info Project */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Mempelai</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="font-semibold text-primary">{project.groomName}</div>
                            <div className="text-sm text-muted-foreground">Putra dari {project.groomFather} & {project.groomMother}</div>
                        </div>
                        <div className="font-bold text-center text-muted-foreground">&</div>
                        <div>
                            <div className="font-semibold text-primary">{project.brideName}</div>
                            <div className="text-sm text-muted-foreground">Putri dari {project.brideFather} & {project.brideMother}</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Jadwal Acara</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-semibold">Akad Nikah</div>
                                <div className="text-sm text-muted-foreground">
                                    {project.akadDate ? new Date(project.akadDate).toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" }) : "-"}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
                                    <MapPin className="h-3 w-3 mt-0.5" />
                                    {project.akadAddress || "-"}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-semibold">Resepsi</div>
                                <div className="text-sm text-muted-foreground">
                                    {project.resepsiDate ? new Date(project.resepsiDate).toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" }) : "-"}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
                                    <MapPin className="h-3 w-3 mt-0.5" />
                                    {project.resepsiAddress || "-"}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}