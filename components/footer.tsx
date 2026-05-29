import { Truck } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t-2 border-secondary bg-secondary py-8 text-secondary-foreground">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            <span className="font-bold">MoveQuote</span>
          </div>
          <p className="text-sm text-secondary-foreground/70">
            &copy; {new Date().getFullYear()} MoveQuote. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
