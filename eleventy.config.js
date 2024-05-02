import fetch from "@11ty/eleventy-fetch";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { eleventyImagePlugin } from "@11ty/eleventy-img";
import * as calendarLink from "calendar-link";

export default function(eleventyConfig) {
	eleventyConfig.setServerOptions({
		domDiff: false
	});

	eleventyConfig.addJavaScriptFunction("displayUrl", (rawUrl) => {
		try {
			let u = new URL(rawUrl);
			return u.hostname + (u.pathname !== "/" ? u.pathname : "");
		} catch(e) {
			return rawUrl;
		}
	});

	eleventyConfig.addJavaScriptFunction("displayDateTime", (raw) => {
		try {
			raw = raw.trim();
			if(!raw.endsWith("Z")) {
				return raw;
			}

			let [date, time] = raw.split("T");
			return time.slice(0, 5) + " UTC";
		} catch(e) {
			return raw;
		}
	});

	eleventyConfig.addJavaScriptFunction("addSessionToCalendarUrl", (type, session) => {
		if(type !== "google" && type !== "ics" && type !== "outlook" && type !== "office365" && type !== "yahoo") {
			throw new Error("Invalid type for `addToCalendarUrl`: " + type );
		}
		const slugify = eleventyConfig.getFilter("slugify");

		let { title, description } = session;
		let { start, end } = session.datetime;

		return calendarLink[type]({
			title: session.authors ? `11ty Conference: ${title}—${session.authors.map(author => author.name).join(", ")}` : title,
			description: `https://conf.11ty.dev/2024/${slugify(session.slugTitle || session.title)}/
${description}`,
			start,
			end,
			location: "https://www.youtube.com/watch?v=iLxJ6PtuF9M"
		})
	});

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

	// Thanks to https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	function randomizeArray(arr) {
		let a = arr.slice(0);
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	eleventyConfig.addJavaScriptFunction("shuffle", (arr) => {
		if (Array.isArray(arr)) {
			return randomizeArray(arr);
		}

		throw new Error("Array expected in `shuffle` filter");
	});

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"src/_components/**/*.webc",
			"npm:@11ty/eleventy-img/*.webc",
		]
	});

	eleventyConfig.addWatchTarget("src/_components/**/*.css");
	eleventyConfig.addWatchTarget("src/public/*.css");

	eleventyConfig.addPassthroughCopy({
		"_routes.json": "_routes.json",
		"src/public/*": "/public/",
		"node_modules/@11ty/logo/assets/logo-bg.svg": "/public/logo.svg",
		"node_modules/@zachleat/browser-window/browser-window.js": "/public/browser-window.js",
		"node_modules/@zachleat/throbber/throbber.js": "/public/throbber.js",
		"node_modules/@zachleat/webcare-webshare/webcare-webshare.js": "/public/webcare-webshare.js",
		"node_modules/@zachleat/hypercard/hypercard.js": "/public/hypercard.js",
		"src/_components/global.css": "/public/global.css",
	});
	eleventyConfig.addPassthroughCopy("robots.txt");
	eleventyConfig.addPassthroughCopy("_redirects");

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

	return {
		dir: {
			input: "src",
		}
	}
};