import { z } from "zod";

export const postInputSchema = z.object({
  title: z.string().min(1),
  slug: z.string().trim().optional(),
  excerpt: z.string().default(""),
  banner: z.string().default(""),
  bannerAlt: z.string().default(""),
  github: z.string().default(""),
  content: z.string().default(""),
  readTime: z.number().int().min(1).default(3),
  publishedAt: z.string(),
  status: z.enum(["draft", "published"]).default("draft"),
  views: z.number().int().min(0).default(0),
  tags: z.array(z.string()).optional(),
});

export const postUpdateSchema = postInputSchema.partial();

export function slugify(value) {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}
