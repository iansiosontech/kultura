/** @type {import('next').NextConfig} */

// Previously a static export for GitHub Pages (output: "export" +
// basePath/assetPrefix for the /kultura subpath). The leaderboard needs
// real API routes (a database-backed GET/POST), which static export
// can't produce at all — Next.js refuses to build a POST route handler
// under output: "export". Deploying on Vercel serves from the domain
// root, so the GH-Pages-only basePath logic goes away too.
const nextConfig = {};

export default nextConfig;
