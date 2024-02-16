import { createNewButtondownSubscriber } from "./util/util.js";

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
		let buttondownData = await createNewButtondownSubscriber(email, context.env.BUTTONDOWN_API_KEY);
		if(!buttondownData.id) {
			throw new Error("Could not create new subscriber in Buttondown.");
		}

		let ticketId =  (buttondownData.id || "").replace(/[\-]/g, "");

		// Redirect to the ticket page
		return new Response("", {
			status: 302,
			headers: {
				Location: `/tickets/${ticketId}`,
			}
		});
	} catch (err) {
		return new Response(err, { status: 400 });
	}
}
