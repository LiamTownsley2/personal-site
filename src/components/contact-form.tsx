"use client";
import React, { useCallback, useId, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { postWebhook } from "@/lib/discord";

type InputFieldProps = {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
};

const InputField: React.FC<InputFieldProps> = ({ name, label, placeholder, required, type = "text" }) => {
    const id = useId();
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </label>
            <Input id={id} name={name} placeholder={placeholder} required={required} type={type} />
        </div>
    );
};

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        postWebhook(
            formData.get("firstName") as string,
            formData.get("lastName") as string,
            formData.get("email") as string,
            formData.get("message") as string
        );

        form.reset();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    }, []);

    const _ContactForm = <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
            <InputField name="firstName" label="First name" placeholder="John" required />
            <InputField name="lastName" label="Last name" placeholder="Doe" required />
        </div>
        <InputField name="email" label="Email" placeholder="john.doe@example.com" required type="email" />
        <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Message
            </label>
            <Textarea id="message" name="message" placeholder="Your message here..." className="min-h-[150px]" required />
        </div>
        <Button type="submit" className="w-full">
            Send Message
        </Button>
    </form>

    return (
        <div>

            {submitted ? <Alert>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your form was submitted.</AlertDescription>
            </Alert> : _ContactForm}
        </div>

    );
}
