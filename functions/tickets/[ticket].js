import { renderPage } from "../api/util/render.js";

// const PRODUCTION_URL = "http://localhost:8788/";
const PRODUCTION_URL = "https://register.11ty-conf.pages.dev/";

export async function onRequestGet(context) {
	try {
		let split = context.request.url.split("/");
		let uniqueId = split.pop();

		if(!uniqueId) {
			throw new Error("Unknown user.");
		}

		let justRegistered = context.request.headers.get("referer") === PRODUCTION_URL;

		let html = await renderPage(uniqueId, justRegistered);

		return new Response(html, {
			headers: {
				"Content-Type": "text/html;charset=utf-8",
			},
		});
	} catch (err) {
		return new Response(err, { status: 400 });
	}
}

export async function onRequestPost(context) {
	try {
		throw new Error("Invalid method: POST");
	} catch (err) {
		return new Response(err, { status: 400 });
	}
}
