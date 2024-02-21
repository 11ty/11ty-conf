import crypto from "node:crypto";

function isValidUrl(url) {
	try {
		new URL(url);
		return true;
	} catch(e) {
		return false;
	}
}

function displayUrl(url) {
	let u = new URL(url);
	return u.host + (u.pathname !== "/" ? u.pathname : "");
}

function pad(num, count) {
	return ("0".repeat(count) + num).slice(-1 * count);
}

async function getOpenCollectSupporterJson(email, apiKey) {
	if(email === "zach@zachleat.com") { // lol
		return {
			name: "Zach Leatherman",
			tagName: "Admin",
			avatar_url: "https://www.zachleat.com/img/avatar-2017.png",
			website: "https://www.zachleat.com/",
		}
	}

	let query = `
query eleventyBackers {
	collective(slug: "11ty") {
		members(email: "${email}", limit: 1) {
			nodes {
				account {
					name,
					imageUrl,
					... on Individual {
						email,
						website
					}
				}
			}
		}
	}
}
`;

	let response = await fetch("https://api.opencollective.com/graphql/v2", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Api-Key": apiKey
		},
		body: JSON.stringify({ query })
	});

	let json = await response.json();

	for(let supporter of json.data.collective.members.nodes) {
		if(supporter.account.email === email) {
			return {
				tagName: "Backer",
				name: supporter.account.name,
				avatar_url: supporter.account.imageUrl,
				website: supporter.account.website,
			};
		}
	}

	return {};
}


async function createNewButtondownSubscriber(email, apiKey) {
	let API_URL = `https://api.buttondown.email/v1/subscribers`;

	let body = JSON.stringify({
		email,
		tags: ["conf2024"],
		referrer_url: "https://conf.11ty.dev/"
	});

	let buttondownResponse = await fetch(API_URL, {
		headers: {
			"Authorization": `Token ${apiKey}`,
		},
		body,
		method: "post",
	});

	let json = await buttondownResponse.json();

	// We’re already good
	if(json.code === "email_already_exists") {
		// There might be a case for future events where the email already exists but not for the current tag.
		return {
			id: json.metadata.subscriber_id,
			// email,
		}
	}

	return {
		id: json.id,
	};
}

async function getButtondownSubscriberJson(ticketId, apiKey) {
	let API_URL = `https://api.buttondown.email/v1/subscribers/${ticketId}`; // could be email too

	let buttondownResponse = await fetch(API_URL, {
		headers: {
			"Authorization": `Token ${apiKey}`
		}
	});

	if(buttondownResponse.status === 404) {
		throw new Error("Could not find user.");
	}

	let json = await buttondownResponse.json();
	// if(!(json.tags || []).includes("conf2024")) {
	// 	// Is a subscriber but not for the conference.
	// 	// TODO insert?
	// 	throw new Error("Invalid subscriber tag.");
	// }

	return {
		id: json.id,
		email: json.email,
		number: json.secondary_id,
		avatar_url: json.avatar_url,
	}
}

async function getGravatarJson(email) {
	let hash = crypto.createHash("sha256").update(email).digest("hex");

	let gravatarResponse = await fetch(`https://en.gravatar.com/${hash}.json`, {
		headers: {
			// required by the gravatar API
			"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
		}
	});

	let json = await gravatarResponse.json();
	if(!json.entry || json.entry.length === 0) {
		return {};
	}
	let userData = json.entry[0];

	return {
		displayName: userData.displayName || userData.preferredUsername,
		avatar_url: `https://gravatar.com/avatar/${userData.hash}?s=400`,
		accounts: userData.accounts || [],
		urls: userData.urls || [],
	};
}

export {
	isValidUrl,
	displayUrl,
	pad,
	createNewButtondownSubscriber,
	getButtondownSubscriberJson,
	getOpenCollectSupporterJson,
	getGravatarJson,
}