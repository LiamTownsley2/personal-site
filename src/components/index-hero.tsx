import Image from "next/image";
import ButtonRow from "./button-row";
import IndexHeader from "./index-header";
import SocialList from "./social-list";
import { CONNECT_LINKS } from "@/lib/config";
import { ArrowRight } from "lucide-react";
import { ButtonParams } from "./button";

const CTA_BUTTONS: ButtonParams[] = [
    {
        href: "/projects",
        icon: ArrowRight,
        label: "View My Work",
        variant: "default",
        className: "inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300",
        rtl_icon: true
    },
    {
        href: "/contact",
        label: "Contact Me",
        variant: "outline"
    }
]

export default function IndexHero() {
    return (
        <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4 ml-24">
                    <IndexHeader title="Hi, I&apos;m Liam Townsley" subtitle="A passionate Cybersecurity Engineer specializing in securing digital experiences." />
                    <ButtonRow buttons={CTA_BUTTONS} justify="justify-start" gap="gap-2" />
                    <SocialList socials={CONNECT_LINKS} variant={"ghost"} />
                </div>

                <div className="flex items-center justify-center">
                    <Image
                        alt="Avatar Image"
                        className="object-cover dark:bg-[#2b3e50] p-8 rounded-xl"
                        height={400}
                        width={400}
                        src="/avatar.svg"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}