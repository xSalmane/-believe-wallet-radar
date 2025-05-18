"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TransactionSettings() {
  const [minTransactionValue, setMinTransactionValue] = useState(25)
  const [walletImportance, setWalletImportance] = useState(75)
  const [tokenFilter, setTokenFilter] = useState("all")
  const [notifications, setNotifications] = useState({
    telegram: true,
    twitter: true,
    email: false,
    push: true,
  })

  const formatCurrency = (value: number) => {
    if (value >= 100) {
      return `$${value.toFixed(0)}K`
    } else {
      return `$${value}K`
    }
  }

  const getImportanceLabel = (value: number) => {
    if (value < 25) return "Low"
    if (value < 50) return "Medium"
    if (value < 75) return "High"
    return "Very High"
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
        <CardHeader>
          <CardTitle className="text-white">Notification Settings</CardTitle>
          <CardDescription className="text-gray-300">Configure how you receive alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Telegram Notifications</Label>
                <p className="text-xs text-gray-400">Receive alerts on Telegram</p>
              </div>
              <Switch
                checked={notifications.telegram}
                onCheckedChange={() => handleNotificationChange("telegram")}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">X/Twitter Notifications</Label>
                <p className="text-xs text-gray-400">Receive alerts on X/Twitter</p>
              </div>
              <Switch
                checked={notifications.twitter}
                onCheckedChange={() => handleNotificationChange("twitter")}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Email Alerts</Label>
                <p className="text-xs text-gray-400">Receive alerts via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={() => handleNotificationChange("email")}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Push Notifications</Label>
                <p className="text-xs text-gray-400">Receive browser push notifications</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={() => handleNotificationChange("push")}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
        <CardHeader>
          <CardTitle className="text-white">Alert Thresholds</CardTitle>
          <CardDescription className="text-gray-300">Customize when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-white">Minimum Transaction Value</Label>
                <span className="text-green-400 font-medium">{formatCurrency(minTransactionValue)}</span>
              </div>
              <Slider
                min={1}
                max={100}
                step={1}
                value={[minTransactionValue]}
                onValueChange={(value) => setMinTransactionValue(value[0])}
                className="[&_[role=slider]]:bg-green-500"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">$1K</span>
                <span className="text-xs text-gray-400">$100K</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-white">Wallet Importance</Label>
                <span className="text-green-400 font-medium">{getImportanceLabel(walletImportance)}</span>
              </div>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[walletImportance]}
                onValueChange={(value) => setWalletImportance(value[0])}
                className="[&_[role=slider]]:bg-green-500"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">Low</span>
                <span className="text-xs text-gray-400">Very High</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Token Filter</Label>
              <Select value={tokenFilter} onValueChange={setTokenFilter}>
                <SelectTrigger className="bg-[#003B20] border-[#00552E] text-white">
                  <SelectValue placeholder="Select token filter" />
                </SelectTrigger>
                <SelectContent className="bg-[#003B20] border-[#00552E] text-white">
                  <SelectItem value="all">All Tokens</SelectItem>
                  <SelectItem value="top10">Top 10 Only</SelectItem>
                  <SelectItem value="custom">Custom List</SelectItem>
                  <SelectItem value="trending">Trending Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
