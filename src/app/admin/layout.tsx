import type { ReactNode } from "react"
import type { Metadata } from "next"
import { AdminNav } from "@/components/admin-nav"
import { SiteHeader } from "@/layouts/SiteHeader"
import { SiteFooter } from "@/layouts/SiteFooter"

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Manage your portfolio and blog",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <SiteHeader />
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <AdminNav />
                <div className="flex flex-col">
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">{children}</main>
                </div>
            </div>
            <SiteFooter />
        </div>
    )
}
