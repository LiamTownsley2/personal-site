import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link";
import { Button } from "./ui/button";
import { ButtonVarients } from "./button";

type IconType = typeof Github | typeof Linkedin | typeof Mail;
export interface SocialParams {
    href: string;
    label: string;
    icon: IconType;
    newTab?: boolean;
    variant?: ButtonVarients
}
export default function SocialRow(params: SocialParams) {
    return (
        <Link
            key={params.href}
            href={params.href}
            target={params.newTab ? "_blank" : undefined}
            rel={params.newTab ? "noreferrer" : undefined}
        >
            <Button variant={params.variant || "outline"} size="icon">
                <params.icon className="h-4 w-4" />
                <span className="sr-only">{params.label}</span>
            </Button>
        </Link>
    );
}