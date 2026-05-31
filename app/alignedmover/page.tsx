import type { AlignedMover } from "@/lib/types/alignedmover";

async function getAlignedMoverData(): Promise<AlignedMover> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/alignedmover`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch aligned mover data");
  }

  return res.json();
}

export default async function AlignedMoverPage() {
  const data = await getAlignedMoverData();

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">{data.name}</h1>
          <p className="mt-2 text-lg text-foreground/70">{data.description}</p>
          <span
            className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-medium ${
              data.status === "active"
                ? "bg-green-100 text-green-800"
                : data.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {data.status}
          </span>
        </header>

        <section className="mb-8 rounded-lg border border-foreground/10 bg-foreground/5 p-6">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Configuration
          </h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-foreground/60">
                Alignment
              </dt>
              <dd className="text-foreground">{data.configuration.alignment}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-foreground/60">Speed</dt>
              <dd className="text-foreground">{data.configuration.speed}x</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-foreground/60">
                Direction
              </dt>
              <dd className="text-foreground">{data.configuration.direction}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-foreground/60">Easing</dt>
              <dd className="text-foreground">{data.configuration.easing}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-foreground/60">
                Auto Start
              </dt>
              <dd className="text-foreground">
                {data.configuration.autoStart ? "Yes" : "No"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-foreground/60">Loop</dt>
              <dd className="text-foreground">
                {data.configuration.loop ? "Yes" : "No"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mb-8 rounded-lg border border-foreground/10 bg-foreground/5 p-6">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Metadata
          </h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-foreground/60">
                Version
              </dt>
              <dd className="text-foreground">{data.metadata.version}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-foreground/60">Author</dt>
              <dd className="text-foreground">{data.metadata.author}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-foreground/60">
                Priority
              </dt>
              <dd className="text-foreground">{data.metadata.priority}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-foreground/60">Tags</dt>
              <dd className="flex flex-wrap gap-2">
                {data.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-foreground/10 px-2 py-1 text-xs text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-lg border border-foreground/10 bg-foreground/5 p-6">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            API Response
          </h2>
          <pre className="overflow-x-auto rounded bg-foreground/10 p-4 text-sm text-foreground">
            {JSON.stringify(data, null, 2)}
          </pre>
        </section>

        <footer className="mt-8 text-center text-sm text-foreground/50">
          <p>Slug: /{data.slug}</p>
          <p>Last updated: {new Date(data.updatedAt).toLocaleString()}</p>
        </footer>
      </div>
    </main>
  );
}
