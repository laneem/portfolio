You are a senior UX/UI designer with 5+ years of experience across product design, UX research, and branding. I need a homepage for my portfolio on GitHub Pages.

Write the complete content and HTML/CSS structure for a homepage that:
- Opens with a sharp, confident hero that names what I do and who I do it for (not just "I'm a designer")
- Includes a 2–3 line positioning statement that signals seniority and strategic thinking
- Shows 3–5 case study cards with: project name, a one-line problem statement, your role, and key outcome with a number if possible
- Has a minimal nav: Work · About · Contact · Resume
- on click of resume menu download my pdf resume provided.
- Has a footer with links to LinkedIn, email, and GitHub
- Is deployed-ready for GitHub Pages (single HTML file, vanilla CSS, no build step needed)
- whenever click happens kind of crack effect animation should be there on the place of cursor click 

colors themes: Stick to professional and dark/light theme supportable. dont use too much colors. Make it more professional and use pastal colors eg. claude anthropic designs and make it unique and standout

Design direction: typographically-led, no hero image of me, use whitespace and contrast as the visual system. Avoid generic portfolio templates. Make it feel like a senior designer made it — not a student theme.

page 2: About me
-----
I need an About page for my UX/UI portfolio. I am a senior designer (5+ years) specialising in product design, UX research, and branding, targeting full-time roles.

Write an About page with:
1. A short, confident opening paragraph (3–4 lines) that positions me as a strategic designer — not just a tool user. Mention what types of problems I solve and at what scale.
2. A "How I work" section with 3 principles (not generic values — make them specific to my approach as a researcher + product + brand designer)
3. A brief skills list, grouped by: Design tools / Research methods / Deliverables — use clean inline tags, not a word wall
4. A closing line with a CTA to view my work or email me

Tone: confident, direct, human. No phrases like "passionate", "detail-oriented", or "I love design". Sound like a practitioner, not a LinkedIn bio.

Format this as a deployable HTML section that fits inside my existing GitHub Pages site.

Page 3 — Case study
=--------
I'm writing a UX case study for my portfolio. Here is the raw context: Also I need detailed case study page to showcase its details for each of the below case studies.

Case study#1
Project name: [Telefonica]
My role: [e.g. Lead UX designer, embedded in a 4-person product team]
Timeline: [e.g. 9 months, 2025]
Problem: [Enabling Multi‑Brand Consistency Through a Unified Selfcare Platform for Telefonica]
What I did: [Short, Clean, and Executive]
Research methods used: [e.g. contextual inquiry, usability testing, affinity mapping]
Key decisions: [Task-first home screen, Guided onboarding flow, Contextual quick actions, Complete state coverage]
Outcome: [metrics, qualitative wins, or what shipped]
What didn't work: [Don't wait for perfect data]

Case study #2
Project name: [SAFEXPRESS]
My role: [e.g. Solo UX designer, embedded in a 6-person product team]
Timeline: [e.g. 1 year, 2024]
Problem: [Reimagining Safexpress’s Inbound Unloading Experience]
What I did: [Breaking the Bottleneck]
Research methods used: [e.g. contextual inquiry, usability testing, affinity mapping]
Key decisions: [Category Search & Tabs, Quick Scanning, Contextual quick actions, Vehicle Progress]
Outcome: [A fully functional system and an eager client team with new skills]
What didn't work: [White boarding section only with client and not with the exact users]

Case study #3
Project name: [SBI Yono Business]
My role: [e.g. Solo UX designer, embedded in a 6-person product team]
Timeline: [e.g. 6 months, 2026]
Problem: [Streamlining Role-Based Access and User Administration for SBI Enterprise Banking]
What I did: [Breaking the Bottleneck]
Research methods used: [e.g. contextual inquiry, usability testing, affinity mapping]
Key decisions: [Create a modular system :Common elements,
Role-specific element
The Interface adapted intelligently based on who was logged in]
Outcome: [design challenges aren't always the flashiest ones]
What didn't work: [Maintenance is a nightmare, inconsistent experience]

Case study #4
Project name: [Roche - RSP - Rave Support Portal]
My role: [e.g. Solo UX designer, embedded as 1 person army]
Timeline: [e.g. 6 months, 2026]
Problem: [Designing a Scalable Clinical Trial Data Entry Experience for RSP - Rave Support Portal]
What I did: [Streamlining Clinical Operations]
Research methods used: [e.g. contextual inquiry, usability testing, affinity mapping]
Key decisions: [Update & Alerts, bookmarks, Dynamic help section, guided to next]
Outcome: [Measureable impacts on operations]
What didn't work: [Maintenance is a nightmare, inconsistent experience]

Detailed case study page:
1. heading
2. descirpiotn/kind of tag line
3. hero image of the project/case study
4. I need left side kind of md page index from here section should be sticky. 
I should have below 8 topics. I want below section to automatically fly in animate on scrool and also can naviagte using left side menu. I wil give reference page for the same.
Summary
Impact
Design work
Problem
Research
Decisions
Timeline



Now write a structured case study using this framework:
1. Overview — 2-line summary: problem + outcome
2. Context — why this project mattered at a business level
3. My role — what I specifically owned vs collaborated on
4. Discovery — what I found and how (cite research methods)
5. Synthesis — how insights became direction
6. Design decisions — 2–3 key decisions with rationale, not just screenshots
7. Outcome — what shipped, what changed, what we measured
8. Reflection — what I'd do differently

Write in first person. Be specific over comprehensive. Prioritise decisions and thinking over deliverables and tools. Do not use the word "utilised".


Follow-up prompts to sharpen each case study

The "Design decisions" section sounds like a list of actions. Rewrite it to show the design tension I was navigating — what I considered, what I ruled out, and why what I chose was the right call for this user + business context.

The outcome section is weak. Push me: what would a hiring manager at a product company want to see as evidence here? What questions would they ask that this doesn't answer?

Now convert this case study into a deployable HTML page for GitHub Pages. Use a clean reading layout: max-width 720px, good typographic scale, section headings, and placeholder [IMAGE] blocks where screenshots would go. No JavaScript needed.

GitHub Pages setup prompt

I'm hosting a UX portfolio on GitHub Pages. Create the complete file structure and a starter repo with:

- index.html — homepage
- about.html — about me page
- case-study-1.html — template (I'll duplicate for each project)
- style.css — shared styles (typographic system, nav, footer, card components)
- README.md — notes on how the repo is structured

Requirements:
- No build tools, no npm, no framework — pure HTML and CSS only
- Mobile-responsive using CSS Grid and media queries
- A single CSS custom property system for colours, spacing, and type scale so I can retheme it with one edit
- The nav and footer should be the same component across all pages
- Works when deployed from the /root of a GitHub Pages repo (username.github.io)

After generating, tell me exactly what to do to publish it — the three terminal commands needed.

Stand-out prompt — make it memorable

Review my portfolio homepage as a hiring manager at a mid-to-large product company. You're scanning 40 portfolios this week.

Tell me:
1. What makes this one memorable in the first 10 seconds?
2. What makes it feel generic or safe?
3. One specific, non-obvious change that would make it stand out — not "add more personality", but a concrete structural or content decision.

Be blunt. I'd rather hear a harsh truth now than wonder why I'm not getting callbacks.

[references]
- https://www.kishore.design/
- https://naisha.framer.website/