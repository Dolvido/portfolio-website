'use client';

import { FC } from 'react';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

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
  icon = <MessageSquare className="w-8 h-8" />,
}) => {
  return (
    <Link 
      href={href}
      className="group block relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-teal-400 p-[1px] transition-all hover:shadow-xl"
    >
      <div className="h-full relative rounded-xl bg-slate-900 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-violet-400">{category}</span>
          <div className="bg-slate-800 rounded-lg p-2">
            {icon}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">
          {title}
        </h3>

        <p className="text-slate-400 mb-4 flex-grow">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center text-white group-hover:text-blue-400 transition-colors">
          View Project
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard; 