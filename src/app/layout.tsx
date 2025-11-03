'use client'

import { Inter } from "next/font/google"
import { usePathname } from "next/navigation"
import "./globals.css"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isGenericPage = pathname === '/demo/generic'

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isGenericPage && <Nav />}
        <main className={isGenericPage ? "" : "min-h-screen"}>
          {children}
        </main>
        {!isGenericPage && <Footer />}
        <Toaster />
      </body>
    </html>
  )
}

