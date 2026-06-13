# Karpaga Meenal — Portfolio

A static portfolio site. No build step, no framework, no npm — just HTML, CSS, and a small vanilla JS file. Deploys straight to GitHub Pages from the repo root.

## Structure

```
.
├── index.html                  # Homepage — hero, positioning, case-study cards
├── about.html                  # About — positioning, "How I work", skills
├── case-study-1.html           # Blank template — duplicate this for new projects
├── case-study-telefonica.html  # Telecom — multi-brand selfcare
├── case-study-safexpress.html  # Logistics — inbound unloading
├── case-study-sbi-yono.html    # Banking — RBAC / user admin
├── case-study-roche-rsp.html   # Healthcare — clinical-trial data entry
├── style.css                   # All styling + the design-token system
├── script.js                   # Theme toggle, click-crack, scroll reveal, scrollspy
├── Karpaga_Meenal_Resume_2026.pdf   # Linked by the "Resume" nav item
└── README.md
```

The **nav** and **footer** are the same markup block on every page. If you change one, paste the same change into the others (it's deliberately plain HTML so there's no build dependency).

## Retheme in one place

Open `style.css` and edit the tokens at the very top under `:root` (light) and `:root[data-theme="dark"]` (dark). Colour, type scale, spacing, and radius all live there — change a few values and the whole site follows.

```css
:root {
  --accent: #bd5d3e;   /* the clay accent — change this first */
  --paper:  #faf8f3;   /* page background */
  --ink:    #1c1a16;   /* text */
  --display:"Fraunces", serif;   /* headings */
  --body:   "Inter", sans-serif; /* body */
}
```

Dark/light is automatic (it respects the visitor's system setting) and the toggle in the nav remembers their choice.

## Before you publish — quick checklist

- [ ] Replace the **LinkedIn** and **GitHub** URLs (`your-handle` / `your-username`) in every page's nav/footer.
- [ ] Swap placeholder metrics — anything marked `*` or "verify" — for your real, verified numbers.
- [ ] Drop real screenshots into the `[ IMAGE ]` / `[ HERO IMAGE ]` blocks (replace the `.cs-figure` placeholder `<span>` with an `<img src="...">`).
- [ ] Confirm `Karpaga_Meenal_Resume_2026.pdf` is in the repo root so the Resume button downloads it.

## Adding a new case study

1. Duplicate `case-study-1.html`, rename it (e.g. `case-study-newproject.html`).
2. Fill in the bracketed placeholders.
3. Add a matching `<a class="case-card">` card in `index.html`.

## Publish to GitHub Pages — three commands

Create an empty repo named **`your-username.github.io`** on GitHub first, then from this folder:

```bash
git init && git add . && git commit -m "Portfolio site"
git remote add origin https://github.com/your-username/your-username.github.io.git
git push -u origin main
```

Your site goes live at **https://your-username.github.io** within a minute or two.
(If your default branch is `master`, push `master` instead — or run `git branch -M main` before pushing. In repo **Settings → Pages**, confirm the source is the `main` branch, `/root`.)
