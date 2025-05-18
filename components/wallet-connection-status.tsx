"use client"

import { usePhantom } from "@/hooks/use-phantom"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import Image from "next/image"

export function WalletConnectionStatus() {
  const { connected } = usePhantom()

  if (!connected) return null

  return (
    <Alert className="bg-yellow-900/20 border-yellow-700 mb-4">
      <AlertTriangle className="h-4 w-4 text-yellow-400" />
      <AlertTitle className="text-yellow-400">Notifications Inactive</AlertTitle>
      <AlertDescription className="text-gray-300">
        <div className="flex items-center">
          <span>
            You need 10,000,000 $RADAR tokens to receive notifications about influential wallet activity. Verification
            takes between 5-30 minutes after reaching the required amount.
          </span>
          <Image src="/placeholder-q4kbi.png" alt="RADAR" width={20} height={20} className="ml-2" />
        </div>
      </AlertDescription>
    </Alert>
  )
}
