'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Nav() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Feed" },
    { href: "/demo/builder", label: "Builder" },
    { href: "/demo/thread", label: "Thread" },
    { href: "/demo/limits", label: "Limits" },
    { href: "/demo/kyc", label: "KYC" },
    { href: "/demo/trust", label: "Trust" },
    { href: "/demo/roadmap", label: "Roadmap" },
    { href: "/demo/waitlist", label: "Waitlist" },
    { href: "/demo/generic", label: "Generic" },
  ]

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          MikeBets
        </Link>
        <div className="flex items-center gap-1 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap",
                pathname === link.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

