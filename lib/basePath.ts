const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a root-absolute public asset path for GitHub Pages basePath. */
export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}
