import Link from "next/link"

export function SiteFooter() {
  const CURRENT_YEAR = new Date().getFullYear();
  return (
    <footer className="md:fixed md:bottom-0 md:left-0 w-full md:z-50 bg-background">
      <div className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© {CURRENT_YEAR} Liam Townsley. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/contact">
            Contact Me
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/admin">
            Site Administration
          </Link>
        </nav>
      </div>
    </footer>
  )
}
