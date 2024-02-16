import {
	isValidUrl,
	displayUrl,
	pad,
	getButtondownSubscriberJson,
	getOpenCollectSupporterJson,
	getGravatarJson,
} from "./util.js";

const CACHE_BUSTER = "_ticketv3/";

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

async function renderTicket(ticketId, context) {
	let buttondownData = await getButtondownSubscriberJson(ticketId, context.env.BUTTONDOWN_API_KEY, false);

	let email = buttondownData.email;

	let [gravatarData, opencollectiveData] = await Promise.all([
		getGravatarJson(email),
		getOpenCollectSupporterJson(email, context.env.OPENCOLLECT_API_KEY),
	]);

	let displayName = opencollectiveData.name || gravatarData.displayName;
	let userWebsiteUrl = opencollectiveData.website || gravatarData.urls?.[0]?.value;
	let avatarUrl = buttondownData.avatar_url || gravatarData.avatar_url || opencollectiveData.avatar_url;
	let ticketNumber = buttondownData.number;

	let head = `<link rel="stylesheet" href="/public/register-ticket.css">`;

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
					${opencollectiveData?.name ? `<div class="ticket-tag ticket-tag-supporter">OpenCollective ${opencollectiveData?.tagName || "Backer"}</div>` : ""}
					${userWebsiteUrl && isValidUrl(userWebsiteUrl) ? `<div class="ticket-tag ticket-tag-url"><img src="https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(userWebsiteUrl)}/" alt="Web site icon" width="64" height="64" class="ticket-icon"><code>${displayUrl(userWebsiteUrl)}</code></div>` : ""}
				</li>
			</ul>
			<div class="ticket-screenshot${userWebsiteUrl && isValidUrl(userWebsiteUrl) ? " ticket-screenshot-valid" : ""}">
				${userWebsiteUrl && isValidUrl(userWebsiteUrl) ?
					`<img src="https://v1.screenshot.11ty.dev/${encodeURIComponent(userWebsiteUrl)}/opengraph/${CACHE_BUSTER}" alt="Screenshot of ${userWebsiteUrl}" class="ticket-screenshot-img">`
					: `<img src="/public/fallback-ticket-url.png" width="727" height="1000" alt="International Symposium on Making Web Sites Real Good" class="ticket-screenshot-img">`
				}
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
		title: `${displayName}’s 11ty Conference (May 9, 2024) Ticket.`,
		description: `One uniquely-generated ticket for the 11ty Conference.`
	},head, body);
}

async function renderPage(ticketId, justRegistered = false, productionHost = "") {
	let shareUrl = (new URL(`/tickets/${ticketId}`, productionHost)).toString();
	let shareText = `Got my ticket to the 11ty Conference! ${shareUrl} #11ty #11tyConf`;

	let ticketImageUrl = (new URL(`/ticket-image/${ticketId}`, productionHost)).toString();
	let screenshotUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(ticketImageUrl)}/opengraph/${CACHE_BUSTER}`;
	let title = "11ty Conference (May 9, 2024)";
	let description = `One uniquely-generated ticket for the 11ty Conference.`;

	let head = `
	<!-- Open Graph -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="${shareUrl}">
	<meta property="og:site_name" content="11ty">
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
	<link rel="stylesheet" href="/public/show-ticket.css">
	<link rel="stylesheet" href="/public/giant-button.css">

	<script type="module" src="/public/browser-window.js"></script>
	<script type="module" src="/public/throbber.js"></script>
	<script type="module" src="/public/webcare-webshare.js"></script>
	<script type="module" src="/public/hypercard.js"></script>
`;

	let heading;
	let beforeContent;
	let afterContent;
	if(justRegistered) {
		heading = `<b>🎉 You’re registered for the 🎉</b>
<b><img src="/public/logo-cropped.svg" width="200" height="168" alt="11ty" loading="eager"> Conference!</b>`;
		beforeContent = `<p>This is your virtual ticket to the <a href="/">11ty International Symposium on Making Web Sites Real Good</a>.</p>
<p>You will <em>not</em> need to save this ticket to attend the conference (we’ll send you all the relevant information to your email address) but <strong>sharing your ticket</strong> on social media will help us spread the word about the conference!</p>`;
		afterContent = `<p>Here’s the ticket URL (it’s the same as the page you’re currently on):</p>
<p><code class="ticket-share">${shareUrl}</code></p>
<webcare-webshare label-copy="📋 Share your ticket!" label-after-copy="✅ Copied to clipboard." share-text="${shareText}" share-url="${shareUrl}">
	<button disabled class="giant-button">Share your ticket!</button>
</webcare-webshare>
<ul class="ticket-share-more">
	<li>Or try one of these links:</li>
	<li><a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}">LinkedIn</a></li>
	<li><a href="mailto:?subject=${encodeURIComponent("11ty Conference (2024)")}&body=${encodeURIComponent(shareText)}">Email</a></li>
	<li><a href="http://twitter.com/share?text=${encodeURIComponent(shareText)}" data-icon="😬">Twitter</a></li>
	<li><a href="https://fosstodon.org/@eleventy">Mastodon</a></li>
	<li><a href="https://www.threads.net/@eleventy_11ty">Threads</a></li>
	<li><a href="https://bsky.app/profile/11ty.dev">Bluesky</a></li>
</ul>
<script type="module">
if("localStorage" in window) {
	localStorage.setItem("11ty-conf-ticket-id", "${ticketId}");
}
</script>`
	} else {
		heading = `<b><a href="/"><img src="/public/logo-cropped.svg" width="200" height="168" alt="11ty" loading="eager"> Conference</a></b>`;
		beforeContent = `<p>This is a virtual ticket for the <a href="/">11ty International Symposium on Making Web Sites Real Good</a>.</p>`;

		// TODO put the registration form here!
		afterContent = `<a href="/#register" class="giant-button" id="cta"><strong>Join us—register!</strong></a>
<script type="module">
if("localStorage" in window) {
	let ticketId = localStorage.getItem("11ty-conf-ticket-id");
	let cta = document.getElementById("cta");
	let currentTicketId = location.pathname.split("/").pop();
	if(ticketId && currentTicketId === ticketId) {
		cta.remove(); // remove the button—they are already registered and viewing their ticket
	} else if(ticketId && cta) {
		cta.setAttribute("href", \`/tickets/\$\{ticketId\}\`);
		cta.innerText = "View your ticket.";
	}
}
</script>`;
	}


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
			<hyper-card>
				<throb-ber>
					<img src="${screenshotUrl}" alt="One uniquely generated virtual ticket for 11ty Conference." width="1200" height="630" loading="eager" decoding="async">
				</throb-ber>
			</hyper-card>
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
	renderTicket,
	renderPage,
}