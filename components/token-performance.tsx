"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const tokenData = [
  { name: "$BLV", roi: 156, volume: 1200000 },
  { name: "$RADAR", roi: 89, volume: 750000 },
  { name: "$DEGEN", roi: 342, volume: 2100000 },
  { name: "$META", roi: 78, volume: 650000 },
  { name: "$ALPHA", roi: 203, volume: 1500000 },
]

const timeframeData = {
  "24h": [
    { token: "$BLV", value: 12 },
    { token: "$RADAR", value: 8 },
    { token: "$DEGEN", value: 24 },
    { token: "$META", value: -5 },
    { token: "$ALPHA", value: 15 },
  ],
  "7d": [
    { token: "$BLV", value: 45 },
    { token: "$RADAR", value: 28 },
    { token: "$DEGEN", value: 78 },
    { token: "$META", value: 12 },
    { token: "$ALPHA", value: 56 },
  ],
  "30d": [
    { token: "$BLV", value: 156 },
    { token: "$RADAR", value: 89 },
    { token: "$DEGEN", value: 342 },
    { token: "$META", value: 78 },
    { token: "$ALPHA", value: 203 },
  ],
}

export function TokenPerformance() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
        <CardHeader>
          <CardTitle className="text-white">Token Performance</CardTitle>
          <CardDescription className="text-gray-300">ROI of tokens tracked by top wallets</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="30d">
            <TabsList className="bg-[#003B20] mb-4">
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
            </TabsList>
            <TabsContent value="24h" className="h-[300px]">
              <ChartContainer
                config={{
                  value: {
                    label: "ROI %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeframeData["24h"]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a3a2a" />
                    <XAxis dataKey="token" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="7d" className="h-[300px]">
              <ChartContainer
                config={{
                  value: {
                    label: "ROI %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeframeData["7d"]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a3a2a" />
                    <XAxis dataKey="token" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="30d" className="h-[300px]">
              <ChartContainer
                config={{
                  value: {
                    label: "ROI %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeframeData["30d"]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a3a2a" />
                    <XAxis dataKey="token" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
        <CardHeader>
          <CardTitle className="text-white">Top Tokens</CardTitle>
          <CardDescription className="text-gray-300">Most profitable tokens tracked by whales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-[#00552E]">
            <Table>
              <TableHeader className="bg-[#003B20]">
                <TableRow>
                  <TableHead className="text-white">Token</TableHead>
                  <TableHead className="text-white">ROI (30d)</TableHead>
                  <TableHead className="text-white">Volume</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokenData.map((token) => (
                  <TableRow key={token.name} className="border-[#00552E] transition-colors hover:bg-[#003B20]">
                    <TableCell className="font-medium text-white">{token.name}</TableCell>
                    <TableCell className="text-green-400">+{token.roi}%</TableCell>
                    <TableCell className="text-white">${(token.volume / 1000000).toFixed(1)}M</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${token.roi > 100 ? "bg-green-900/50 text-green-400 border-green-700" : "bg-yellow-900/50 text-yellow-400 border-yellow-700"}`}
                      >
                        {token.roi > 200 ? "Mooning 🚀" : token.roi > 100 ? "Bullish 📈" : "Neutral ⚖️"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
