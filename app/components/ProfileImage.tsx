import Image from "next/image";

export default function ProfileImage() {
  return (
    <div className="relative aspect-[3/4] w-[220px] overflow-hidden border-2 border-[var(--ink)] bg-[var(--paper-deep)] sm:w-[260px] lg:w-[280px]">
      <Image
        src="/images/headshot2026.webp"
        alt="Luke Payne professional headshot"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 280px"
        className="object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--ink)] bg-[rgba(242,239,231,0.9)] px-3 py-2 text-xs font-semibold uppercase text-[var(--ink)]">
        Luke Payne / AI systems
      </div>
    </div>
  );
}
