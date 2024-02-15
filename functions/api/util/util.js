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
	let query = `
query eleventyBackers {
	collective(slug: "11ty") {
		members(email: "${email}", limit: 1) {
			nodes {
				account {
					name,
					imageUrl,
					... on Individual {
						email
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
				name: supporter.account.name,
				avatar_url: supporter.account.imageUrl,
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

	return buttondownResponse;
}

async function getButtondownSubscriberJson(emailOrId, apiKey, insertOnMissing = false) {
	let API_URL = `https://api.buttondown.email/v1/subscribers/${emailOrId}`;

	let buttondownResponse = await fetch(API_URL, {
		headers: {
			"Authorization": `Token ${apiKey}`
		}
	});

	if(buttondownResponse.status === 404 && insertOnMissing) {
		buttondownResponse = await createNewButtondownSubscriber(emailOrId, apiKey);
	}

	let json = await buttondownResponse.json();
	if(!(json.tags || []).includes("conf2024")) {
		// Is a subscriber but not for the conference.
		// TODO insert?
		throw new Error("Invalid subscriber tag.");
	}

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