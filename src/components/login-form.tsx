"use client";
import { useRouter, useSearchParams } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

type LoginFormValues = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const router = useRouter()

    const searchParams = useSearchParams()
    const callbackUrl = searchParams?.get("callbackUrl") || "/admin"
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const form = useForm<LoginFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function handleSubmit(data: LoginFormValues) {
        setIsLoading(true)
        setError("")

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl,
            })

            if (!result?.ok) {
                setError(result?.error || "Invalid email or password")
                setIsLoading(false)
                return
            }

            router.push(callbackUrl)
        } catch (error) {
            console.error("Login error:", error)
            setError("An error occurred. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            {error && <p>{error}</p>}
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="joe.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>Submit</Button>
            </form>
        </Form>
    )
}