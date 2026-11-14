import { withBase } from "@/lib/basePath";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

// Project artwork: the project screenshot if we have one, otherwise the
// client's logo on paper, otherwise the generative coded tile.
export function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={withBase(project.image)}
        alt={project.title}
        className="h-full w-full object-cover"
      />
    );
  }

  if (project.logo) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-paper p-6">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(#14130F_1.2px,transparent_1.2px)] [background-size:12px_12px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBase(project.logo)}
          alt={`${project.title} logo`}
          className="relative max-h-[50%] max-w-[80%] object-contain"
        />
        <span className="absolute bottom-4 left-5 font-mono text-[11px] uppercase tracking-label text-ink">
          {project.category}
        </span>
      </div>
    );
  }

  return <ProjectVisual seed={project.title} label={project.category} />;
}
