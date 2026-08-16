/** @type {import('next').NextConfig} */

// GitHub Pages serves the site from https://<user>.github.io/<repo>/,
// so every asset/route needs that repo name prefixed. Change this if you
// rename the repo. Leave as "" if you ever use a custom domain.
const repoName = "kultura";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export", // emit a fully static site into /out
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: { unoptimized: true }, // no server = no on-demand image optimizer
  trailingSlash: true, // maps /map -> /map/index.html, which Pages likes
};

export default nextConfig;