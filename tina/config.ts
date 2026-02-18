import { defineConfig } from "tinacms";

// ---------------------------------------------------------------------------
// Reusable field groups
// ---------------------------------------------------------------------------

const personFields = [
  { type: "string" as const, name: "name", label: "Name", required: true },
  { type: "string" as const, name: "title", label: "Title / Role" },
  { type: "string" as const, name: "initials", label: "Initials (2 chars)" },
  {
    type: "string" as const,
    name: "avatarColor",
    label: "Avatar Color",
    options: ["red", "blue", "yellow", "black"],
  },
  { type: "image" as const, name: "photo", label: "Photo (optional)" },
];

const takeawayFields = [
  { type: "string" as const, name: "label", label: "Label", required: true },
  { type: "string" as const, name: "text", label: "Text", required: true, ui: { component: "textarea" } },
];

const relatedReadFields = [
  { type: "string" as const, name: "title", label: "Title", required: true },
  { type: "string" as const, name: "type", label: "Type (e.g. Case Study, Podcast, Book)" },
  { type: "string" as const, name: "href", label: "Link" },
  {
    type: "string" as const,
    name: "color",
    label: "Shadow Color",
    options: ["blue", "red", "black"],
  },
];

// ---------------------------------------------------------------------------
// Rich-body block templates (for the visual editor)
// ---------------------------------------------------------------------------

const speakerQuoteTemplate = {
  name: "speakerQuote",
  label: "Speaker Quote",
  fields: [
    { type: "string" as const, name: "quote", label: "Quote Text", required: true, ui: { component: "textarea" } },
    { type: "string" as const, name: "speakerName", label: "Speaker Name", required: true },
    { type: "string" as const, name: "speakerTitle", label: "Speaker Title" },
    { type: "string" as const, name: "initials", label: "Initials" },
    {
      type: "string" as const,
      name: "color",
      label: "Avatar Color",
      options: ["red", "blue", "yellow", "black"],
    },
  ],
};

const dataTableTemplate = {
  name: "dataTable",
  label: "Data Table",
  fields: [
    {
      type: "string" as const,
      name: "headers",
      label: "Column Headers (comma separated)",
      required: true,
    },
    {
      type: "string" as const,
      name: "rows",
      label: "Table Rows",
      description: "Each line = one row. Separate cells with | (pipe). First cell is bold.",
      ui: { component: "textarea" },
      required: true,
    },
  ],
};

const acmeTakeTemplate = {
  name: "acmeTake",
  label: "ACME Practitioner Take",
  fields: [
    { type: "string" as const, name: "text", label: "Take Text", required: true, ui: { component: "textarea" } },
    {
      type: "string" as const,
      name: "color",
      label: "Accent Color",
      options: ["red", "blue", "black"],
    },
  ],
};

const articleFigureTemplate = {
  name: "articleFigure",
  label: "Figure / Image",
  fields: [
    { type: "image" as const, name: "src", label: "Image", required: true },
    { type: "string" as const, name: "alt", label: "Alt Text", required: true },
    { type: "string" as const, name: "caption", label: "Caption", required: true },
    { type: "string" as const, name: "icon", label: "Phosphor Icon Class", description: "e.g. ph-bold ph-chart-bar" },
  ],
};

