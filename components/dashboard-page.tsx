"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { WalletActivity } from "@/components/wallet-activity"
import { TopWallets } from "@/components/top-wallets"
import { TokenPerformance } from "@/components/token-performance"
import { NotificationFeed } from "@/components/notification-feed"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileNav } from "@/components/mobile-nav"
import { useMobile } from "@/hooks/use-mobile"
import { TransactionSettings } from "@/components/transaction-settings"
import { WalletDetail } from "@/components/wallet-detail"
import { UserDashboard } from "@/components/user-dashboard"
import { WalletConnectionStatus } from "@/components/wallet-connection-status"
import { usePhantom } from "@/hooks/use-phantom"

export function DashboardPage() {
  const isMobile = useMobile()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [showUserDashboard, setShowUserDashboard] = useState(false)
  const { connected } = usePhantom()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#003B20] to-[#002010]">
      <div className="border-b border-[#00552E] bg-[#002812]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center px-4">
          {isMobile ? <MobileNav /> : <MainNav className="mx-6" />}
          <div className="ml-auto flex items-center space-x-4">
            <UserNav onShowUserDashboard={() => setShowUserDashboard(true)} />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Show wallet connection status if connected */}
        {connected && <WalletConnectionStatus />}

        {showUserDashboard && connected ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">My Dashboard</h2>
              <button
                onClick={() => setShowUserDashboard(false)}
                className="text-sm text-gray-300 hover:text-white bg-[#003B20] px-3 py-1 rounded-md transition-colors"
              >
                Back to Main Dashboard
              </button>
            </div>
            <UserDashboard />
          </div>
        ) : selectedWallet ? (
          <WalletDetail walletAddress={selectedWallet} onBack={() => setSelectedWallet(null)} />
        ) : (
          <>
            <div className="flex items-center justify-between space-y-2">
              <div className="flex flex-col space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
                <p className="text-gray-300">Welcome to Believe Wallet Radar, track top wallets in real-time</p>
              </div>
            </div>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-[#004D2A] p-1">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="wallets">Top Wallets</TabsTrigger>
                <TabsTrigger value="tokens">Token Performance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl border bg-[#004D2A] border-[#00552E] p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <p className="text-sm font-medium text-white">Wallets Tracked</p>
                    </div>
                    <div className="text-2xl font-bold text-white">2,345</div>
                  </div>
                  <div className="rounded-xl border bg-[#004D2A] border-[#00552E] p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <p className="text-sm font-medium text-white">Transactions Today</p>
                    </div>
                    <div className="text-2xl font-bold text-white">15,672</div>
                  </div>
                  <div className="rounded-xl border bg-[#004D2A] border-[#00552E] p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <p className="text-sm font-medium text-white">Top Token</p>
                    </div>
                    <div className="text-2xl font-bold text-white">$BLV</div>
                  </div>
                  <div className="rounded-xl border bg-[#004D2A] border-[#00552E] p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <p className="text-sm font-medium text-white">Whale Activity</p>
                    </div>
                    <div className="text-2xl font-bold text-green-400">+24%</div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <WalletActivity className="col-span-4" />
                  <NotificationFeed className="col-span-3" />
                </div>
              </TabsContent>
              <TabsContent value="wallets" className="space-y-4">
                <TopWallets onSelectWallet={setSelectedWallet} />
              </TabsContent>
              <TabsContent value="tokens" className="space-y-4">
                <TokenPerformance />
              </TabsContent>
              <TabsContent value="notifications" className="space-y-4">
                <TransactionSettings />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}
