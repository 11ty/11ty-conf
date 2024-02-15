import crypto from "node:crypto";

// TODO
const PRODUCTION_URL = "https://register.11ty-conf.pages.dev/";

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
		// TODO insert into buttondown API
		// throw new Error("Could not find user.");
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

function renderLayout({ title, description }, head, body) {
	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="${description}">

		<title>${title}</title>

		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@600&display=swap">
		${head}
	</head>
	<body>
		${body}
	</body>
</html>`
}

async function renderTicket(emailOrId, context) {
	let buttondownData = await getButtondownSubscriberJson(emailOrId, context.env.BUTTONDOWN_API_KEY, false);

	let email = buttondownData.email;

	let gravatarData = await getGravatarJson(email);
	let opencollectiveData = await getOpenCollectSupporterJson(email, context.env.OPENCOLLECT_API_KEY);

	let displayName = opencollectiveData.name || gravatarData.displayName;
	let userWebsiteUrl = gravatarData.urls?.[0]?.value;
	let avatarUrl = buttondownData.avatar_url || gravatarData.avatar_url || opencollectiveData.avatar_url;
	let ticketNumber = buttondownData.number;

	let head = `<link rel="stylesheet" href="/public/register-ticket.css">
<style>
.ticket-screenshot-valid {
	background-image: url(https://v1.screenshot.11ty.dev/${encodeURIComponent(userWebsiteUrl)}/opengraph/_cachebust/);
}
</style>`;

	let body = `<main>
	<div class="ticket">
		<div class="ticket-content">
			<ul class="ticket-metadata">
				<li class="ticket-hed">
					<b>11ty Conference</b> Ticket${ticketNumber ? ` #${pad(ticketNumber, 4)}` : ""}
				</li>
				<li class="ticket-tags">
					<div class="ticket-tag ticket-tag-cta">Join at <img src="https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent('https://conf.11ty.dev/')}/" alt="Web site icon" width="64" height="64" class="ticket-icon"><code>${displayUrl('https://conf.11ty.dev/')}</code></div>
					</li>
					${displayName ? `<li class="ticket-name">
					<img src="${avatarUrl}" alt="User avatar" width="64" height="64" class="ticket-icon">${displayName}
					</li>` : ""}
					<li class="ticket-tags">
					${opencollectiveData?.name ? `<div class="ticket-tag ticket-tag-supporter">OpenCollective Backer</div>` : ""}
					${userWebsiteUrl && isValidUrl(userWebsiteUrl) ? `<div class="ticket-tag ticket-tag-url"><img src="https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(userWebsiteUrl)}/" alt="Web site icon" width="64" height="64" class="ticket-icon"><code>${displayUrl(userWebsiteUrl)}</code></div>` : ""}
				</li>
			</ul>
			<div class="ticket-screenshot${userWebsiteUrl && isValidUrl(userWebsiteUrl) ? " ticket-screenshot-valid" : ""}">
				<picture>
					<source type="image/avif" srcset="/public/built/FIy3o0n-oI-250.avif 250w">
					<source type="image/webp" srcset="/public/built/FIy3o0n-oI-250.webp 250w">
					<img loading="lazy" decoding="async" src="/public/built/FIy3o0n-oI-250.png" alt="The possum mascot floating on a red balloon via a light blue tether attached at the waist. They are wearing oversized glasses." width="250" height="437" class="ticket-mascot">
				</picture>
			</div>
		</div>
	</div>
</main>`;

	return renderLayout({
		title: `${displayName}’s 11ty Conference (2024) Ticket.`,
		description: `One uniquely-generated ticket for the 11ty Conference.`
	},head, body);
}

async function renderPage(ticketId, justRegistered = false) {
	let shareUrl = `${PRODUCTION_URL}tickets/${ticketId}`;
	let screenshotUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(`${PRODUCTION_URL}ticket-image/${ticketId}`)}/opengraph/`;
	let title = "11ty Conference (2024)";
	let description = `One uniquely-generated ticket for the 11ty Conference.`;

	let head = `
	<!-- Open Graph -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="${shareUrl}">
	<meta property="og:site_name" content="11ty Conference, May 2024">
	<meta property="og:locale" content="en_US">
	<meta property="og:title" content="${title}">
	<meta property="og:description" content="${description}">
	<meta property="og:image" content="${screenshotUrl}">
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:image:alt" content="${title}">

	<!-- Identity -->
	<link rel="icon" type="image/png" sizes="96x96" href="/public/favicon.png">

	<link rel="stylesheet" href="/public/global.css">
	<style>
	body {
		margin: var(--rhythm) 0;
	}
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	main {
		max-width: 40rem;
		padding: 1rem;
	}
	.ticket-title {
		font-family: Saira Extra Condensed, system-ui, sans-serif;
		font-size: var(--step--1);
		line-height: 1.2;
		margin: 0;
	}
	.ticket-title img {
		display: inline;
		width: auto;
		height: 1em;
		margin-bottom: -.15em;
	}
	.ticket-title b {
		display: block;
	}
	.ticket-title b:first-child:not(:last-child) {
		font-size: 50%;
	}
	.ticket-title b:last-child {
		margin-top: .25em;
		text-transform: uppercase;
	}
	.ticket-preview {
		margin: 0 -1rem;
	}
	.ticket-preview browser-window img {
		display: block;
		margin: 0 auto;
		max-width: 100%;
		height: auto;
		vertical-align: middle;
	}
	@media (min-width: 50em) { /* 800px */
		.ticket-preview {
			margin-inline: -10vw;
		}
	}
	.ticket-description {
		max-width: 40em;
		margin: 0 auto;
	}
	.ticket-description p {
		font-size: 1.5em;
	}
	.ticket-share {
		display: block;
		word-break: break-all;
		background-color: #000;
		padding: 1rem;
		border-radius: .25em;
		margin: 0 -1rem;
	}
	</style>
	<script type="module" src="/public/browser-window.js"></script>
`;

	let heading;
	let beforeContent;
	let afterContent;
	if(justRegistered) {
		heading = `<b>🎉 You’re registered for the 🎉</b>
<b><img src="/public/logo-cropped.svg" width="200" height="168" alt="11ty" loading="eager"> Conference!</b>`;
		beforeContent = `<p>This is your virtual ticket the <a href="/">11ty International Symposium on Making Web Sites Real Good</a>.</p>
<p>You will <em>not</em> need to save this ticket to attend the conference (we’ll send you all the relevant information to your email address) but <strong>sharing your ticket</strong> on social media will help us spread the word about the conference!</p>`;
		afterContent = `<p>Here’s the ticket URL (it’s the same as the page you’re currently on):</p>
<p><code class="ticket-share">${shareUrl}</code></p>`
	} else {
		heading = `<b><img src="/public/logo-cropped.svg" width="200" height="168" alt="11ty" loading="eager"> Conference</b>`;
		beforeContent = `<p>This is a virtual ticket for the <a href="/">11ty International Symposium on Making Web Sites Real Good</a>.</p>`;

		// TODO put the registration form here!
		afterContent = `<p>Join us—<a href="/#registration"><strong>Register today</strong></a>!</p>`;
	}


	// TODO justRegistered
	let body = `
<header>
	<h1 class="ticket-title">${heading}</h1>
</header>
<main>
	<section class="ticket-description">
		${beforeContent}
	</section>
	<section class="ticket-preview">
		<browser-window flush mode="dark" style="--bw-background: #000;" icon url="${shareUrl}">
			<img src="${screenshotUrl}" alt="One uniquely generated virtual ticket for 11ty Conference." width="1200" height="630" loading="eager" decoding="async">
		</browser-window>
	</section>
	<section class="ticket-description">
		${afterContent}
	</section>
</main>`

	return renderLayout({
		title,
		description,
	}, head, body);
}

export {
	getButtondownSubscriberJson,
	renderTicket,
	renderPage,
}