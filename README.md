# ACME — All Cool Marketing Experiments

Website for [allcoolmarketingexperiments.com](https://www.allcoolmarketingexperiments.com)

**Stack:** Astro + Tina CMS + Tailwind CSS + Netlify

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (Astro + Tina CMS local editor)
npm run dev
```

This starts:
- **Astro** dev server at `http://localhost:4321`
- **Tina CMS** editor at `http://localhost:4321/admin`

You can write/edit content in the Tina visual editor or directly in the MDX files.

---

## Project Structure

```
acme-site/
├── public/                  # Static assets (images, favicon)
│   └── images/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── AcmeTake.astro        # ACME Practitioner Take callout
│   │   ├── ArticleFigure.astro   # Image figure with caption
│   │   ├── DataTable.astro       # Brutalist data table
│   │   ├── ProgressBar.astro     # Reading progress bar + TOC highlight
│   │   ├── RelatedReads.astro    # 3-card related content grid
│   │   ├── SectionHeader.astro   # Numbered section header (01, 02...)
│   │   ├── SpeakerQuote.astro    # Attributed blockquote
│   │   └── TldrCard.astro        # TL;DR takeaways card
│   ├── content/
│   │   ├── articles/        # MDX files for long-form case studies
│   │   ├── episodes/        # MDX files for podcast summaries
│   │   └── config.ts        # Astro content collection schemas
│   ├── layouts/
│   │   └── BaseLayout.astro # Shared nav + footer layout
│   ├── pages/
│   │   ├── index.astro      # Knowledge Hub landing page
│   │   └── hub/
│   │       ├── autodesk-abm-transformation.astro
│   │       └── diary-of-a-ceo-mark-ritson.astro
│   └── styles/
│       └── global.css       # All brand styles (brutalist theme)
├── tina/
│   └── config.ts            # Tina CMS content models
├── astro.config.mjs
├── tailwind.config.mjs
├── netlify.toml
└── package.json
```

---

## Deploying to Netlify

### Step 1: Push to GitHub

```bash
cd acme-site
git init
git add .
git commit -m "Initial ACME site"
git remote add origin https://github.com/YOUR_USERNAME/acme-site.git
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repo
4. Netlify auto-detects the build settings from `netlify.toml`
5. Click **Deploy**

### Step 3: Connect Your Domain

1. In Netlify dashboard → **Domain management** → **Add custom domain**
2. Enter `allcoolmarketingexperiments.com`
3. Netlify will give you DNS nameservers
4. Go to your domain registrar and update nameservers to Netlify's
5. Netlify auto-provisions HTTPS via Let's Encrypt

---

## Setting Up Tina CMS (Visual Editor)

Tina CMS works in two modes:

### Local Mode (for development)
Already works with `npm run dev`. Edits save directly to your MDX files.

### Cloud Mode (for production editing)

1. Go to [app.tina.io](https://app.tina.io) and create an account
2. Create a new project, connect your GitHub repo
3. Copy your **Client ID** and **Token**
4. Add to Netlify environment variables:
   - `NEXT_PUBLIC_TINA_CLIENT_ID` = your client ID
   - `TINA_TOKEN` = your token
5. Redeploy

Now you can edit content at `yoursite.com/admin` with a visual editor.

---

## Creating New Content

### New Article (Case Study)

1. Open Tina CMS at `/admin`
2. Click **"Articles / Case Studies"** → **"Create New"**
3. Fill in the fields: title, subtitle, tags, featured people, takeaways
4. Write your article body using the rich text editor
5. Insert custom blocks: Speaker Quote, Data Table, ACME Take, Figure
6. Add references
7. Save → site auto-rebuilds

### New Episode (Podcast Summary)

1. Open Tina CMS at `/admin`
2. Click **"Podcast Episodes"** → **"Create New"**
3. Fill in: title, episode number, YouTube URL, guest info, takeaways
4. Write the deep analysis
5. Add key quotes with timestamps
6. Save → site auto-rebuilds

---

## Available Components

Use these in your MDX content or Astro pages:

| Component | Usage |
|---|---|
| `<SpeakerQuote>` | Attributed quote with avatar, name, title |
| `<DataTable>` | Brutalist-styled data table |
| `<AcmeTake>` | Red-bordered practitioner callout |
| `<ArticleFigure>` | Image with caption and icon |
| `<SectionHeader>` | Numbered section heading |
| `<TldrCard>` | Yellow TL;DR card with 4 takeaways |
| `<RelatedReads>` | 3-card related content grid |
| `<ProgressBar>` | Reading progress bar + TOC highlighting |

---

## Build Commands

```bash
npm run dev       # Local dev server + Tina CMS
npm run build     # Production build
npm run preview   # Preview production build locally
```
