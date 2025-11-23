export const blogPosts = [
  {
    slug: 'balancing-code-and-football',
    title: 'Balancing Code, Football, and Creative Experimentation',
    author: 'Juan Gunner',
    date: 'January 12, 2025',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'How I use structure, curiosity, and community to juggle writing code, playing football, and building new ideas.',
    sections: [
      {
        heading: 'Why routines matter',
        paragraphs: [
          'Every season teaches me that progress is less about dramatic breakthroughs and more about showing up with intentionality. My mornings start with a short journaling session, a coffee, and a 30-minute code warmup to keep the muscles moving. That ritual is simple, but it grounds me before practice or a product build. It is also a reminder that discipline in one arena fuels the other—tactical drills help me think in systems, and debugging trains the patience I need on the pitch.',
          'I design my week in sprints. Monday is discovery, Tuesday and Wednesday are build days, and Thursday is reserved for review and recovery. The cadence keeps my creativity from burning out while leaving room for inevitable surprises. It is not perfect, but it stops me from drifting into endless context switching that kills momentum.',
        ],
      },
      {
        heading: 'Training with constraints',
        paragraphs: [
          'Football practice is full of constrained games—two touches, 4v4, or finishing drills with limited space. I treat product ideas the same way. I write constraints into every experiment: build a feature in 48 hours, ship with only one dependency, or launch a landing page with a single, clear CTA. Those guardrails force choices, reveal assumptions faster, and make it easy to measure if something is resonating before I scale it.',
          'Constraints also help with learning. When I decided to deepen my React chops, I banned myself from adding new libraries for a month. Recreating common patterns by hand gave me a clearer mental model of the render cycle and helped me spot performance wins on future projects.',
        ],
      },
      {
        heading: 'Community keeps the pace honest',
        paragraphs: [
          'Teams make everything better. The locker room, the open-source contributors, and the web3 builders in my DMs all keep me accountable. I share weekly notes about what went well, what I broke, and what I am curious about next. Those notes are short, but they invite feedback and surface collaborators who want to test a build or join a scrimmage.',
          'On social, I experiment in public: posting small demos, sharing training clips, or inviting people to critique an onboarding flow. The feedback loops are fast, and even a tough comment is better than silence because it tells me someone cared enough to respond.',
        ],
      },
      {
        heading: 'Recovery is part of the job',
        paragraphs: [
          'The toughest lesson has been that more hours does not equal more output. Active recovery—light runs, mobility work, and stepping away from the keyboard—keeps both my body and code healthy. I keep a running list of ideas in Notion, but I do not chase them until I have slept and hydrated. The result is that when I sit down to work, I move with a clearer head and far fewer bugs.',
          'I also schedule buffer days every few weeks where I only read, watch tape, or explore someone else’s repo. That space keeps me hungry and resets my sense of what is possible, which makes the next sprint feel lighter.',
        ],
      },
      {
        heading: 'Shipping is the scoreline',
        paragraphs: [
          'All the routines, constraints, and recovery rituals only matter if something ships. I hold myself to a simple rule: deliver one meaningful update every week. Sometimes that is a new feature, sometimes it is a cleaned-up onboarding flow, and other times it is a blog post like this one. The scoreboard is public because momentum is contagious, and sharing progress invites people to build or play alongside me.',
          'Whether I am pressing high on the field or optimizing a backend service, the goal is the same—leave the space better than I found it and make sure the team sees forward motion.',
        ],
      },
    ],
  },
  {
    slug: 'designing-resilient-web-experiences',
    title: 'Designing Resilient Web Experiences for Fast-Moving Teams',
    author: 'Juan Gunner',
    date: 'February 2, 2025',
    readTime: '9 min read',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'A practical playbook for shipping reliable products without losing speed, from discovery to observability.',
    sections: [
      {
        heading: 'Start with clarity, not complexity',
        paragraphs: [
          'Every project begins with a one-page brief that captures the user, the problem, and the success metric. That document is intentionally small so the team can read it in five minutes and start proposing experiments. I keep a “non-goals” section that states what we will not build this sprint. It seems trivial, but it prevents scope creep and keeps stakeholders focused on the core outcome instead of side quests.',
          'When the brief is clear, design decisions get simpler. Components become smaller, naming stays consistent, and the handoff between backend and frontend teams is less painful. Clarity creates speed because fewer debates happen later in the cycle.',
        ],
      },
      {
        heading: 'Build guardrails into the stack',
        paragraphs: [
          'I favor patterns that fail loudly and early. TypeScript catches a huge class of mistakes before they hit the browser. Feature flags keep risky ideas isolated until they have proven value. Automated accessibility checks run alongside unit tests so regressions are obvious. These guardrails are not red tape—they are the oxygen that lets us move quickly without waking up to a pile of errors in production.',
          'On the infrastructure side, I keep environments close to production and script as much as possible. If a developer cannot spin up the project in minutes, it will slow down every future contributor. Small DX wins compound fast.',
        ],
      },
      {
        heading: 'Design for change',
        paragraphs: [
          'Resilient experiences expect change. I avoid hard-coding copy, keep tokens centralized, and lean on design systems to scale patterns across pages. When marketing needs a new landing page or product wants to iterate on pricing, we can swap components without rewriting the world.',
          'The same mindset applies to data. I log user intent, not just clicks, and pair it with qualitative notes from customer calls. Those signals shape the backlog and make it easy to justify why a feature stays, pivots, or gets cut.',
        ],
      },
      {
        heading: 'Observability is a user experience',
        paragraphs: [
          'Dashboards are interfaces too. A noisy alert channel is as frustrating as a slow UI. I instrument error boundaries, trace API calls, and keep dashboards opinionated so the team can see what matters. Postmortems stay blameless and actionable, which turns incidents into documentation for the next person who joins the rotation.',
          'Most importantly, I share the graphs with non-engineers. Product managers and designers appreciate seeing how a release impacted performance or retention, and they often spot patterns engineers miss. That shared ownership keeps everyone invested in stability.',
        ],
      },
      {
        heading: 'Ship, learn, and tighten the loop',
        paragraphs: [
          'A resilient culture ships often and refines quickly. After each release, I run lightweight retros that capture a single improvement for the next sprint. We celebrate the shipped value, fix the sharp edges, and move on. Over time, those small improvements add up to an experience that feels thoughtful even as the roadmap evolves.',
          'Speed and reliability are not enemies. With the right rituals, they reinforce each other, letting teams move fast while earning the trust of the people they serve.',
        ],
      },
    ],
  },
  {
    slug: 'lessons-from-web3-social',
    title: 'What Web3 Social Experiments Taught Me About Community',
    author: 'Juan Gunner',
    date: 'March 8, 2025',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1508387024700-9fe5c0b37f81?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Three cycles of experiments, a handful of smart contracts, and plenty of lessons about incentives, trust, and storytelling.',
    sections: [
      {
        heading: 'Incentives shape the vibe',
        paragraphs: [
          'Token drops, allow lists, and streak rewards all change how people behave. Early on, I launched a collector badge without clear criteria and watched engagement spike for a week before fading. When I redesigned the program with transparent milestones and limited supply, the conversation became healthier and far more creative. Incentives should reward meaningful participation, not just clicks.',
          'The same principle guides moderation. Clear community rules, transparent bans, and restorative paths for returning members set expectations early. People build better things together when they know the boundaries.',
        ],
      },
      {
        heading: 'On-chain identity needs storytelling',
        paragraphs: [
          'Wallets tell part of the story but not the whole thing. The strongest communities pair on-chain proof with off-chain narratives—player highlights, dev diaries, or behind-the-scenes clips. I started sharing weekly build logs tied to specific contract addresses so collectors could see progress and understand why a feature mattered. That context made the tokens feel alive instead of static artifacts.',
          'When people see the human side of the work, they are more likely to hold, contribute, and invite friends. Storytelling is infrastructure.',
        ],
      },
      {
        heading: 'Design for collaboration, not just consumption',
        paragraphs: [
          'The best drop mechanics invite people to create alongside you. Simple remix tools, co-ownership models, and transparent revenue shares turn audiences into co-authors. On a recent campaign, we let holders submit motion graphics that could be minted into the collection. The quality blew past our expectations, and the holders did half the marketing for us because they were invested in the outcome.',
          'Even small gestures—public roadmaps, open source snippets, or collaborative playlists—signal that the door is open for contribution.',
        ],
      },
      {
        heading: 'Keep the bridge to Web2 friendly',
        paragraphs: [
          'Most fans are still coming from Web2 channels. Smooth onboarding matters: progressive disclosure, clear fees, and backups for when wallets misbehave. I pair email newsletters with on-chain updates and keep support channels simple so people do not feel lost if a transaction stalls. Each friction removed turns into a story they share with the next friend.',
          'Ultimately, the goal is to make Web3 feel less like a gated city and more like an extension of the internet they already know.',
        ],
      },
      {
        heading: 'Builders win by listening',
        paragraphs: [
          'Every successful drop I have been part of started with listening. Office hours, Twitter Spaces, and DMs are still the best user research tools I have. When someone takes the time to explain what confused them, I write it down and fix it the same week. Community is a verb, and it thrives when the builders stay close to the people they serve.',
          'Web3 social moves quickly, but trust still compounds slowly. If we honor that, we get communities that last longer than a hype cycle.',
        ],
      },
    ],
  },
];

