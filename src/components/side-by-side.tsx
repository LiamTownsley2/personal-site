import React from "react"

export type SideBySideParams = { children?: React.ReactNode }
export default function SideBySide(params: SideBySideParams) {
    return (
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {params.children}
        </div>
    )
}