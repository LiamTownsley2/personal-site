import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { SearchProvider } from "@/context/search-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Liam Townsley's Digital CV",
  description: "A passionate Cybersecurity Engineer specializing in securing digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} h-full min-h-full`} suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <SearchProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
