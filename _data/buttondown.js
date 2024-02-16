import fetch from "@11ty/eleventy-fetch";
import "dotenv/config";

export default async function() {
	let API_URL = `https://api.buttondown.email/v1/subscribers`;

	let json = await fetch(API_URL, {
		duration: "6h",
    type: "json",
		fetchOptions: {
			headers: {
				"Authorization": `Token ${process.env.BUTTONDOWN_API_KEY}`
			}
		}
	});

	// let count = 0;
	// for(let subscriber of json.results) {
	// 	// Conference attendees only
	// 	if(subscriber.tags.includes("conf2024") && subscriber.subscriber_type === "regular") {
	// 		count++;
	// 	}
	// }

	return {
		count: json.count,
	};
}