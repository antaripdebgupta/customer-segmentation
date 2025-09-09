/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    images: {
      domains: ["api.microlink.io"],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "x-robots-tag",
              value: "index, follow",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  