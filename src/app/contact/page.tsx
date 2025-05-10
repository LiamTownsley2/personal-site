import { SiteFooter } from "@/layouts/SiteFooter";
import { SiteHeader } from "@/layouts/SiteHeader";
import Contact from "@/page_layout/Contact";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <Contact />
            <SiteFooter />
        </div>
    )
}