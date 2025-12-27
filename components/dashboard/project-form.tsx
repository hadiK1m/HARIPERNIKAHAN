"use client";

import { createProjectAction } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function ProjectForm() {
    const [isLoading, setIsLoading] = useState(false);

    // Auto-generate slug dari nama project
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // Hapus simbol aneh
            .trim()
            .replace(/\s+/g, "-"); // Ganti spasi dengan -

        // Set value slug secara manual via DOM (karena ini simple form)
        const slugInput = document.getElementById("slug") as HTMLInputElement;
        if (slugInput && !slugInput.dataset.touched) {
            slugInput.value = slug;
        }
    };

    return (
        <form
            action={createProjectAction}
            onSubmit={() => setIsLoading(true)}
            className="space-y-8"
        >
            <div className="grid gap-8 md:grid-cols-2">

                {/* KOLOM KIRI: Data Utama & Mempelai */}
                <div className="space-y-8">
                    {/* IDENTITAS UTAMA */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Identitas Project</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Project (Internal)</Label>
                                <Input
                                    name="name"
                                    id="name"
                                    placeholder="Contoh: Andi & Rini Wedding"
                                    required
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Link Undangan (Slug)</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">haripernikahan.com/</span>
                                    <Input
                                        name="slug"
                                        id="slug"
                                        placeholder="andi-rini"
                                        required
                                        onFocus={(e) => (e.target.dataset.touched = "true")}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* MEMPELAI PRIA */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Mempelai Pria</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="groomName">Nama Lengkap</Label>
                                <Input name="groomName" id="groomName" placeholder="Dr. Andi Pratama, S.Kom" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="groomFather">Nama Ayah</Label>
                                    <Input name="groomFather" id="groomFather" placeholder="Bpk. Susanto" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="groomMother">Nama Ibu</Label>
                                    <Input name="groomMother" id="groomMother" placeholder="Ibu Lestari" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* MEMPELAI WANITA */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Mempelai Wanita</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="brideName">Nama Lengkap</Label>
                                <Input name="brideName" id="brideName" placeholder="Rini Aulia, S.E" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="brideFather">Nama Ayah</Label>
                                    <Input name="brideFather" id="brideFather" placeholder="Bpk. Hartono" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brideMother">Nama Ibu</Label>
                                    <Input name="brideMother" id="brideMother" placeholder="Ibu Wati" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* KOLOM KANAN: Detail Acara */}
                <div className="space-y-8">
                    {/* AKAD NIKAH */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Acara Akad / Pemberkatan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="akadDate">Tanggal & Jam</Label>
                                <Input type="datetime-local" name="akadDate" id="akadDate" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="akadAddress">Alamat Lengkap</Label>
                                <Textarea name="akadAddress" id="akadAddress" placeholder="Nama Gedung / Masjid..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="akadMaps">Link Google Maps</Label>
                                <Input name="akadMaps" id="akadMaps" placeholder="https://maps.app.goo.gl/..." />
                            </div>
                        </CardContent>
                    </Card>

                    {/* RESEPSI */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Acara Resepsi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="resepsiDate">Tanggal & Jam</Label>
                                <Input type="datetime-local" name="resepsiDate" id="resepsiDate" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="resepsiAddress">Alamat Lengkap</Label>
                                <Textarea name="resepsiAddress" id="resepsiAddress" placeholder="Sama dengan akad..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="resepsiMaps">Link Google Maps</Label>
                                <Input name="resepsiMaps" id="resepsiMaps" placeholder="https://maps.app.goo.gl/..." />
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>

            <Separator />

            <div className="flex items-center justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => window.history.back()}>
                    Batal
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Simpan & Lanjut ke Tamu
                </Button>
            </div>
        </form>
    );
}