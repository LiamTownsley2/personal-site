import { ContactParams } from "@/components/contact-row";
import { SocialParams } from "@/components/social-row";
import { Github, Linkedin, Mail, MapPin } from "lucide-react"

export const CONTACT_INFORMATION: ContactParams[] = [
    {
        href: "mailto:liamtownsley43@gmail.com",
        label: "liamtownsley43@gmail.com",
        icon: Mail,
    },
    {
        label: "Dundee, Scotland",
        icon: MapPin
    }
]

export const CONNECT_LINKS: SocialParams[] = [
    {
        href: "https://github.com/LiamTownsley2",
        label: "GitHub",
        icon: Github,
        newTab: true,
    },
    {
        href: "https://www.linkedin.com/in/liam-townsley/",
        label: "LinkedIn",
        icon: Linkedin,
        newTab: true,
    },
    {
        href: "mailto:liamtownsley43@gmail.com",
        label: "Email",
        icon: Mail,
    },
];