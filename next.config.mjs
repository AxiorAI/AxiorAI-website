/** @type {import('next').NextConfig} */

// GitHub project pages live at /<repo>. User/org sites (*.github.io) stay at /.
function resolveBasePath() {
  if (process.env.BASE_PATH !== undefined) {
    const value = process.env.BASE_PATH.trim();
    if (!value || value === "/") return "";
    return value.startsWith("/") ? value.replace(/\/$/, "") : `/${value}`;
  }

  if (process.env.GITHUB_ACTIONS === "true" && process.env.GITHUB_REPOSITORY) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    if (repo === `${owner}.github.io`) return "";
    return `/${repo}`;
  }

  return "";
}

const basePath = resolveBasePath();

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
