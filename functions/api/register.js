import { getButtondownSubscriberJson } from "./util/render.js";

export async function onRequestGet(context) {
	try {
		throw new Error("Invalid method: GET")
	} catch (err) {
		return new Response(err, { status: 400 });
	}
}

export async function onRequestPost(context) {
	try {
		let formdata = await context.request.formData();
		let email = formdata.get("email");
		let buttondownData = await getButtondownSubscriberJson(email, context.env.BUTTONDOWN_API_KEY, true);
		let ticketId =  buttondownData.id.replace(/[\-]/g, "");

		return new Response("", {
			status: 302,
			headers: {
				Location: "/tickets/" + ticketId
			}
		});

		// return new Response(await renderPage(ticketId), {
		// 	headers: {
		// 		"Content-Type": "text/html;charset=utf-8",
		// 	},
		// })
	} catch (err) {
		return new Response(err, { status: 400 });
	}
}
