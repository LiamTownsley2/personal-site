import Link from "next/link";
import { Button as UIButton } from "./ui/button";
import { ElementType } from "react";

export type ButtonVarients = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
export type ButtonParams = {
    href: string,
    variant: ButtonVarients,
    icon?: ElementType,
    label: string,
    rtl_icon?: boolean
    className?: string
}
export function Button(params: ButtonParams) {
    const margin = params.rtl_icon ? "ml-2" : "mr-2";
    const styling = `${margin} h-4 w-4`;
    return (
        <Link href={params.href}>
            <UIButton variant={params.variant} className={params.className}>
                {params.rtl_icon ? (
                    <>
                        {params.label}
                        {params.icon && <params.icon className={styling} />}
                    </>
                ) : (
                    <>
                        {params.icon && <params.icon className={styling} />}
                        {params.label}
                    </>
                )}
            </UIButton>
        </Link>
    )
}