import { AppSidebar } from "@/components/dashboard/app-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background font-sans">
            <AppSidebar />
            {/* Margin left 64 (16rem) menyesuaikan lebar sidebar (w-64).
        Di mobile nanti bisa kita buat sheet/drawer.
      */}
            <main className="md:ml-64 min-h-screen transition-all duration-300 ease-in-out">
                <div className="container mx-auto p-6 md:p-10 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}