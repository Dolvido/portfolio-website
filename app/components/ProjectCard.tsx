"use client";

import { FC } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

interface ProjectCardProps {
  category: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  icon?: React.ReactNode;
}

const ProjectCard: FC<ProjectCardProps> = ({
  category,
  title,
  description,
  tags,
  href,
  icon = <MessageSquare className="h-6 w-6" />,
}) => {
  return (
    <Link
      href={href}
      className="group block min-w-0 border border-[var(--ink)] bg-[rgba(242,239,231,0.88)] p-5 transition-colors hover:bg-[var(--paper-deep)]"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="min-w-0 text-xs font-semibold uppercase text-[var(--accent)] [overflow-wrap:anywhere]">
          {category}
        </span>
        <span className="shrink-0 border border-[var(--rule)] p-2 text-[var(--ink)]">{icon}</span>
      </div>

      <h3 className="text-xl font-bold [overflow-wrap:anywhere]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)] [overflow-wrap:anywhere]">{description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="min-w-0 max-w-full border border-[var(--rule)] px-2 py-1 text-xs text-[var(--muted)] [overflow-wrap:anywhere]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 text-xs font-semibold uppercase text-[var(--accent)] group-hover:text-[var(--ink)]">
        View project -&gt;
      </div>
    </Link>
  );
};

export default ProjectCard;
