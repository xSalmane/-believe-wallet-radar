"use client"

import type React from "react"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const data = [
  { time: "00:00", swaps: 42, mints: 12, staking: 5 },
  { time: "04:00", swaps: 35, mints: 15, staking: 8 },
  { time: "08:00", swaps: 55, mints: 20, staking: 12 },
  { time: "12:00", swaps: 75, mints: 35, staking: 18 },
  { time: "16:00", swaps: 85, mints: 28, staking: 22 },
  { time: "20:00", swaps: 65, mints: 18, staking: 15 },
  { time: "24:00", swaps: 50, mints: 10, staking: 7 },
]

interface WalletActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function WalletActivity({ className, ...props }: WalletActivityProps) {
  return (
    <Card
      className={cn(
        "bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20",
        className,
      )}
      {...props}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Wallet Activity (24h)</CardTitle>
            <CardDescription className="text-gray-300">
              Real-time tracking of influential wallet activities
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <select className="bg-[#003B20] text-white text-sm rounded-md border border-[#00552E] px-2 py-1">
              <option value="24h">24h</option>
              <option value="7d">7d</option>
              <option value="30d">30d</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              swaps: {
                label: "Swaps",
                color: "hsl(var(--chart-1))",
              },
              mints: {
                label: "Mints",
                color: "hsl(var(--chart-2))",
              },
              staking: {
                label: "Staking",
                color: "hsl(var(--chart-3))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3a2a" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="swaps"
                  stroke="var(--color-swaps)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, fill: "#4ade80" }}
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="mints"
                  stroke="var(--color-mints)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, fill: "#facc15" }}
                  animationDuration={1500}
                  animationBegin={300}
                />
                <Line
                  type="monotone"
                  dataKey="staking"
                  stroke="var(--color-staking)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, fill: "#a78bfa" }}
                  animationDuration={1500}
                  animationBegin={600}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
