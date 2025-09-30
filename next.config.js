/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['cdn.schema.io', 'cdn.swell.store', 'media.istockphoto.com', 'images.unsplash.com', 'cdn.builder.io'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true
      },
      {
        source: '/home',
        destination: '/',
        permanent: true
      }
    ];
  }
};
