"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Plus,
    Search,
    MoreHorizontal,
    CalendarDays,
    Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dummy data untuk UI (Nanti diganti fetch data dari Drizzle)
const projects = [
    {
        id: "1",
        clientName: "Andi & Rini",
        date: "2024-05-20",
        status: "active", // active, draft, completed
        guestsCount: 150,
        slug: "andi-rini",
    },
    {
        id: "2",
        clientName: "Budi & Siti",
        date: "2024-06-12",
        status: "draft",
        guestsCount: 0,
        slug: "budi-siti",
    },
    {
        id: "3",
        clientName: "Dimas & Citra",
        date: "2024-04-10",
        status: "completed",
        guestsCount: 320,
        slug: "dimas-citra",
    },
];

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter sederhana di client side
    const filteredProjects = projects.filter((project) =>
        project.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Kelola semua pesanan undangan digitalmu di sini.
                    </p>
                </div>
                <Link href="/dashboard/new">
                    <Button className="w-full md:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Buat Undangan Baru
                    </Button>
                </Link>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 md:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Cari nama mempelai..."
                        className="pl-9 bg-background"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Project Grid / Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                    <Card key={project.id} className="transition-all hover:border-primary/50 hover:shadow-md">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-semibold">
                                    {project.clientName}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1 text-xs">
                                    <CalendarDays className="h-3 w-3" />
                                    {project.date}
                                </CardDescription>
                            </div>
                            <Badge
                                variant={
                                    project.status === "active" ? "default" :
                                        project.status === "completed" ? "secondary" : "outline"
                                }
                                className="capitalize"
                            >
                                {project.status === "active" ? "Aktif" :
                                    project.status === "completed" ? "Selesai" : "Draft"}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between pt-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Users className="mr-1 h-4 w-4" />
                                    {project.guestsCount} Tamu
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                        <Link href={`/dashboard/${project.id}`}>
                                            <DropdownMenuItem>
                                                Edit Undangan
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href={`/dashboard/${project.id}/guests`}>
                                            <DropdownMenuItem>
                                                Kelola Tamu (Guest Engine)
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem onClick={() => window.open(`/invitation/${project.slug}`, '_blank')}>
                                            Lihat Preview
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                                            Hapus Project
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Tombol Empty State jika search tidak ditemukan */}
                {filteredProjects.length === 0 && (
                    <div className="col-span-full flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                        <p>Tidak ada undangan yang ditemukan.</p>
                        <Button variant="link" onClick={() => setSearchQuery("")}>Reset pencarian</Button>
                    </div>
                )}
            </div>
        </div>
    );
}