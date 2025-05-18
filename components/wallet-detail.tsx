"use client"

import { useState } from "react"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface WalletDetailProps {
  walletAddress: string
  onBack: () => void
}

const walletData = {
  "0x7a250d5630b4cf539739df2c5dacb4c659f2488d": {
    label: "Whale 1",
    type: "Whale",
    balance: "$2.4M",
    transactions: 245,
    volume: "$1.2M",
    roi: "+156%",
    tokens: [
      { name: "$BLV", amount: "450,000", value: "$675,000", change: "+12%" },
      { name: "$RADAR", amount: "1,200,000", value: "$480,000", change: "+8%" },
      { name: "$DEGEN", amount: "350,000", value: "$245,000", change: "+24%" },
    ],
    activity: [
      { date: "2023-05-12", value: 120000 },
      { date: "2023-05-13", value: 150000 },
      { date: "2023-05-14", value: 180000 },
      { date: "2023-05-15", value: 220000 },
      { date: "2023-05-16", value: 280000 },
      { date: "2023-05-17", value: 350000 },
      { date: "2023-05-18", value: 420000 },
    ],
    transactions: [
      { id: 1, type: "Buy", token: "$BLV", amount: "50,000", value: "$75,000", time: "2 hours ago" },
      { id: 2, type: "Stake", token: "$RADAR", amount: "200,000", value: "$80,000", time: "5 hours ago" },
      { id: 3, type: "Sell", token: "$META", amount: "25,000", value: "$18,750", time: "1 day ago" },
      { id: 4, type: "Buy", token: "$DEGEN", amount: "100,000", value: "$70,000", time: "2 days ago" },
      { id: 5, type: "Mint", token: "NFT Collection", amount: "3", value: "$15,000", time: "3 days ago" },
    ],
  },
  "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": {
    label: "Top Trader",
    type: "Trader",
    balance: "$8.2M",
    transactions: 1872,
    volume: "$5.7M",
    roi: "+342%",
    tokens: [
      { name: "$DEGEN", amount: "2,500,000", value: "$1,750,000", change: "+24%" },
      { name: "$BLV", amount: "1,800,000", value: "$2,700,000", change: "+12%" },
      { name: "$ALPHA", amount: "950,000", value: "$1,425,000", change: "+15%" },
    ],
    activity: [
      { date: "2023-05-12", value: 520000 },
      { date: "2023-05-13", value: 650000 },
      { date: "2023-05-14", value: 780000 },
      { date: "2023-05-15", value: 920000 },
      { date: "2023-05-16", value: 1080000 },
      { date: "2023-05-17", value: 1250000 },
      { date: "2023-05-18", value: 1420000 },
    ],
    transactions: [
      { id: 1, type: "Buy", token: "$DEGEN", amount: "250,000", value: "$175,000", time: "1 hour ago" },
      { id: 2, type: "Sell", token: "$META", amount: "180,000", value: "$135,000", time: "3 hours ago" },
      { id: 3, type: "Buy", token: "$BLV", amount: "120,000", value: "$180,000", time: "6 hours ago" },
      { id: 4, type: "Stake", token: "$ALPHA", amount: "350,000", value: "$525,000", time: "1 day ago" },
      { id: 5, type: "Buy", token: "$RADAR", amount: "500,000", value: "$200,000", time: "2 days ago" },
    ],
  },
}

export function WalletDetail({ walletAddress, onBack }: WalletDetailProps) {
  const [copied, setCopied] = useState(false)
  const wallet =
    walletData[walletAddress as keyof typeof walletData] || walletData["0x7a250d5630b4cf539739df2c5dacb4c659f2488d"]

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="bg-[#003B20] border-[#00552E] text-white hover:bg-[#004D2A]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyAddress}
            className="bg-[#003B20] border-[#00552E] text-white hover:bg-[#004D2A]"
          >
            {copied ? "Copied!" : "Copy Address"}
            <Copy className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-[#003B20] border-[#00552E] text-white hover:bg-[#004D2A]">
            View on Explorer
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-300">Wallet</CardDescription>
            <CardTitle className="text-white flex items-center">
              {wallet.label}
              <Badge variant="outline" className="ml-2 bg-green-900/50 text-green-400 border-green-700">
                {wallet.type}
              </Badge>
            </CardTitle>
            <CardDescription className="text-gray-300">{formatAddress(walletAddress)}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-300">Balance</CardDescription>
            <CardTitle className="text-white">{wallet.balance}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-300">Transactions</CardDescription>
            <CardTitle className="text-white">{wallet.transactions}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-300">ROI</CardDescription>
            <CardTitle className="text-green-400">{wallet.roi}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-[#003B20] p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
            <CardHeader>
              <CardTitle className="text-white">Wallet Activity</CardTitle>
              <CardDescription className="text-gray-300">7-day portfolio value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "Portfolio Value",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={wallet.activity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a3a2a" />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-value)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, fill: "#4ade80" }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tokens" className="space-y-4">
          <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
            <CardHeader>
              <CardTitle className="text-white">Token Holdings</CardTitle>
              <CardDescription className="text-gray-300">Current token portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-[#00552E]">
                <Table>
                  <TableHeader className="bg-[#003B20]">
                    <TableRow>
                      <TableHead className="text-white">Token</TableHead>
                      <TableHead className="text-white">Amount</TableHead>
                      <TableHead className="text-white">Value</TableHead>
                      <TableHead className="text-white">24h Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wallet.tokens.map((token) => (
                      <TableRow key={token.name} className="border-[#00552E] transition-colors hover:bg-[#003B20]">
                        <TableCell className="font-medium text-white">{token.name}</TableCell>
                        <TableCell className="text-white">{token.amount}</TableCell>
                        <TableCell className="text-white">{token.value}</TableCell>
                        <TableCell className="text-green-400">{token.change}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <CardDescription className="text-gray-300">Latest wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-[#00552E]">
                <Table>
                  <TableHeader className="bg-[#003B20]">
                    <TableRow>
                      <TableHead className="text-white">Type</TableHead>
                      <TableHead className="text-white">Token</TableHead>
                      <TableHead className="text-white">Amount</TableHead>
                      <TableHead className="text-white">Value</TableHead>
                      <TableHead className="text-white">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wallet.transactions.map((tx) => (
                      <TableRow key={tx.id} className="border-[#00552E] transition-colors hover:bg-[#003B20]">
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              tx.type === "Buy"
                                ? "bg-green-900/50 text-green-400 border-green-700"
                                : tx.type === "Sell"
                                  ? "bg-red-900/50 text-red-400 border-red-700"
                                  : "bg-blue-900/50 text-blue-400 border-blue-700"
                            }
                          `}
                          >
                            {tx.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-white">{tx.token}</TableCell>
                        <TableCell className="text-white">{tx.amount}</TableCell>
                        <TableCell className="text-white">{tx.value}</TableCell>
                        <TableCell className="text-gray-300">{tx.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
