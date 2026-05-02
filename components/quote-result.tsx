"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface QuoteData {
  basePrice: number
  distancePrice: number
  specialItemsPrice: number
  totalPrice: number
  homeSize: string
  distance: number
}

interface QuoteResultProps {
  quote: QuoteData
  onReset: () => void
}

export function QuoteResult({ quote, onReset }: QuoteResultProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-8">
      {/* Pricing Generated */}
      <div className="border-2 border-secondary p-6">
        <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">
          Pricing Generated: <span className="text-primary">Estimate*</span>
        </h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          {/* Cost Breakdown */}
          <div className="space-y-4 md:col-span-2">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border-2 border-primary/30 bg-primary/5 p-4">
                <p className="text-xs font-medium text-primary">Base Moving Cost</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatPrice(quote.basePrice)}
                </p>
                <p className="text-xs text-muted-foreground">{quote.homeSize}</p>
              </div>
              <div className="border-2 border-primary/30 bg-primary/5 p-4">
                <p className="text-xs font-medium text-primary">Distance Cost</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatPrice(quote.distancePrice)}
                </p>
                <p className="text-xs text-muted-foreground">{quote.distance} miles</p>
              </div>
              <div className="border-2 border-primary/30 bg-primary/5 p-4">
                <p className="text-xs font-medium text-primary">Special Items</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatPrice(quote.specialItemsPrice)}
                </p>
              </div>
              <div className="border-2 border-primary/30 bg-primary/5 p-4">
                <p className="text-xs font-medium text-primary">Est. Crew Size</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {quote.homeSize === "Studio" || quote.homeSize === "1 Bedroom"
                    ? "2 Movers"
                    : quote.homeSize === "2 Bedrooms"
                    ? "3 Movers"
                    : "4 Movers"}
                </p>
              </div>
            </div>
          </div>

          {/* Total Cost */}
          <div className="flex flex-col justify-center border-2 border-primary bg-primary/10 p-6 text-center">
            <p className="text-sm font-medium text-primary">Total Cost</p>
            <p className="mt-2 text-4xl font-bold text-foreground">
              {formatPrice(quote.totalPrice)}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              *Final price may vary based on actual inventory
            </p>
          </div>
        </div>
      </div>

      {/* Email Section */}
      <div className="space-y-4">
        {submitted ? (
          <div className="border-2 border-primary bg-primary/10 p-6 text-center">
            <svg
              className="mx-auto h-12 w-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-foreground">
              Quote Sent Successfully!
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ve sent your quote details to {email}. One of our moving specialists
              will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-foreground">
              Want to have this formally evaluated? Enter your email to receive a detailed quote.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-secondary bg-background text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="submit"
                  className="w-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 sm:w-auto"
                >
                  Send
                </Button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Get New Quote Button */}
      <Button
        onClick={onReset}
        variant="outline"
        className="border-2 border-secondary text-foreground hover:bg-secondary hover:text-secondary-foreground"
      >
        Get New Quote
      </Button>
    </div>
  )
}