export const portfolioProjects = [
  {
    title: 'Match Analysis Dashboard',
    description:
      'A responsive dashboard that blends player tracking data with tactical annotations for coaches and athletes.',
    image:
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Creator Commerce Microsites',
    description:
      'Lightweight, fast-loading landing pages for creators to launch drops, merch, and newsletter campaigns.',
    image:
      'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Community Analytics Toolkit',
    description:
      'A toolkit that maps engagement across Discord, Twitter, and on-chain events to highlight emerging advocates.',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Interactive Highlight Reels',
    description:
      'An interactive video experience that pairs match clips with real-time stats overlays and training callouts.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
];

export const services = [
  {
    title: 'Web Development',
    description:
      'Full-stack builds with React, Node, and cloud-native patterns that prioritize performance and accessibility.',
  },
  {
    title: 'Product & Brand Strategy',
    description:
      'Sprint-based discovery, messaging frameworks, and design systems that keep teams aligned from idea to launch.',
  },
  {
    title: 'AI-Assisted Workflows',
    description:
      'Rapid prototyping of AI copilots, automation scripts, and data pipelines that save teams hours every week.',
  },
  {
    title: 'Community & Growth',
    description:
      'Playbooks for social experiments, referral loops, and on-chain incentives tailored to builders and creators.',
  },
  {
    title: 'Technical Coaching',
    description:
      'Workshops and code reviews that help teams adopt best practices, modern tooling, and reliable delivery habits.',
  },
];
