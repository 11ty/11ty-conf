import fetch from "@11ty/eleventy-fetch";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { eleventyImagePlugin } from "@11ty/eleventy-img";

export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	eleventyConfig.addJavaScriptFunction("fetchGoogleFontsCss", async (cssUrl) => {
		try {
			let css = await fetch(cssUrl, {
				duration: "1d",
				type: "text",
				fetchOptions: {
					headers: {
						"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
					}
				}
			});
			return css;
		} catch(e) {
			console.log( `Failed getting Google Fonts CSS (${cssUrl})`, e );
			return "";
		}
	});

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"_components/**/*.webc",
			"npm:@11ty/eleventy-img/*.webc",
		]
	});

	eleventyConfig.addWatchTarget("_components/**/*.css");
	eleventyConfig.addWatchTarget("public/*.css");

	eleventyConfig.addPassthroughCopy({
		"_routes.json": "_routes.json",
		"public/*": "/public/",
		"node_modules/@11ty/logo/assets/logo-bg.svg": "/public/logo.svg",
		"node_modules/@zachleat/browser-window/browser-window.js": "/public/browser-window.js",
		"node_modules/@zachleat/throbber/throbber.js": "/public/throbber.js",
		"_components/global.css": "/public/global.css",
	}).addPassthroughCopy("robots.txt");

	// Image plugin
	eleventyConfig.addPlugin(eleventyImagePlugin, {
		// Set global default options
		formats: ["avif", "webp", "png"],
		urlPath: "/public/built/",

		defaultAttributes: {
			loading: "lazy",
			decoding: "async"
		}
	});
};