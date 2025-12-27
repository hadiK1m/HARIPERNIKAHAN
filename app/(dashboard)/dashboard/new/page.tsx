import { ProjectForm } from "@/components/dashboard/project-form";

export default function NewProjectPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Buat Undangan Baru</h1>
                <p className="text-muted-foreground">
                    Isi data dasar mempelai dan acara. Anda bisa mengeditnya lagi nanti.
                </p>
            </div>

            <ProjectForm />
        </div>
    );
}