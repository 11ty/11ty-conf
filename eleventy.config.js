import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	eleventyConfig.addPlugin(pluginWebc);

	eleventyConfig.addPassthroughCopy({
		"public/*": "/public/",
		"node_modules/@11ty/logo/assets/logo-bg.svg": "/public/logo.svg",
	});
};