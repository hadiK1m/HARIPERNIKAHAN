"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PlusCircle,
    Settings,
    LogOut,
    Users,
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Buat Undangan",
        href: "/dashboard/new",
        icon: PlusCircle,
    },
    {
        title: "Arsip Pelanggan",
        href: "/dashboard/archives",
        icon: Users,
    },
    {
        title: "Pengaturan",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground hidden md:block">
            <div className="flex h-full flex-col">
                {/* Header Sidebar */}
                <div className="flex h-16 items-center border-b border-sidebar-border px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-sidebar-primary">
                        <FileText className="h-6 w-6" />
                        <span>WeddingOS</span>
                    </Link>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-1 p-4">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Sidebar (User Profile) */}
                <div className="border-t border-sidebar-border p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Admin Wedding</span>
                            <span className="text-xs text-muted-foreground">admin@haripernikahan.com</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    );
}