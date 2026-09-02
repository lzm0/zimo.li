import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ base: "src/content/posts", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      slug: z.string(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
    }),
});

export const collections = { posts };
