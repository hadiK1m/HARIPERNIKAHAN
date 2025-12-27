"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copy, Link as LinkIcon, Trash2, RefreshCw } from "lucide-react";
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
import { addBulkGuests, deleteGuest } from "@/actions/guests"; // Import Server Action

// Tipe data sesuai Schema Database
type Guest = {
    id: string;
    name: string;
    slug: string;
    isRsvp: boolean | null;
    rsvpStatus: string | null;
};

export default function GuestManager({
    projectId,
    projectSlug,
    initialGuests
}: {
    projectId: string,
    projectSlug: string,
    initialGuests: Guest[]
}) {
    const [guests, setGuests] = useState<Guest[]>(initialGuests);
    const [bulkInput, setBulkInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Fungsi: Tambah Tamu (Bulk)
    const handleBulkAdd = async () => {
        if (!bulkInput.trim()) return;
        setIsProcessing(true);

        // Panggil Server Action
        const result = await addBulkGuests(projectId, bulkInput);

        if (result.success) {
            toast.success(`Berhasil menambahkan ${result.count} tamu!`);
            setBulkInput("");
            // Refresh halaman otomatis terjadi karena revalidatePath di server action
            // Tapi untuk UX instan, kita bisa refresh manual atau update state jika return data
            window.location.reload();
        } else {
            toast.error("Gagal menambah tamu", { description: result.error });
        }

        setIsProcessing(false);
    };

    // Fungsi: Hapus Tamu
    const handleDelete = async (guestId: string) => {
        if (confirm("Yakin hapus tamu ini?")) {
            await deleteGuest(guestId, projectId);
            setGuests(guests.filter(g => g.id !== guestId));
            toast.success("Tamu dihapus.");
        }
    };

    // Fungsi: Copy Link
    const copyLink = (guestSlug: string, guestName: string) => {
        // Format link: domain.com/invitation/slug-project?to=NamaTamu
        // Menggunakan nama tamu (URL Encoded) agar lebih personal
        const link = `${window.location.origin}/invitation/${projectSlug}?to=${encodeURIComponent(guestName)}`;
        navigator.clipboard.writeText(link);
        toast.success("Link disalin!", { description: `Link ${guestName} siap kirim.` });
    };

    // Fungsi: Copy Pesan Massal
    const copyBulkMessage = () => {
        const message = guests.map((g) => {
            const link = `${window.location.origin}/invitation/${projectSlug}?to=${encodeURIComponent(g.name)}`;
            return `Kepada Yth. ${g.name},\nMohon kehadiran Bapak/Ibu/Saudara/i pada acara pernikahan kami. Klik undangan: ${link}`;
        }).join("\n\n--------------------------------\n\n");

        navigator.clipboard.writeText(message);
        toast.success("Semua pesan disalin!", { description: "Siap paste ke WhatsApp." });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* KIRI: Input Area */}
            <Card>
                <CardHeader>
                    <CardTitle>Input Tamu (Copy-Paste)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Paste nama tamu dari WhatsApp/Excel di sini (satu nama per baris).
                    </p>
                    <Textarea
                        placeholder="Budi Santoso&#10;Siti Aminah&#10;Keluarga Besar Pak RT"
                        rows={10}
                        value={bulkInput}
                        onChange={(e) => setBulkInput(e.target.value)}
                        className="font-mono text-sm bg-muted/30"
                    />
                    <Button
                        onClick={handleBulkAdd}
                        disabled={isProcessing || !bulkInput.trim()}
                        className="w-full"
                    >
                        {isProcessing ? (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                            </>
                        ) : (
                            "Generate Magic Links 🪄"
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* KANAN: Daftar Tamu */}
            <Card className="h-fit">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Daftar Tamu ({guests.length})</CardTitle>
                    <Button variant="outline" size="sm" onClick={copyBulkMessage}>
                        <Copy className="mr-2 h-4 w-4" />
                        Salin Semua Pesan
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border max-h-[600px] overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Tamu</TableHead>
                                    <TableHead>Status RSVP</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {guests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                            Belum ada tamu.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    guests.map((guest) => (
                                        <TableRow key={guest.id}>
                                            <TableCell className="font-medium">{guest.name}</TableCell>
                                            <TableCell>
                                                {guest.isRsvp ? (
                                                    <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded-full">
                                                        {guest.rsvpStatus}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground text-xs">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" title="Test Link" onClick={() => window.open(`/invitation/${projectSlug}?to=${encodeURIComponent(guest.name)}`, '_blank')}>
                                                    <LinkIcon className="h-4 w-4 text-blue-500" />
                                                </Button>
                                                <Button variant="ghost" size="icon" title="Copy Link" onClick={() => copyLink(guest.slug, guest.name)}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(guest.id)}>
                                                    <Trash2 className="h-4 w-4" />
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