// ---------------------------------------------------------------------------
// TinaCMS Config
// ---------------------------------------------------------------------------

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",

  // When running locally, TinaCMS uses a local GraphQL server
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ================================================================
      // ARTICLES (long-form case studies like Autodesk, Kyndryl)
      // ================================================================
      {
        name: "article",
        label: "Articles / Case Studies",
        path: "src/content/articles",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
          { type: "string", name: "urlSlug", label: "URL Slug", required: true },
          { type: "datetime", name: "publishDate", label: "Publish Date" },
          { type: "string", name: "readTime", label: "Estimated Read Time (e.g. 18 min read)" },
          { type: "image", name: "heroImage", label: "Hero Image" },
          {
            type: "string",
            name: "contentType",
            label: "Content Type Badge",
            options: ["Case Study", "Article", "Playbook", "Research"],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "bestFor",
            label: "Best For (audience types)",
            list: true,
          },

          // Subject (the company/brand being studied)
          {
            type: "object",
            name: "subject",
            label: "Subject (Company/Brand)",
            fields: [
              { type: "string", name: "name", label: "Company Name" },
              { type: "string", name: "description", label: "Short Description" },
              { type: "image", name: "logo", label: "Logo" },
            ],
          },

          // Featured people
          {
            type: "object",
            name: "featuring",
            label: "Featured People",
            list: true,
            fields: personFields,
          },

          // TL;DR Takeaways
          {
            type: "object",
            name: "takeaways",
            label: "TL;DR Takeaways",
            list: true,
            fields: takeawayFields,
          },

          // TOC sections (auto-generated from body, but can be overridden)
          {
            type: "object",
            name: "tocSections",
            label: "Table of Contents Sections",
            list: true,
            fields: [
              { type: "string", name: "id", label: "Section ID (anchor)" },
              { type: "string", name: "label", label: "TOC Label" },
            ],
          },

          // The article body (rich text with custom blocks)
          {
            type: "rich-text",
            name: "body",
            label: "Article Body",
            isBody: true,
            templates: [
              speakerQuoteTemplate,
              dataTableTemplate,
              acmeTakeTemplate,
              articleFigureTemplate,
            ],
          },

          // References
          {
            type: "string",
            name: "references",
            label: "References",
            list: true,
            ui: { component: "textarea" },
          },

          // Related reads
          {
            type: "object",
            name: "relatedReads",
            label: "Related Reads",
            list: true,
            fields: relatedReadFields,
          },

          // Navigation
          {
            type: "object",
            name: "prevPost",
            label: "Previous Post",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
          {
            type: "object",
            name: "nextPost",
            label: "Next Post",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
        ],
      },

      // ================================================================
      // EPISODES (podcast summaries like Diary of a CEO)
      // ================================================================
      {
        name: "episode",
        label: "Podcast Episodes",
        path: "src/content/episodes",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
          { type: "string", name: "urlSlug", label: "URL Slug", required: true },
          { type: "string", name: "episodeNumber", label: "Episode Number (e.g. #42)" },
          { type: "string", name: "seriesTag", label: "Series Tag (e.g. Triggered Gyan)" },
          { type: "string", name: "youtubeUrl", label: "YouTube Embed URL" },
          { type: "string", name: "spotifyUrl", label: "Spotify Link" },
          { type: "string", name: "applePodcastsUrl", label: "Apple Podcasts Link" },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "bestFor",
            label: "Best For (audience types)",
            list: true,
          },

          // Source podcast
          {
            type: "object",
            name: "source",
            label: "Source Podcast",
            fields: [
              { type: "string", name: "name", label: "Podcast Name" },
              { type: "string", name: "host", label: "Host Name" },
              { type: "string", name: "description", label: "Short Description" },
            ],
          },

          // Guest / Featured
          {
            type: "object",
            name: "featuring",
            label: "Featured Guest",
            fields: personFields,
          },

          // TL;DR Takeaways
          {
            type: "object",
            name: "takeaways",
            label: "TL;DR Takeaways",
            list: true,
            fields: takeawayFields,
          },

          // The analysis body (rich text with custom blocks)
          {
            type: "rich-text",
            name: "body",
            label: "Deep Analysis",
            isBody: true,
            templates: [
              speakerQuoteTemplate,
              dataTableTemplate,
              acmeTakeTemplate,
              articleFigureTemplate,
            ],
          },

          // Key Quotes with timestamps
          {
            type: "object",
            name: "keyQuotes",
            label: "Key Quotes",
            list: true,
            fields: [
              { type: "string", name: "timestamp", label: "Timestamp (e.g. 15:02)" },
              { type: "string", name: "quote", label: "Quote Text", ui: { component: "textarea" } },
            ],
          },

          // Related reads
          {
            type: "object",
            name: "relatedReads",
            label: "Related Reads",
            list: true,
            fields: relatedReadFields,
          },

          // Navigation
          {
            type: "object",
            name: "prevPost",
            label: "Previous Post",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
          {
            type: "object",
            name: "nextPost",
            label: "Next Post",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
        ],
      },
    ],
  },
});
