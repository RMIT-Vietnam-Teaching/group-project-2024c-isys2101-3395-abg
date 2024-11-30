/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        instrumentationHook: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
