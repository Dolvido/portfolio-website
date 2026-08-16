import Link from "next/link";

interface ArticleChromeProps {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  quote?: string;
  details?: Array<{
    label: string;
    value: string;
    accent?: boolean;
  }>;
  children: React.ReactNode;
}

export default function ArticleChrome({
  backHref,
  backLabel,
  eyebrow,
  title,
  subtitle,
  quote,
  details,
  children,
}: ArticleChromeProps) {
  return (
    <main className="portfolio-content container">
      <article className="py-12 md:py-16">
        <Link href={backHref} className="accent-link mb-8 inline-block text-xs font-semibold uppercase">
          &lt;- {backLabel}
        </Link>

        <header className="border-t-2 border-[var(--ink)] pt-5">
          <div className="text-xs font-semibold uppercase text-[var(--muted)]">{eyebrow}</div>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold uppercase leading-tight md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">{subtitle}</p>
          {quote ? (
            <div className="mt-8 border-y-2 border-[var(--ink)] py-6 text-lg font-medium leading-8">
              {quote}
            </div>
          ) : null}
          {details?.length ? (
            <dl className="mt-8 grid border-l border-t border-[var(--ink)] sm:grid-cols-2 lg:grid-cols-3">
              {details.map((detail) => (
                <div key={detail.label} className="border-b border-r border-[var(--ink)] p-4">
                  <dt className="text-[10px] font-semibold uppercase text-[var(--muted)]">{detail.label}</dt>
                  <dd
                    className={`mt-2 text-xs font-semibold uppercase ${
                      detail.accent ? "text-[var(--accent)]" : "text-[var(--ink)]"
                    }`}
                  >
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </header>

        <div className="article-body mt-12">{children}</div>
      </article>
    </main>
  );
}

export function ArticleSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 grid gap-5 md:grid-cols-[150px_1fr] md:gap-8">
      <div className="text-xs font-semibold uppercase text-[var(--muted)]">{label}</div>
      <div className="border-t-2 border-[var(--ink)] pt-5">
        <h2 className="text-2xl font-bold uppercase">{title}</h2>
        <div className="mt-5 space-y-5 text-sm leading-8 text-[var(--muted)]">{children}</div>
      </div>
    </section>
  );
}

export function NumberedPanel({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[var(--rule)] py-5">
      <div className="mb-3 flex items-baseline gap-4">
        <span className="text-xs font-semibold text-[var(--accent)]">[{number}]</span>
        <h3 className="text-lg font-bold text-[var(--ink)]">{title}</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </div>
  );
}
