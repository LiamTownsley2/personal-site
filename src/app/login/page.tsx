import { SiteHeader } from "@/layouts/SiteHeader";
import { SiteFooter } from "@/layouts/SiteFooter";
import LoginForm from "@/components/login-form";
import type React from "react"

export default function Login() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <div className="w-full my-64 flex justify-around items-center">
                <div className="w-1/3 flex flex-col gap-16">
                    <h1 className="text-5xl font-extrabold text-center">Login to the Site Administration Panel</h1>
                    <LoginForm />
                </div>
            </div>

            <SiteFooter />
        </div>
    )
}
