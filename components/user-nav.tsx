"use client"

import { LogOut, Settings, User, Wallet, Bell, ChevronDown, ExternalLink } from "lucide-react"
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { usePhantom } from "@/hooks/use-phantom"

interface UserNavProps {
  onShowUserDashboard?: () => void
}

export function UserNav({ onShowUserDashboard }: UserNavProps) {
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const {
    publicKey,
    connected,
    loading,
    connect,
    disconnect,
    formatPublicKey,
    isPhantomInstalled,
    radarBalance,
    hasEnoughRadar,
  } = usePhantom()

  const handleConnect = async () => {
    if (!isPhantomInstalled) {
      window.open("https://phantom.app/", "_blank")
      return
    }

    await connect()
    setShowConnectDialog(false)
  }

  const openPhantomWebsite = () => {
    window.open("https://phantom.app/", "_blank")
  }

  const formatBalance = (balance: number) => {
    return balance.toLocaleString()
  }

  return (
    <>
      {connected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 flex items-center gap-2 px-2 rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                <Wallet className="h-4 w-4" />
              </div>
              <span className="text-white hidden md:inline-block">{formatPublicKey(publicKey)}</span>
              <ChevronDown className="h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Connected Wallet</p>
                <p className="text-xs leading-none text-muted-foreground">{formatPublicKey(publicKey)}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onShowUserDashboard}>
                <User className="mr-2 h-4 w-4" />
                <span>My Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>My Notifications</span>
                {hasEnoughRadar && (
                  <span className="ml-auto bg-green-500 text-white text-xs rounded-full px-1.5 py-0.5">3</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="flex items-center">
                    <Image src="/placeholder-q4kbi.png" alt="RADAR" width={16} height={16} className="mr-2" />
                    $RADAR Requirement
                  </span>
                  <span className="text-xs mt-1 text-yellow-400">Need 10,000,000 tokens (5-30 min verification)</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>View on Solana Explorer</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={disconnect}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConnectDialog(true)}
          className="bg-[#003B20] border-[#00552E] text-white hover:bg-[#004D2A]"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      )}

      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="bg-[#004D2A] border-[#00552E] text-white">
          <DialogHeader>
            <DialogTitle>Connect your wallet</DialogTitle>
            <DialogDescription className="text-gray-300">
              Connect your wallet to track influential wallets and receive notifications.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              className="flex items-center justify-between w-full bg-[#003B20] hover:bg-[#002812] text-white"
              onClick={handleConnect}
              disabled={loading}
            >
              <div className="flex items-center">
                <Image src="/phantom-logo.png" alt="Phantom" width={24} height={24} className="mr-2" />
                Phantom
              </div>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Recommended</span>
            </Button>
            {!isPhantomInstalled && (
              <div className="text-sm text-yellow-400 mt-2 p-2 bg-yellow-900/20 border border-yellow-700/50 rounded-md">
                Phantom wallet is not installed. Click the button below to install it.
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openPhantomWebsite}
                  className="mt-2 w-full border-yellow-700/50 hover:bg-yellow-900/30 text-yellow-400"
                >
                  Install Phantom
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
