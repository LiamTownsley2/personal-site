import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image";
import Link from "next/link";

const contactButtons = [
    { name: 'GitHub', href: 'https://github.com/LiamTownsley2/', icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/liam-townsley/', icon: Linkedin },
    { name: 'Email', href: 'mailto:liamtownsley43@gmail.com', icon: Mail },
];

export default function Home() {
    return (
        <main className="flex-1">
            <section className="w-full flex justify-center py-6 md:py-12 lg:py-24">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Hi, I&apos;m Liam Townsley</h1>
                                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                    A passionate Cybersecurity Engineer specializing in securing digital experiences.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link href="/projects">
                                    <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                                        View My Work
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" className="h-full">Contact Me</Button>
                                </Link>
                            </div>
                            <div className="flex gap-4">
                                {contactButtons.map((item, index) => (
                                    <Link key={index} href={item.href} target="_blank" rel="noreferrer">
                                        <Button variant="ghost" size="icon">
                                            <item.icon className="h-4 w-4" />
                                            <span className="sr-only">{item.name}</span>
                                        </Button>
                                    </Link>
                                ))}
                            </div>
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
            </section>
        </main>
    )
}