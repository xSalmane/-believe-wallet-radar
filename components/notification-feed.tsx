"use client"

import type React from "react"

import { useState } from "react"
import { Bell, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

interface NotificationFeedProps extends React.HTMLAttributes<HTMLDivElement> {}

const notifications = [
  {
    id: 1,
    wallet: "0x7a25...488d",
    action: "bought",
    token: "$BLV",
    amount: "25,000",
    time: "2 minutes ago",
    important: true,
  },
  {
    id: 2,
    wallet: "0x1f98...984",
    action: "staked",
    token: "$RADAR",
    amount: "150,000",
    time: "15 minutes ago",
    important: true,
  },
  {
    id: 3,
    wallet: "0x7f26...8e5",
    action: "sold",
    token: "$META",
    amount: "75,000",
    time: "32 minutes ago",
    important: false,
  },
  {
    id: 4,
    wallet: "0x5c69...a6f",
    action: "minted",
    token: "NFT Collection",
    amount: "5",
    time: "1 hour ago",
    important: true,
  },
  {
    id: 5,
    wallet: "0xc02a...cc2",
    action: "bought",
    token: "$DEGEN",
    amount: "100,000",
    time: "2 hours ago",
    important: false,
  },
  {
    id: 6,
    wallet: "0x7a25...488d",
    action: "staked",
    token: "$ALPHA",
    amount: "50,000",
    time: "3 hours ago",
    important: false,
  },
  {
    id: 7,
    wallet: "0x1f98...984",
    action: "bought",
    token: "$BLV",
    amount: "35,000",
    time: "4 hours ago",
    important: true,
  },
]

export function NotificationFeed({ className, ...props }: NotificationFeedProps) {
  const [filter, setFilter] = useState<"all" | "important">("all")
  const [isLoading, setIsLoading] = useState(false)

  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => n.important)

  const refreshData = () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card
      className={cn(
        "bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20",
        className,
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-white flex items-center">
            Live Feed
            <div className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          </CardTitle>
          <CardDescription className="text-gray-300 flex items-center">
            Real-time wallet activity
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 text-gray-400 hover:text-white">
                    <Bell className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-[#003B20] border-[#00552E] text-white max-w-xs">
                  <div className="flex items-center">
                    <p>You need 10,000,000 $RADAR tokens to receive notifications. Verification takes 5-30 minutes.</p>
                    <Image src="/placeholder-q4kbi.png" alt="RADAR" width={16} height={16} className="ml-2" />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs transition-colors ${filter === "all" ? "bg-[#003B20] text-white" : "text-gray-400 hover:text-white"}`}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs transition-colors ${filter === "important" ? "bg-[#003B20] text-white" : "text-gray-400 hover:text-white"}`}
            onClick={() => setFilter("important")}
          >
            Important
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 transition-all duration-300"
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 text-white ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 rounded-md border p-3 transition-all duration-300 hover:translate-x-1 cursor-pointer ${notification.important ? "bg-green-900/20 border-green-700/50" : "bg-[#003B20] border-[#00552E]"}`}
              >
                <div
                  className={`mt-0.5 h-9 w-9 rounded-full flex items-center justify-center ${notification.important ? "bg-green-500" : "bg-gray-700"}`}
                >
                  <Bell className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-white">
                    {notification.wallet} {notification.action} {notification.token}
                  </p>
                  <p className="text-sm text-gray-300">Amount: {notification.amount}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
                {notification.important && <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
