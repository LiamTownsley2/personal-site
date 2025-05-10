import ComponentHeader from "@/components/component-header";
import ContactRow, { ContactParams } from "@/components/contact-row";
import SocialList from "@/components/social-list";
import { SocialParams } from "@/components/social-row";

export default function ContactInformation(params: { contact: ContactParams[], social: SocialParams[] }) {
    return (
        <div className="space-y-6">
            <ComponentHeader title="Contact Information" subtitle="Feel free to reach out through any of these channels." />

            {/* Contact Information List */}
            <div className="space-y-4">
                {params.contact.map((info, value) => (
                    <ContactRow key={value} {...info} />
                ))}
            </div>

            {/* Social Links Row */}
            <div className="space-y-2">
                <h3 className="text-xl font-bold">Connect</h3>
                <SocialList socials={params.social} />
            </div>

        </div>
    )
}