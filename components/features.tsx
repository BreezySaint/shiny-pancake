import { Clock, Shield, DollarSign, Users } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Instant Quotes",
    description: "Get an accurate estimate in seconds, no waiting for callbacks.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Your belongings are protected with comprehensive coverage.",
  },
  {
    icon: DollarSign,
    title: "No Hidden Fees",
    description: "Transparent pricing with no surprise charges on moving day.",
  },
  {
    icon: Users,
    title: "Expert Movers",
    description: "Professional teams with years of moving experience.",
  },
]

export function Features() {
  return (
    <section className="border-t-2 border-secondary bg-muted py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-center text-sm font-bold uppercase tracking-wider text-foreground">
          Why Choose MoveQuote
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-2 border-secondary bg-background p-6 text-center"
            >
              <feature.icon className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-4 text-sm font-bold uppercase tracking-wider text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
