export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
            {/* Container utama di tengah layar dengan lebar maksimum tertentu */}
            <div className="w-full max-w-md space-y-4">
                {children}
            </div>
        </div>
    );
}