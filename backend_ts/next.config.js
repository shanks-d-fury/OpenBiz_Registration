/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	// Enable if you need to allow connections from other hosts
	experimental: {
		serverComponentsExternalPackages: [],
	},
};

module.exports = nextConfig;
