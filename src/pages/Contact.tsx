import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Linkedin, Mail, MapPin } from "lucide-react"
import Link from "next/link";
import { JSX } from "react";

type IconType = typeof Github | typeof Linkedin | typeof Mail; // extendable if needed

interface SocialLink {
    href: string;
    label: string;
    icon: IconType;
    newTab?: boolean;
}
export function buildSocialButtons(links: SocialLink[]): JSX.Element[] {
    return links.map(({ href, label, icon: Icon, newTab }) => (
        <Link
            key={href}
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noreferrer" : undefined}
        >
            <Button variant="outline" size="icon">
                <Icon className="h-4 w-4" />
                <span className="sr-only">{label}</span>
            </Button>
        </Link>
    ));
}

export default function Contact() {
    return (
        <main className="flex-1">
            <section className="w-full py-6 md:py-12 lg:py-24">
                {/* <div className="container px-4 md:px-6"> */}
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Have a question or want to work together? Feel free to reach out!
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-2">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">Contact Information</h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Feel free to reach out through any of these channels.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5" />
                                <a href="mailto:liamtownsley43@gmail.com" className="text-sm hover:underline">
                                    liamtownsley43@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5" />
                                <span className="text-sm">Dundee, Scotland</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Connect</h3>
                            <div className="flex gap-4">
                                {buildSocialButtons([
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
                                ])}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">Send a Message</h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Fill out the form below and I&apos;ll get back to you as soon as possible.
                            </p>
                        </div>
                        <ContactForm />
                        {/* MSG FORM */}
                    </div>
                </div>
                <div className="flex justify-center">
                    <Link href="/">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
                {/* </div> */}
            </section>
        </main>
    )
}