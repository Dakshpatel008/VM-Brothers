import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/homes-projects", destination: "/projects", permanent: true },
      { source: "/vision", destination: "/how-we-work", permanent: true },
      { source: "/projects/1000-89-st-surfside", destination: "/projects", permanent: true },
      { source: "/projects/1710-s-bayshore-drive", destination: "/projects", permanent: true },
      { source: "/projects/1716-s-bayshore-drive", destination: "/projects", permanent: true },
      { source: "/projects/hibiscus-island-estate", destination: "/projects", permanent: true },
      { source: "/projects/miami-beach-residence", destination: "/projects", permanent: true },
      { source: "/projects/normandy-shores", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
