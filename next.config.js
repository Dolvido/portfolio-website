/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Add a rule for binary files used by ONNX Runtime
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
  // Required for edge runtime compatibility
  experimental: {
    serverComponentsExternalPackages: ['@xenova/transformers'],
  },
}

export default nextConfig
