"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export const usePhantom = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false)
  const { toast } = useToast()

  // Function to get the Phantom provider
  const getProvider = useCallback(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      const provider = window.solana
      if (provider?.isPhantom) {
        return provider
      }
    }
    return null
  }, [])

  // Check if Phantom is installed
  useEffect(() => {
    const checkForPhantom = () => {
      const provider = getProvider()
      setIsPhantomInstalled(!!provider)

      if (provider && provider.isConnected && provider.publicKey) {
        setPublicKey(provider.publicKey.toString())
        setConnected(true)
      }
    }

    checkForPhantom()

    // Check again after a delay to ensure script has loaded
    const timer = setTimeout(checkForPhantom, 1000)
    return () => clearTimeout(timer)
  }, [getProvider])

  // Set up event listeners
  useEffect(() => {
    const provider = getProvider()
    if (!provider) return

    const handleConnect = () => {
      if (provider.publicKey) {
        setPublicKey(provider.publicKey.toString())
        setConnected(true)
      }
    }

    const handleDisconnect = () => {
      setPublicKey(null)
      setConnected(false)
    }

    const handleAccountChange = () => {
      if (provider.publicKey) {
        setPublicKey(provider.publicKey.toString())
      }
    }

    // Register event listeners
    provider.on("connect", handleConnect)
    provider.on("disconnect", handleDisconnect)
    provider.on("accountChanged", handleAccountChange)

    return () => {
      // Remove event listeners
      provider.off("connect", handleConnect)
      provider.off("disconnect", handleDisconnect)
      provider.off("accountChanged", handleAccountChange)
    }
  }, [getProvider])

  const connect = async () => {
    const provider = getProvider()

    if (!provider) {
      toast({
        title: "Phantom Not Found",
        description: "Please install Phantom wallet extension first.",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      await provider.connect()

      toast({
        title: "Wallet Connected",
        description: "Your Phantom wallet has been connected successfully.",
        variant: "success",
      })
    } catch (error) {
      console.error("Error connecting to Phantom wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Phantom wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const disconnect = async () => {
    const provider = getProvider()

    if (!provider) return

    try {
      setLoading(true)
      await provider.disconnect()

      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
        variant: "destructive",
      })
    } catch (error) {
      console.error("Error disconnecting from Phantom wallet:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatPublicKey = (key: string | null) => {
    if (!key) return ""
    return `${key.slice(0, 4)}...${key.slice(-4)}`
  }

  return {
    publicKey,
    connected,
    loading,
    connect,
    disconnect,
    formatPublicKey,
    isPhantomInstalled,
    radarBalance: 0,
    hasEnoughRadar: false,
    phantom: getProvider(),
  }
}
