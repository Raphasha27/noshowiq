"use client"

import { usePathname } from "next/navigation"
import { Sidebar, MobileNav } from "@/components/sidebar"

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // Define public routes where sidebar should be hidden
    const publicRoutes = ["/", "/login", "/get-started", "/privacy", "/terms", "/learn-more"]
    const isPublicRoute = publicRoutes.includes(pathname)

    if (isPublicRoute) {
        return <main className="min-h-screen">{children}</main>
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 pb-20 md:pb-0">
                {children}
            </main>
            <MobileNav />
        </div>
    )
}
