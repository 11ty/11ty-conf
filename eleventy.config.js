import pluginWebc from "@11ty/eleventy-plugin-webc";
import { eleventyImagePlugin } from "@11ty/eleventy-img";


export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"_components/**/*.webc",
			"npm:@11ty/eleventy-img/*.webc",
		]
	});

	eleventyConfig.addWatchTarget("_components/**/*.css");

	eleventyConfig.addPassthroughCopy({
		"public/*": "/public/",
		"node_modules/@11ty/logo/assets/logo-bg.svg": "/public/logo.svg",
	}).addPassthroughCopy("robots.txt");

	// Image plugin
	eleventyConfig.addPlugin(eleventyImagePlugin, {
		// Set global default options
		formats: ["avif", "webp"],
		urlPath: "/public/built/",

		defaultAttributes: {
			loading: "lazy",
			decoding: "async"
		}
	});
};