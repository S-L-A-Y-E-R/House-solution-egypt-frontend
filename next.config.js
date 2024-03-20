/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  images: {
    // path: '/', // Update this value if your images are in a different directory
    domains: ['th.bing.com', 'res.cloudinary.com', 'test.housepointegypt.com', '127.0.0.1:8000', 'housepointegypt.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test.housepointegypt.com',
        port: '',
        pathname: '/uploads/properties/**',
      },
      {
        protocol: 'https',
        hostname: 'housepointegypt.com',
        pathname: '/api/uploads/properties/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/uploads/properties/**',
      }, {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/uploads/blogs/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next',
          outputPath: 'static/fonts',
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },
};
