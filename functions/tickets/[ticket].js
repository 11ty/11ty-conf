import { renderPage } from "../api/util/render.js";

export async function onRequestGet(context) {
	try {
		let u = new URL(context.request.url);
		let split = u.pathname.split("/");
		let uniqueId = split.pop();

		if(!uniqueId) {
			throw new Error("Unknown user.");
		}

		// Show the success page. Otherwise, show the ticket.
		let justRegisteredRedirect = context.request.headers.get("referer") === context.env.CUSTOM_HOST;
		// let justRegisteredRedirect = (context.request.headers.get("referer") || "").startsWith(context.env.CUSTOM_HOST);

		// from a View your ticket ?registered link
		// let justregisteredUrlParam = (new URL(context.request.url)).searchParams.get("registered") === "";

		let html = await renderPage(uniqueId, justRegisteredRedirect, context.env.CUSTOM_HOST);

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
