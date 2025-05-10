"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, FolderKanban, Home, LogOut
  // , Settings
} from "lucide-react"

export function AdminNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          <Link href="/admin">
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-2", {
                "bg-muted": pathname === "/admin",
              })}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/posts">
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-2", {
                "bg-muted": pathname === "/admin/posts" || pathname?.startsWith("/admin/posts/"),
              })}
            >
              <FileText className="h-4 w-4" />
              Blog Posts
            </Button>
          </Link>
          <Link href="/admin/projects">
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-2", {
                "bg-muted": pathname === "/admin/projects" || pathname?.startsWith("/admin/projects/"),
              })}
            >
              <FolderKanban className="h-4 w-4" />
              Projects
            </Button>
          </Link>
          {/* <Link href="/admin/settings">
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-2", {
                "bg-muted": pathname === "/admin/settings",
              })}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link> */}
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-500 hover:text-red-500"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </nav>
      </ScrollArea>
    </div>
  )
}
