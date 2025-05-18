"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { usePhantom } from "@/hooks/use-phantom"
import Image from "next/image"

export function PhantomConnectButton() {
  const { connected, loading, connect, disconnect, formatPublicKey, publicKey, isPhantomInstalled } = usePhantom()
  const [mounted, setMounted] = useState(false)

  // This ensures we only render the button client-side to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (connected && publicKey) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={disconnect}
        className="bg-green-600 hover:bg-green-700 border-green-700 text-white"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {formatPublicKey(publicKey)}
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={connect}
      disabled={loading || !isPhantomInstalled}
      className="bg-[#003B20] border-[#00552E] text-white hover:bg-[#004D2A]"
    >
      {loading ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          Connecting...
        </>
      ) : (
        <>
          <div className="mr-2 h-4 w-4 flex items-center justify-center">
            <Image src="/phantom-logo.png" alt="Phantom" width={16} height={16} />
          </div>
          {isPhantomInstalled ? "Connect Phantom" : "Install Phantom"}
        </>
      )}
    </Button>
  )
}
