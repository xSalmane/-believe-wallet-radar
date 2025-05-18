"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Bell, Info, AlertTriangle, Wallet } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { usePhantom } from "@/hooks/use-phantom"

const notificationSettings = [
  { id: 1, name: "Whale Movements", description: "Get notified when whales move large amounts", enabled: true },
  { id: 2, name: "New Token Alerts", description: "Get notified when top wallets buy new tokens", enabled: true },
  { id: 3, name: "Price Alerts", description: "Get notified on significant price changes", enabled: false },
  { id: 4, name: "Staking Events", description: "Get notified on major staking events", enabled: true },
]

export function UserDashboard() {
  const [activeNotifications, setActiveNotifications] = useState(
    notificationSettings.filter((n) => n.enabled).map((n) => n.id),
  )
  const { publicKey, formatPublicKey, radarBalance, hasEnoughRadar } = usePhantom()

  const toggleNotification = (id: number) => {
    if (activeNotifications.includes(id)) {
      setActiveNotifications(activeNotifications.filter((n) => n !== id))
    } else {
      setActiveNotifications([...activeNotifications, id])
    }
  }

  const formatBalance = (balance: number) => {
    return balance.toLocaleString()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Wallet className="mr-2 h-5 w-5" />
          {publicKey ? `Wallet: ${formatPublicKey(publicKey)}` : "My Dashboard"}
        </h2>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Info className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#003B20] border-[#00552E] text-white max-w-xs">
                <p>
                  You need at least 10,000,000 $RADAR tokens to receive notifications. Verification takes between 5-30
                  minutes after reaching the required amount.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Status Banner */}
      <Card className="bg-yellow-900/20 border-yellow-700 transition-all duration-300">
        <CardContent className="p-4 flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
          <div>
            <h3 className="text-yellow-400 font-medium">Notifications Inactive</h3>
            <p className="text-gray-300 text-sm">
              You need 10,000,000 $RADAR tokens to activate notifications. Verification takes between 5-30 minutes.
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="bg-[#003B20] p-1">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-yellow-900/20 border-yellow-700 transition-all duration-300">
            <CardContent className="p-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
              <div>
                <h3 className="text-yellow-400 font-medium">Notifications Inactive</h3>
                <p className="text-gray-300 text-sm">
                  You need 10,000,000 $RADAR tokens to activate notifications. Once this threshold is reached, you will
                  receive real-time alerts about influential wallet activity. Verification takes between 5-30 minutes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Notification Settings</CardTitle>
                  <CardDescription className="text-gray-300">Configure which notifications you receive</CardDescription>
                </div>
                <div className="flex items-center space-x-1 bg-[#003B20] px-3 py-1 rounded-full text-xs text-gray-300">
                  <Bell className="h-3 w-3 mr-1 text-yellow-400" />
                  Need 10M $RADAR
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-[#00552E]">
                <Table>
                  <TableHeader className="bg-[#003B20]">
                    <TableRow>
                      <TableHead className="text-white">Notification Type</TableHead>
                      <TableHead className="text-white">Description</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationSettings.map((notification) => (
                      <TableRow key={notification.id} className="border-[#00552E] transition-colors hover:bg-[#003B20]">
                        <TableCell className="font-medium text-white">{notification.name}</TableCell>
                        <TableCell className="text-gray-300">{notification.description}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-yellow-900/50 text-yellow-400 border-yellow-700"
                            disabled
                          >
                            Inactive (Need 10M $RADAR)
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
            <CardHeader>
              <CardTitle className="text-white">Notifications Preview</CardTitle>
              <CardDescription className="text-gray-300">
                Examples of notifications you'll receive with 10M $RADAR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <AlertTriangle className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-yellow-400 text-lg font-medium mb-2">Notifications Inactive</h3>
                <p className="text-gray-300 max-w-md">
                  You need 10,000,000 $RADAR tokens to receive notifications about influential wallet activity.
                  Verification takes between 5-30 minutes.
                </p>
                <Button className="mt-4 bg-yellow-900/30 text-yellow-400 border border-yellow-700 hover:bg-yellow-900/50">
                  Get $RADAR Tokens
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
