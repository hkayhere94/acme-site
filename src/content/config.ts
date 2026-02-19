import { defineCollection, z } from 'astro:content';

const relatedReadSchema = z.object({
  title: z.string(),
  type: z.string().optional(),
  href: z.string().optional(),
  color: z.string().optional(),
});

const postNavSchema = z.object({
  title: z.string(),
  href: z.string().optional(),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    urlSlug: z.string(),
    publishDate: z.string().optional(),
    readTime: z.string().optional(),
    heroImage: z.string().optional(),
    contentType: z.string().optional(),
    tags: z.array(z.string()).optional(),
    bestFor: z.array(z.string()).optional(),
    subject: z.object({
      name: z.string(),
      description: z.string().optional(),
    }).optional(),
    featuring: z.array(z.object({
      name: z.string(),
      title: z.string().optional(),
      initials: z.string().optional(),
      avatarColor: z.string().optional(),
    })).optional(),
    takeaways: z.array(z.object({
      label: z.string(),
      text: z.string(),
    })).optional(),
    tocSections: z.array(z.object({
      id: z.string(),
      label: z.string(),
    })).optional(),
    references: z.array(z.string()).optional(),
    relatedReads: z.array(relatedReadSchema).optional(),
    prevPost: postNavSchema.optional(),
    nextPost: postNavSchema.optional(),
  }),
});

const episodes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    urlSlug: z.string(),
    episodeNumber: z.string().optional(),
    seriesTag: z.string().optional(),
    youtubeUrl: z.string().optional(),
    spotifyUrl: z.string().optional(),
    applePodcastsUrl: z.string().optional(),
    tags: z.array(z.string()).optional(),
    bestFor: z.array(z.string()).optional(),
    source: z.object({
      name: z.string(),
      host: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    featuring: z.object({
      name: z.string(),
      title: z.string().optional(),
      initials: z.string().optional(),
      avatarColor: z.string().optional(),
    }).optional(),
    takeaways: z.array(z.object({
      label: z.string(),
      text: z.string(),
    })).optional(),
    keyQuotes: z.array(z.object({
      timestamp: z.string(),
      quote: z.string(),
    })).optional(),
    relatedReads: z.array(relatedReadSchema).optional(),
    prevPost: postNavSchema.optional(),
    nextPost: postNavSchema.optional(),
  }),
});

export const collections = { articles, episodes };
