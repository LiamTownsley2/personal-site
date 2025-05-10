import { ButtonParams } from "@/components/button";
import FooterButtonRow from "@/components/footer-button-row";
import PageHeading from "@/components/page-heading";
import Main from "@/components/page-section";
import SideBySide from "@/components/side-by-side";
import ContactInformation from "@/layouts/ContactInformation";
import DiscordWebhookForm from "@/layouts/DiscordWebhookForm";
import { CONNECT_LINKS, CONTACT_INFORMATION } from "@/lib/config";
import { ArrowLeft } from "lucide-react"

const PAGE_BUTTONS: ButtonParams[] = [
    { href: "/", icon: ArrowLeft, label: "Back to Home", variant: "outline" }
];

export default function Contact() {
    return (
        <Main>
            <PageHeading title="Get in Touch" subtitle="Have a question or want to work together? Feel free to reach out!" />
            <SideBySide>
                <ContactInformation contact={CONTACT_INFORMATION} social={CONNECT_LINKS} />
                <DiscordWebhookForm />
            </SideBySide>
            <FooterButtonRow buttons={PAGE_BUTTONS} />
        </Main>
    )
}