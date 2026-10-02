import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
export default function SiteLink({ href = '', children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) { const origin = 'https://lukepayne.web.app'; const local = (href === origin || href.startsWith(origin + '/') ? href.slice(origin.length) : href) || '/'; if (local.startsWith('/') || local.startsWith('#'))
    return <Link href={local} {...props}>{children}</Link>; const external = /^https?:/.test(local); return <a href={local} {...props} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}{external && <span className="external-marker">External ↗</span>}</a>; }
