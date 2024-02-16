import { renderPage } from "../api/util/render.js";

export async function onRequestGet(context) {
	try {
		let split = context.request.url.split("/");
		let uniqueId = split.pop();

		if(!uniqueId) {
			throw new Error("Unknown user.");
		}

		// Show the success page. Otherwise, show the ticket.
		let justRegistered = context.request.headers.get("referer") === context.env.CUSTOM_HOST;

		let html = await renderPage(uniqueId, justRegistered, context.env.CUSTOM_HOST);

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
