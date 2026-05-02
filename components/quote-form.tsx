"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner"
import { QuoteResult } from "./quote-result"

const HOME_SIZES = [
  { value: "studio", label: "Studio", basePrice: 400 },
  { value: "1bed", label: "1 Bedroom", basePrice: 600 },
  { value: "2bed", label: "2 Bedrooms", basePrice: 900 },
  { value: "3bed", label: "3 Bedrooms", basePrice: 1200 },
  { value: "4bed", label: "4+ Bedrooms", basePrice: 1600 },
]

const SPECIAL_ITEMS = [
  { id: "piano", label: "Piano", price: 300 },
  { id: "pool-table", label: "Pool Table", price: 250 },
  { id: "hot-tub", label: "Hot Tub", price: 400 },
  { id: "antiques", label: "Antiques/Art", price: 200 },
  { id: "gym-equipment", label: "Gym Equipment", price: 150 },
]

interface QuoteData {
  basePrice: number
  distancePrice: number
  specialItemsPrice: number
  totalPrice: number
  homeSize: string
  distance: number
}

export function QuoteForm() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [homeSize, setHomeSize] = useState("")
  const [moveDate, setMoveDate] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [error, setError] = useState("")

  const handleSpecialItemToggle = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    )
  }

  const calculateQuote = () => {
    if (!origin || !destination || !homeSize || !moveDate) {
      setError("Please fill in all required fields")
      return
    }
    setError("")
    setIsCalculating(true)
    setQuote(null)

    // Simulate API call
    setTimeout(() => {
      const homeSizeData = HOME_SIZES.find((h) => h.value === homeSize)
      const basePrice = homeSizeData?.basePrice || 600
      
      // Simulate distance calculation (random between 10-500 miles)
      const distance = Math.floor(Math.random() * 490) + 10
      const distancePrice = distance * 1.5

      const specialItemsPrice = selectedItems.reduce((total, itemId) => {
        const item = SPECIAL_ITEMS.find((i) => i.id === itemId)
        return total + (item?.price || 0)
      }, 0)

      const totalPrice = basePrice + distancePrice + specialItemsPrice

      setQuote({
        basePrice,
        distancePrice,
        specialItemsPrice,
        totalPrice,
        homeSize: homeSizeData?.label || "",
        distance,
      })
      setIsCalculating(false)
    }, 1500)
  }

  const resetForm = () => {
    setQuote(null)
    setOrigin("")
    setDestination("")
    setHomeSize("")
    setMoveDate("")
    setSelectedItems([])
    setError("")
  }

  if (quote) {
    return <QuoteResult quote={quote} onReset={resetForm} />
  }

  return (
    <div className="space-y-8">
      {/* Step 1: Locations */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Step 1: Enter Locations
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your current address and where you&apos;re moving to
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="origin" className="text-xs font-bold uppercase tracking-wider">
              Moving From:
            </Label>
            <Input
              id="origin"
              placeholder="Enter city or ZIP code"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="border-2 border-secondary bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-xs font-bold uppercase tracking-wider">
              Moving To:
            </Label>
            <Input
              id="destination"
              placeholder="Enter city or ZIP code"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border-2 border-secondary bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Move Details */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Step 2: Move Details
        </h2>
        <p className="text-sm text-muted-foreground">
          Adjust these fields to get an accurate estimate
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="homeSize" className="text-xs font-bold uppercase tracking-wider">
              Home Size:
            </Label>
            <Select value={homeSize} onValueChange={setHomeSize}>
              <SelectTrigger className="border-2 border-secondary bg-background text-foreground">
                <SelectValue placeholder="Select home size" />
              </SelectTrigger>
              <SelectContent>
                {HOME_SIZES.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="moveDate" className="text-xs font-bold uppercase tracking-wider">
              Move Date:
            </Label>
            <Input
              id="moveDate"
              type="date"
              value={moveDate}
              onChange={(e) => setMoveDate(e.target.value)}
              className="border-2 border-secondary bg-background text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Step 3: Special Items */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Step 3: Special Items (Optional)
        </h2>
        <p className="text-sm text-muted-foreground">
          Select any items that require special handling
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {SPECIAL_ITEMS.map((item) => (
            <label
              key={item.id}
              className={`flex cursor-pointer items-center gap-2 border-2 p-3 transition-colors ${
                selectedItems.includes(item.id)
                  ? "border-primary bg-primary/10"
                  : "border-secondary bg-background hover:border-primary/50"
              }`}
            >
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onCheckedChange={() => handleSpecialItemToggle(item.id)}
                className="border-secondary data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Calculate Button */}
      <div className="flex items-center gap-4">
        <Button
          onClick={calculateQuote}
          disabled={isCalculating}
          className="bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
        >
          {isCalculating ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Calculating...
            </>
          ) : (
            "Calculate"
          )}
        </Button>
        {isCalculating && (
          <span className="text-sm text-muted-foreground">
            Getting your estimate...
          </span>
        )}
      </div>
    </div>
  )
}
