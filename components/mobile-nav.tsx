"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-white" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#003B20] border-r border-[#00552E] pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
            <Image src="/images/logo.png" alt="Believe Wallet Radar" width={36} height={36} />
            <span className="font-bold text-xl text-white">Believe Wallet Radar</span>
          </Link>
        </div>
        <div className="mt-8 px-7">
          <nav className="flex flex-col gap-6">
            <Link
              href="/"
              className="text-base font-medium text-white transition-colors hover:text-green-400"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-green-400"
              onClick={() => setOpen(false)}
            >
              Wallets
            </Link>
            <Link
              href="#"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-green-400"
              onClick={() => setOpen(false)}
            >
              Tokens
            </Link>
            <Link
              href="#"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-green-400"
              onClick={() => setOpen(false)}
            >
              Alerts
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
