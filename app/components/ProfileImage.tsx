import Image from "next/image";

export default function ProfileImage() {
  return (
    <div className="relative aspect-[3/4] w-[88px] overflow-hidden border border-[var(--ink)] bg-[var(--paper-deep)] md:w-[220px]">
      <Image
        src="/images/headshot2026.webp"
        alt="Luke Payne professional headshot"
        fill
        priority
        sizes="(max-width: 767px) 88px, 220px"
        className="object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 hidden border-t border-[var(--ink)] bg-[rgba(242,239,231,0.9)] px-3 py-2 text-xs font-semibold uppercase text-[var(--ink)] md:block">
        Luke Payne / AI systems
      </div>
    </div>
  );
}
