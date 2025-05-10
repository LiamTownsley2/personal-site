import React from "react"

export type MainParams = { children?: React.ReactNode }
export default function Main(params: MainParams) {
    return (
        <main className="flex-1">
            <section className="w-full py-6 md:py-12 lg:py-24">
                {params.children}
            </section>
        </main>
    )
}