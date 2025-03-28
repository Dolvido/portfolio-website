/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add fallbacks for Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        http: false,
        https: false,
        zlib: false,
      };
    }

    // Add a rule for binary files used by ONNX Runtime
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    // Exclude ONNX Runtime binary files from being processed
    config.module.rules.push({
      test: /onnxruntime_binding\.node$/,
      loader: 'ignore-loader',
    });

    // Handle @xenova/transformers package
    config.module.rules.push({
      test: /@xenova\/transformers/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', '@xenova/transformers', 'onnxruntime-node'],
  }
}

export default nextConfig;
