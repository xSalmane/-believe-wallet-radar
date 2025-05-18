"use client"

import { useState } from "react"
import { ArrowUpDown, ExternalLink, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface TopWalletsProps {
  className?: string
  onSelectWallet?: (wallet: string) => void
}

const wallets = [
  {
    address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
    label: "Whale 1",
    type: "Whale",
    transactions: 245,
    volume: "$1.2M",
    roi: "+156%",
  },
  {
    address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    label: "Top Trader",
    type: "Trader",
    transactions: 1872,
    volume: "$5.7M",
    roi: "+342%",
  },
  {
    address: "0x7f268357a8c2552623316e2562d90e642bb538e5",
    label: "Creator 1",
    type: "Creator",
    transactions: 67,
    volume: "$450K",
    roi: "+89%",
  },
  {
    address: "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f",
    label: "Whale 2",
    type: "Whale",
    transactions: 124,
    volume: "$2.8M",
    roi: "+203%",
  },
  {
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    label: "Trader 2",
    type: "Trader",
    transactions: 932,
    volume: "$3.1M",
    roi: "+178%",
  },
]

export function TopWallets({ className, onSelectWallet }: TopWalletsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredWallets = wallets.filter(
    (wallet) =>
      (wallet.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wallet.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wallet.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedType === "all" || wallet.type === selectedType),
  )

  return (
    <Card className="bg-[#004D2A] border-[#00552E] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
      <CardHeader>
        <CardTitle className="text-white">Top Wallets</CardTitle>
        <CardDescription className="text-gray-300">Track the most influential wallets on Believe</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          <Input
            placeholder="Search wallets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-[#003B20] border-[#00552E] text-white"
          />
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${selectedType === "all" ? "bg-green-900/50 text-green-400 border-green-700" : "bg-[#003B20] text-white border-[#00552E]"}`}
              onClick={() => setSelectedType("all")}
            >
              All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${selectedType === "Whale" ? "bg-green-900/50 text-green-400 border-green-700" : "bg-[#003B20] text-white border-[#00552E]"}`}
              onClick={() => setSelectedType("Whale")}
            >
              Whales
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${selectedType === "Trader" ? "bg-green-900/50 text-green-400 border-green-700" : "bg-[#003B20] text-white border-[#00552E]"}`}
              onClick={() => setSelectedType("Trader")}
            >
              Traders
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${selectedType === "Creator" ? "bg-green-900/50 text-green-400 border-green-700" : "bg-[#003B20] text-white border-[#00552E]"}`}
              onClick={() => setSelectedType("Creator")}
            >
              Creators
            </Button>
          </div>
        </div>
        <div className="rounded-md border border-[#00552E]">
          <Table>
            <TableHeader className="bg-[#003B20]">
              <TableRow>
                <TableHead className="text-white">Label</TableHead>
                <TableHead className="text-white">Address</TableHead>
                <TableHead className="text-white">Type</TableHead>
                <TableHead className="text-white">
                  <div className="flex items-center">
                    Transactions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-white">
                  <div className="flex items-center">
                    Volume
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-white">ROI</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWallets.length > 0 ? (
                filteredWallets.map((wallet) => (
                  <TableRow key={wallet.address} className="border-[#00552E] transition-colors hover:bg-[#003B20]">
                    <TableCell className="font-medium text-white">{wallet.label}</TableCell>
                    <TableCell className="text-white">
                      {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-900/50 text-green-400 border-green-700">
                        {wallet.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{wallet.transactions}</TableCell>
                    <TableCell className="text-white">{wallet.volume}</TableCell>
                    <TableCell className="text-green-400">{wallet.roi}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onSelectWallet?.(wallet.address)}
                          className="hover:bg-green-900/30"
                        >
                          <Eye className="h-4 w-4 text-white" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-green-900/30">
                          <ExternalLink className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-white">
                    No wallets found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
