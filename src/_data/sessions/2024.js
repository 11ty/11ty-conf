export default [
	{
		title: "Kickoff!",
		skipPage: true,
		datetime: {
			start: "2024-05-09T15:00:00Z",
			end: "2024-05-09T15:15:00Z",
			duration: "15 minutes",
		},
	},
	{
		title: "The Future of 11ty",
		description: "<p>A talk about the current state of the 11ty project, new tricks and releases, and where we’re going next.</p>",
		datetime: {
			start: "2024-05-09T15:15:00Z",
			end: "2024-05-09T15:37:00Z",
			duration: "22 minutes",
		},
		authors: [{
			name: "Zach Leatherman",
			avatarAlt: "Zach’s green avatar smiles at you",
			website: "https://www.zachleat.com/",
			bio: `<p>Zach is a builder for the web at <a href="https://cloudcannon.com/">CloudCannon</a>. He is the creator and maintainer of <a href="https://www.11ty.dev">Eleventy (11ty)</a>, an award-winning open source site generator. At one point he became entirely <a href="https://www.zachleat.com/web/fonts/"><em>too fixated</em> on web fonts</a>. He has given <a href="https://www.zachleat.com/web/speaking/">79 talks in nine different countries</a> at events like Beyond Tellerrand, Smashing Conference, Jamstack Conf, CSSConf, and <a href="https://www.zachleat.com/web/whitehouse/">The White House</a>. Formerly part of Netlify, <a href="https://www.filamentgroup.com/">Filament Group</a>, <a href="http://nejsconf.com/">NEJS CONF</a>, and <a href="http://nebraskajs.com">NebraskaJS</a>.</p>`,
		}]
	},
	{
		title: "Hints & Suggestions (First, Do No Harm)",
		description: "<p>The web is fundamentally different from other platforms, built around a radically political vision for resilience and user-control. CSS takes that to another level, attempting the almost absurd task of collaborative styling across devices and interfaces and languages. This is a quick dive into the origins of the web, and CSS in particular—the design constraints, and the range of strange proposals, and how we got where we are. By the end, we see the CSS is Awesome meme in a whole new light.</p>",
		datetime: {
			start: "2024-05-09T15:45:00Z",
			end: "2024-05-09T16:07:00Z",
			duration: "22 minutes",
		},
		authors: [{
			name: "Miriam Suzanne",
			avatar: "assets/speakers/miriam.jpg",
			avatarAlt: "Miriam stands in front of a microphone doing some public speaking with a slide deck projected in the background.",
			website: "https://www.oddbird.net/",
			bio: `<p>Miriam is an artist, developer, and open web advocate. She’s a co-founder of <a href="https://oddbird.net" target="_blank" rel="noopener">OddBird</a>, providing a range of web design and development services; and Invited Expert on the W3C CSS Working Group, developing new web standards like Cascade Layers, Container Queries, and Scope; and member of the <a href="https://sass-lang.com/" target="_blank" rel="noopener">Sass</a> core team. Miriam also provides in-depth CSS workshops and trainings, along with the team at OddBird. Offline, she might be repairing clocks, knitting socks, or creating hybrid performances with <a href="http://teacupgorilla.com" target="_blank" rel="noopener">Teacup Gorilla</a> & <a href="http://grapefruitlab.com" target="_blank" rel="noopener">Grapefruit Lab</a>.</p>`,
		}]
	},
	{
		title: "11ty and Large-Project Tooling",
		description: "<p>JetBrains has a knowledge base with lots of content, customizing, authors, developers… so we built it in Gatsby. Then switched to 11ty. But we wanted to keep some of the large-project tooling, so we added it. In this talk, we'll cover component driven development through TypeScript and TSX, unit testing with Vitest, in-editor validation of Markdown frontmatter for authors, content queries, and more.</p>",
		datetime: {
			start: "2024-05-09T16:10:00Z",
			end: "2024-05-09T16:32:00Z",
			duration: "22 minutes",
		},
		authors: [{
			name: "Paul Everitt",
			avatar: "assets/speakers/paul.jpeg",
			avatarAlt: "A smiling photo of Paul from the shoulders up. He is wearing a light colored polo shirt.",
			website: "https://jetbrains.com/guide/",
			bio: `<p>Paul is a Python and Web Developer Advocate at JetBrains. Before that, Paul was a co-founder of Zope Corporation, taking the first open source application server through $14M of funding. Paul has bootstrapped both the Python Software Foundation and the Plone Foundation. Prior to that, Paul was an officer in the US Navy, starting www.navy.mil in 1993.</p>`,
		}]
	},
	{
		title: "Break",
		skipPage: true,
		datetime: {
			start: "2024-05-09T16:45:00Z",
			end: "2024-05-09T17:00:00Z",
			duration: "15 minutes",
		},
	},
	{
		title: "Digital Frontiers, IndieWeb Cowboys, and A Place Online To Call Your Own",
		description: `<p>The IndieWeb is a community of developers and designers and web-surfing wraiths connected by a belief in personal websites/domains as identity, digital self-publishing, and perhaps most chiefly owning one's content. In this talk, Henry will explore the key principles of the IndieWeb, and specifically focus on the concept of POSSE (or "Publish (on your) Own Site, Syndicate Elsewhere"), its benefits, and how it empowers folks to reclaim ownership of their online content or data. They will also discuss concrete and actionable strategies for implementing POSSE in one's own online presence (PERHAPS USING ELEVENTY?!?!?) and the potential impact it can have on the wider web</p>`,
		datetime: {
			start: "2024-05-09T17:00:00Z",
			end: "2024-05-09T17:11:00Z",
			duration: "11 minutes",
		},
		authors: [{
			name: "Henry Desroches",
			avatar: "assets/speakers/xdesro-sm.jpg",
			avatarAlt: "Close-up photo of Henry’s face, with chin-length light colored hair and a neutral facial expression. A cloudy blue sky sits in the background.",
			website: "https://henry.codes/",
			bio: `<p>Henry Desroches is a creative technologist and web designer based in Denver, Colorado. He’s been designing and coding the front-of-the-front-end of the web for nigh on a decade, specializing in CSS necromancy, web animation alchemy, and the dark magic of design systems. He’s worked for some incredible clients including YouTube and The New York Times, can kickflip (citation needed), loves keeping the web strange, and has beaten Elden Ring without leveling up.</p>`,
		}]
	},
	{
		title: "You're Probably Doing Web Performance Wrong",
		description: `<p>Lighthouse 100 is a common goal for developers seeking to make their sites fast, but does this really center user experience? In this talk, Sia will cover how to get a broader perspective on how real users are experiencing your website performance and better strategies for improving it.</p>`,
		datetime: {
			start: "2024-05-09T17:15:00Z",
			end: "2024-05-09T17:37:00Z",
			duration: "22 minutes",
		},
		authors: [{
			name: "Sia Karamalegos",
			avatar: "assets/speakers/sia.jpg",
			avatarAlt: "A photo of Sia speaking on a stage. Her hands are gesturing as she holds a presentation remote and she is smiling.",
			website: "https://sia.codes/",
			bio: `<p>Sia Karamalegos is a web developer and performance engineer, currently working on web performance at Shopify. She's also an international conference speaker, writer, Google Developer Expert in Web Technologies, and member of the W3C web performance working group. She co-organizes the Eleventy Meetup which won the 2021 Jammies Award for Outstanding Community Meetup.</p>`,
		}]
	},
	{
		title: "Building a Town That Doesn't Exist",
		description: "<p>The town of Question Mark, Ohio has a city hall, a newspaper, a library, a chicken joint, an ice cream store, a dump, a haunted factory, two cults, a sordid past, and a mysterious glowing void in the woods.</p><p>None of it is real, of course, but all of it exists on the web, thanks to Eleventy, Tailwind CSS, and Alpine.js, the crucial building blocks for creating a year-long immersive novel told not in a book but across the entire internet. This talk looks under the hood at how one person built 40 websites to tell the story of Question Mark, Ohio, a town that disappears into time.</p>",
		datetime: {
			start: "2024-05-09T17:40:00Z",
			end: "2024-05-09T17:51:00Z",
			duration: "11 minutes",
		},
		authors: [{
			name: "Dan Sinker",
			avatar: "assets/speakers/dan.jpg",
			avatarAlt: "Dan looks into the distance. He has thick rimmed glasses and a very long beard.",
			website: "https://questionmarkohio.com/",
			bio: `<p>Dan Sinker is a journalist, multimedia artist, and designer from Chicago. He founded the influential magazine Punk Planet in 1994 at just 19 years old and chronicled underground music, art, and politics there for 13 years. In 2010 he wrote @MayorEmanuel, the foul-mouthed, surreal Twitter account that The Economist called "the first truly great piece of digital literary work." In 2016 he co-founded the current-events podcast Says Who with YA author Maureen Johnson which has been releasing weekly for eight years.</p><p>In addition, he is a regular contributor to Esquire magazine and has written for The Atlantic and the New York Times. Most recently he has embarked on a year-long collaboration with the novelist Joe Meno to create Question Mark, Ohio, a multiplatform novel told across the Internet.</p>`,
		}]
	},
	{
		title: "Break",
		skipPage: true,
		datetime: {
			start: "2024-05-09T18:00:00Z",
			end: "2024-05-09T18:15:00Z",
			duration: "15 minutes",
		},
	},
	{
		title: "11ty Sites for People Who Don't Think they are Web Developers",
		description: "<p>For a long time, we've thought of web development in two separate streams. WYSWYG builders for non-techical people, code for the rest. What if 'non-technical' isn't real, ‘web dev’ doesn't have to be just something you do for money, and building sites on the open web can be a fun hobby, especially with 11ty?</p><p>In this talk, Adrianna will share how 11ty helped them finally break down the ’I’m not a web developer’ thoughts so they could build cool sites. Just like everyone can draw without being an artist, everyone can cook without being a chef.</p><p>Adrianna will also share a framework they've developed for talking about and teaching 11ty to people who think they are not web developers, but who really have things to share on the web.</p>",
		datetime: {
			start: "2024-05-09T18:15:00Z",
			end: "2024-05-09T18:26:00Z",
			duration: "11 minutes",
		},
		authors: [{
			name: "Adrianna Tan",
			avatar: "assets/speakers/adrianna.jpg",
			avatarAlt: "Adrianna has shoulder length dark hair and is looking into the camera with a subtle smile.",
			website: "https://popagandhi.com/",
			bio: `<p>Adrianna Tan is a technology professional with more than 15 years’ experience in software development, particularly in the area of entrepreneurship and product management. For the last 5 years, she has played a leading role in San Francisco's web services, particularly in Covid-19 information, vaccination, recovery and relief.</p>
			<p>As a civic technologist at one of the U.S.'s largest municipal government digital teams since 2019, she has had a front row seat to how government software is selected, procured, implemented, built, and used by people who rely on it. She believes that digital government doesn't have to suck.</p>
			<p>In a past life, she was a startup founder at an Indonesian micropayments company, early stage employee at several leading U.S. startups, an executive for U.S. and Singapore companies, ice cream company co-founder, and photographer and writer of several travel guidebooks and cookbooks.</p>`,
		}]
	},
	{
		title: "Don't Fear the Cascade",
		description: `<p>In this talk, Mayank will teach the audience how to make sense of the cascade, clear up some common misconceptions (e.g. shadow DOM vs host context styles), and ultimately offer practical advice on how to make best use of the cascade.</p>
		<p>They will show off some newer game-changing CSS features (like :where, cascade layers, and @scope) that enable us to write styles with confidence and intention. They may also sprinkle in some tips on how these new features interact with current workflows, including frameworks, build tools, browser devtools, and IDEs.</p>`,
		datetime: {
			start: "2024-05-09T18:30:00Z",
			end: "2024-05-09T18:52:00Z",
			duration: "22 minutes",
		},
		authors: [{
			name: "Mayank",
			avatar: "assets/speakers/mayank.png",
			avatarAlt: "A photo of Mayank, with ear-length hair covering one eye. They are wearing a pair of dark rimmed glasses and have medium length dark facial hair. They are looking down and wearing a black t-shirt.",
			website: "https://www.mayank.co/",
			bio: `<p>Mayank is a design engineer who cares deeply about accessibility and inclusivity. They enjoy working with new, revolutionary web tech, such as HTML and CSS. In their free time, they run their mouth on their personal blog.</p>`,
		}]
	},
	{
		title: "Managing content management (with no vendor lock-in): Git CMS and static API generation, together at last!",
		slugTitle: "Managing content management",
		description: `<p>If Jamstack has taught us anything, it’s that websites work best when they’re generated from folders full of flat files. Even massively interconnected websites!</p>
		<p>We talk through a classically Jamstacky approach to content management for large organizations: mounting shared layout and component repositories, creating a central content lake to aggregate content like news articles, and automating site builds and deployments when your content or dependencies change.</p>`,
		datetime: {
			start: "2024-05-09T18:55:00Z",
			end: "2024-05-09T19:06:00Z",
			duration: "11 minutes",
		},
		hideAuthorsFromHomePage: true,
		authors: [{
			name: "Liam Bigelow",
			avatar: "assets/avatars/liam.jpeg",
			avatarAlt: "",
			bio: `<p>Liam Bigelow is a senior software engineer based in Dunedin, New Zealand.</p>
			<p>He creates and supports open-source tooling for static sites, including the static search tool Pagefind, and the static API generator Flatlake.</p>
			<p>He co-created the word-building game Truncate — and still spends hours playing it, both for quality control purposes and to learn fun-at-parties facts about etymology.</p>`,
		}, {
			name: "David Large",
			avatar: "assets/avatars/david.jpg",
			avatarAlt: "David (in black and white)",
			bio: `<p>David Large is a writer and static site enthusiast based in Dunedin, New Zealand, where he covers SSGs and related open-source tools for <a href="http://cloudcannon.com/">CloudCannon.com</a>.</p>
			<p>When he isn’t pushing pixels or wrangling Liquid templates, he helps to organize HugoConf, builds arcade game cabinets, and carves wooden spoons.</p>`,
		}]
	},
	{
		title: "Break",
		skipPage: true,
		datetime: {
			start: "2024-05-09T19:15:00Z",
			end: "2024-05-09T19:30:00Z",
			duration: "15 minutes",
		},
	},
	{
		title: "Come to the light side: HTML Web Components",
		description: `<p>While Web Components have been around for years, they're seeing a bit of a renaissance thanks to an emerging approach for authoring them: ditch the shadow DOM and progressively enhance existing HTML.</p>
		<p>In this talk, we'll look at what Web Components, how the "HTML Web Component" approach works, why it's awesome, and some tips, tricks, and gotchas when working with them.</p>`,
		datetime: {
			start: "2024-05-09T19:30:00Z",
			end: "2024-05-09T19:52:00Z",
			duration: "22 minutes",
		},
		authors: [{
			name: "Chris Ferdinandi",
			avatar: "assets/speakers/chris-ferdinandi.jpg",
			avatarAlt: "Chris is wearing a red shirt and a black and white plaid long shirt, sitting at a table and typing on a Macbook. The Apple logo is illuminated on the back of the laptop.",
			website: "https://gomakethings.com/",
			bio: `<p>Chris Ferdinandi helps people build a simpler, faster, more resilient web.</p>
			<p>He creates courses and workshops and work with amazing clients. His developer tips newsletter is read by thousands of developers each weekday.</p>
			<p>He’s advised and written code for organizations like NASA, Apple, Harvard Business School, Chobani, and Adidas. Chris Coyier, the founder of CSS-Tricks and CodePen, has described his writing as “infinitely quote-worthy.”</p>
			<p>Chris loves pirates, puppies, and Pixar movies, and lives near horse farms in rural Massachusetts.</p>`,
		}]
	},
	{
		title: "Chinese Type Systems",
		description: `<p>In this talk, ivan will talk about understanding chinese type systems, pairing chinese fonts, and why its so hard to put your chinese font in the @font-face in CSS. Typesetting on the web with chinese fonts is extremely difficult and ivan will give examples of pages that do this beautifully, and recommendations on how to find these.</p>
		<p>They will also talk about the history of the chinese language, the differences in character based vs glyph based, and the difficulties of pairing the two types together. They’ll dive into the various classifications of systems that they use and talk about how to notice and pair chinese fonts together, as well as actionably implementing them in CSS and the bundle size of the file. </p>`,
		datetime: {
			start: "2024-05-09T19:55:00Z",
			end: "2024-05-09T20:06:00Z",
			duration: "11 minutes",
		},
		authors: [{
			name: "ivan zhao",
			avatar: "assets/speakers/ivan.jpg",
			avatarAlt: "Ivan is smiling with dark sunglasses and short dark hair. He is wearing a light colored collared shirt.",
			website: "https://ivanzhao.me/",
			bio: `<p>Ivan Zhao (he/him) is a poet, type designer, and site maker interested in nonlinear narratives, forms, and mechanics that reckon with digital, diasporic, and queer identity. His work interrogates individual and viewer agency. His research interests revolve around tools, computational systems, and play. When he's not making weird things on the internet, he's making weird bread in the kitchen.</p>`,
		}]
	},
	{
		title: "Light mode versus Dark mode.",
		description: `<p>It doesn’t have to be this way. Some people have very real physical reasons to need one mode over another. The rest of us are also allowed to have our favourites, or might prefer light mode in some situations and dark in others.</p>
		<p>What if Sara said it was super easy to code up both dark and light modes at the same time? Despite Sara’s evangelising efforts, not enough people know of the CSS property color-scheme and how powerful it is.</p>`,
		datetime: {
			start: "2024-05-09T20:10:00Z",
			end: "2024-05-09T20:32:00Z",
			duration: "22 minutes",
		},
		authors: [{
			name: "Sara Joy",
			avatar: "assets/speakers/sara.png",
			avatarAlt: "A drawn avatar of Sara, with short brown hair and red glasses. Their eyes are closed and are smiling. They are wearing green overalls and a purple shirt.",
			website: "https://sarajoy.dev/",
			bio: `<p>Sara has been extremely online since 1998, making her own personal websites since 1999. She fell off the wagon some time around 2010, until getting back on it in 2021 to switch her career from electronic engineering to web development. She loves the web platform, and wants it to be accessible to everyone.</p>`,
		}]
	},
	{
		title: "Wrap up and final comments",
		skipPage: true,
		datetime: {
			start: "2024-05-09T20:35:00Z",
			end: "2024-05-09T20:46:00Z",
			duration: "11 minutes",
		},
	},
]