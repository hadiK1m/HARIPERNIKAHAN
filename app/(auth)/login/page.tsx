"use client";

import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    // Wrapper function untuk menangani submit form
    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);

        // Memanggil Server Action
        const result = await loginAction(formData);

        if (result?.error) {
            // Tampilkan notifikasi error jika login gagal
            toast.error("Gagal Masuk", {
                description: result.error,
            });
            setIsLoading(false);
        } else {
            // Jika sukses, redirect akan ditangani oleh server action
            // Kita hanya tampilkan toast sebentar
            toast.success("Berhasil Masuk", {
                description: "Mengalihkan ke dashboard...",
            });
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header Logo & Judul */}
            <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Lock className="h-5 w-5" />
                </div>
                <h1 className="text-2xl font-bold">WeddingOS Admin</h1>
                <p className="text-sm text-muted-foreground">
                    Masukkan kredensial Anda untuk masuk ke dashboard.
                </p>
            </div>

            {/* Form Login dalam Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Masukkan email dan password admin Anda.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@haripernikahan.com"
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Masuk Dashboard
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}