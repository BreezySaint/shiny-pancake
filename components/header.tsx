import { Truck } from "lucide-react"

export function Header() {
  return (
    <header className="border-b-2 border-secondary bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            MoveQuote
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Services
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
