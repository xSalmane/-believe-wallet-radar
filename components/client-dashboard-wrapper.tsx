"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import the DashboardPage component with no SSR
const DashboardPage = dynamic(() => import("@/components/dashboard-page").then((mod) => mod.DashboardPage), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#003B20] to-[#002010]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      <p className="mt-4 text-white">Chargement...</p>
    </div>
  ),
})

export function ClientDashboardWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Load Solana script directly
    const loadSolanaScript = () => {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/@solana/web3.js@latest/lib/index.iife.min.js"
      script.async = true
      document.body.appendChild(script)
    }

    // Only run in browser environment
    if (typeof window !== "undefined") {
      loadSolanaScript()
      setIsMounted(true)
    }
  }, [])

  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#003B20] to-[#002010]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
        <p className="mt-4 text-white">Chargement...</p>
      </div>
    )
  }

  return <DashboardPage />
}
