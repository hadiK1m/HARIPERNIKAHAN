"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Copy, Link as LinkIcon, Save, Trash2, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Tipe data dummy untuk frontend (nanti diganti data dari DB)
type Guest = {
    id: string;
    name: string;
    slug: string;
};

export default function GuestManager({ projectId, projectSlug }: { projectId: string, projectSlug: string }) {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [bulkInput, setBulkInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Fungsi: Generate Magic Link & Simpan (Simulasi Server Action)
    const handleBulkAdd = async () => {
        if (!bulkInput.trim()) return;
        setIsProcessing(true);

        const names = bulkInput.split("\n").filter((n) => n.trim() !== "");

        // Di sini nanti panggil Server Action untuk insert ke DB Drizzle
        // const newGuests = await addGuestsAction(projectId, names);

        // Simulasi Logic Frontend sementara:
        const newGuestsMock = names.map((name) => ({
            id: crypto.randomUUID(),
            name: name.trim(),
            slug: crypto.randomUUID().slice(0, 8), // Magic code pendek
        }));

        setGuests([...newGuestsMock, ...guests]);
        setBulkInput("");
        setIsProcessing(false);
        toast.success(`Berhasil menambahkan ${names.length} tamu!`);
    };

    // Fungsi: Copy Link Undangan Per Tamu
    const copyLink = (guestSlug: string, guestName: string) => {
        // Format link: domain.com/undangan/nama-project?to=magicCode
        const link = `${window.location.origin}/invitation/${projectSlug}?to=${encodeURIComponent(guestName)}`;
        navigator.clipboard.writeText(link);
        toast.success("Link disalin!", { description: `Link untuk ${guestName} siap dikirim.` });
    };

    // Fungsi: Copy Draft Pesan Massal (Format WhatsApp)
    const copyBulkMessage = () => {
        const message = guests.map((g) => {
            const link = `${window.location.origin}/invitation/${projectSlug}?to=${encodeURIComponent(g.name)}`;
            return `Kepada Yth. ${g.name},\nTanpa mengurangi rasa hormat, mohon kehadiran Bapak/Ibu/Saudara/i pada acara pernikahan kami. Info lengkap klik: ${link}\n`;
        }).join("\n--------------------------------\n\n");

        navigator.clipboard.writeText(message);
        toast.success("Semua pesan disalin!", { description: "Siap paste ke WhatsApp." });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* KIRI: Input Area */}
            <Card>
                <CardHeader>
                    <CardTitle>Input Tamu (Bulk)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Paste daftar nama tamu dari WhatsApp di sini (satu nama per baris).
                    </p>
                    <Textarea
                        placeholder="Budi Santoso&#10;Siti Aminah&#10;Pak RT 05"
                        rows={10}
                        value={bulkInput}
                        onChange={(e) => setBulkInput(e.target.value)}
                        className="font-mono text-sm"
                    />
                    <Button
                        onClick={handleBulkAdd}
                        disabled={isProcessing || !bulkInput.trim()}
                        className="w-full"
                    >
                        {isProcessing ? "Memproses..." : "Generate Magic Links 🪄"}
                    </Button>
                </CardContent>
            </Card>

            {/* KANAN: Hasil / Output */}
            <Card className="h-fit">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Daftar Tamu ({guests.length})</CardTitle>
                    <Button variant="outline" size="sm" onClick={copyBulkMessage}>
                        <Copy className="mr-2 h-4 w-4" />
                        Salin Semua Pesan
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border max-h-[500px] overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Tamu</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {guests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-center h-24 text-muted-foreground">
                                            Belum ada tamu. Input di sebelah kiri.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    guests.map((guest) => (
                                        <TableRow key={guest.id}>
                                            <TableCell className="font-medium">{guest.name}</TableCell>
                                            <TableCell className="text-right flex justify-end gap-2">
                                                {/* Tombol Test Link */}
                                                <Button variant="ghost" size="icon" title="Test Link" onClick={() => window.open(`/invitation/${projectSlug}?to=${encodeURIComponent(guest.name)}`, '_blank')}>
                                                    <LinkIcon className="h-4 w-4 text-blue-500" />
                                                </Button>
                                                {/* Tombol Copy Per Baris */}
                                                <Button variant="ghost" size="icon" title="Copy Link" onClick={() => copyLink(guest.slug, guest.name)}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}