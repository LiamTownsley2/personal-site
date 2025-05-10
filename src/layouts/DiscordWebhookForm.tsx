import ComponentHeader from "@/components/component-header";
import ContactForm from "@/components/contact-form";

export default function DiscordWebhookForm() {
    return (
        <div className="space-y-6">
            <ComponentHeader title="Send a Message" subtitle="Fill out the form below and I&apos;ll get back to you as soon as possible." />
            <ContactForm />
        </div>
    )
}