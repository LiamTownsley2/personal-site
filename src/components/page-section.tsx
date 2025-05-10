import React from "react"

export type MainParams = { children?: React.ReactNode }
export default function Main(params: MainParams) {
    return (
        <main className="flex flex-1 sm:flex-row sm:justify-center mx-auto">
            <section className="w-full py-6 md:py-12 lg:py-24">
                {params.children}
            </section>
        </main>
    )
}