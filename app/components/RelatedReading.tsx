import Link from "next/link";
import { getRelatedReading } from "../data/reading";

export default function RelatedReading({ path }: { path: string }) {
  const links = getRelatedReading(path);
  if (!links.length) return null;

  return (
    <aside aria-label="Related projects and reading" className="mt-12 border-t-2 border-[var(--ink)] pt-5">
      <h2 className="text-lg font-bold uppercase">Related projects &amp; reading</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {links.map((link) => (
          <div key={link.href} className="border-t border-[var(--rule)] pt-4">
            <Link href={link.href} className="accent-link inline-block py-2 font-semibold">{link.title} -&gt;</Link>
            <p className="mt-1 text-sm leading-7 text-[var(--muted)]">{link.description}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
