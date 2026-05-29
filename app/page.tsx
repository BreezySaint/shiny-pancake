import { Header } from "@/components/header"
import { QuoteForm } from "@/components/quote-form"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b-2 border-secondary py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              Get Your Free Moving Quote
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty">
              Enter your move details below and receive an instant estimate. 
              Our transparent pricing means no surprises on moving day.
            </p>
          </div>
        </section>

        {/* Quote Form Section */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4">
            <div className="border-2 border-secondary bg-card p-6 md:p-8">
              <QuoteForm />
            </div>
          </div>
        </section>

        <Features />
      </main>

      <Footer />
    </div>
  )
}
