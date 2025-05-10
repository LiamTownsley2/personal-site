import { ElementType } from "react";

export type ContactParams = { icon: ElementType, label: string, href?: string };
export default function ContactRow(params: ContactParams) {
    return (
        <div className="flex items-center gap-3">
            <params.icon className="h-5 w-5" />
            {
                params.href ?
                    <a href={params.href} className="text-sm hover:underline">
                        {params.label}
                    </a> : <p className="text-sm">{params.label}</p>
            }
        </div>
    )
}