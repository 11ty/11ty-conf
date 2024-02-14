import crypto from "node:crypto";

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

async function getButtondownSubscriberJson(emailOrId, apiKey) {
	let buttondownResponse = await fetch(`https://api.buttondown.email/v1/subscribers/${emailOrId}`, {
		headers: {
			"Authorization": `Token ${apiKey}`
		}
	});

	if(buttondownResponse.status === 404) {
		// TODO insert into buttondown API
		// throw new Error("Could not find user.");
		return {};
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

function renderLayout(title, head, body) {
	let description = `One uniquely-generated ticket for the 11ty Conference.`;

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
	let buttondownData = await getButtondownSubscriberJson(emailOrId, context.env.BUTTONDOWN_API_KEY);

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

	return renderLayout(`${displayName}’s 11ty Conference 2024 Ticket.`, head, body);
}

async function renderPage(ticketId) {
	let fullTicketUrl = `${PRODUCTION_URL}tickets/${ticketId}`;
	let screenshotUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(fullTicketUrl)}/opengraph/`;

	let head = `
	<!-- Open Graph -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="${fullTicketUrl}">
	<meta property="og:site_name" content="11ty Conference, May 2024">
	<meta property="og:locale" content="en_US">
	<meta property="og:title" content="${title}">
	<meta property="og:description" content="${description}">
	<meta property="og:image" content="https://v1.screenshot.11ty.dev/${encodeURIComponent(fullTicketUrl)}/opengraph/">
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:image:alt" content="${title}">

	<!-- Identity -->
	<link rel="icon" type="image/png" sizes="96x96" href="/public/favicon.png">

	<link rel="stylesheet" href="/public/global.css">
	<style>
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 4em 0;
	}
	main {
		max-width: 100%;
		padding: 1em;
	}
	h1 {
		font-family: Saira Extra Condensed, system-ui;
		font-size: var(--step--1);
		line-height: 1.2;
		margin: 0;
	}
	h1 img {
		display: block;
		margin: 0 auto -.25em;
	}
	h1 b {
		display: block;
	}
	h1 b:first-child {
		font-size: 60%;
	}
	h1 b:nth-child(2) {
		font-size: 50%;
	}
	h1 b:last-child {
		margin-top: .25em;
		text-transform: uppercase;
	}
	browser-window img {
		display: block;
		max-width: 100%;
		height: auto;
		vertical-align: middle;
	}
	</style>
	<script type="module" src="/public/browser-window.js"></script>
`;

	let body = `
<header>
	<h1>
		<b>🎉 You’re registered 🎉</b>
		<b>for the</b>
		<b><img src="/public/logo.svg" width="200" height="200" alt="11ty" loading="eager"> Conference!</b>
	</h1>
</header>
<main>
	<browser-window flush mode="dark" style="--bw-background: #000;" url="${fullTicketUrl}">
		<img src="${screenshotUrl}" alt="One uniquely generated virtual ticket for 11ty Conference." width="1200" height="630" loading="eager" decoding="async">
	</browser-window>
</main>
<footer>
	<p>The above is a virtual ticket for the <a href="/">11ty International Symposium on Making Web Sites Real Good</a>. Do you want one of your own? <a href="/#subscription"><strong>Register today</strong></a>!</p>
</footer>`

	return renderLayout(`You’re registered for the 11ty Conference!`, head, body);
}

export {
	getButtondownSubscriberJson,
	renderTicket,
	renderPage,
}