import type React from "react"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/images/logo.png" alt="Believe Wallet Radar" width={36} height={36} />
        <span className="font-bold text-xl text-white">Believe Wallet Radar</span>
      </Link>
      <Link href="/" className="text-sm font-medium text-white transition-colors hover:text-green-400">
        Dashboard
      </Link>
      <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-green-400">
        Wallets
      </Link>
      <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-green-400">
        Tokens
      </Link>
      <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-green-400">
        Alerts
      </Link>
    </nav>
  )
}
