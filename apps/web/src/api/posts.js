export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function toAbsoluteUrl(value) {
  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${API_URL}${value}`;
  }

  return value;
}

export function normalizePost(post) {
  return {
    id: post.id,
    title: post.title || "",
    slug: post.slug || "",
    excerpt: post.excerpt || "",
    banner: toAbsoluteUrl(post.banner || ""),
    bannerAlt: post.bannerAlt || post.title || "Post banner",
    github: post.github || "",
    content: post.content || "",
    readTime: Number(post.readTime || 0),
    publishedAt: post.publishedAt || post.updatedAt || "",
    updatedAt: post.updatedAt || "",
    status: post.status || "draft",
    views: Number(post.views || 0),
    tags: Array.isArray(post.tags) ? post.tags : []
  };
}

async function fetchJson(path) {
  return fetchJsonWithOptions(path);
}

async function fetchJsonWithOptions(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) {
    const error = new Error(`Unable to load blog data (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function fetchPosts() {
  const data = await fetchJson("/posts");
  return Array.isArray(data) ? data.map(normalizePost) : [];
}

export async function fetchPostBySlug(slug) {
  const data = await fetchJson(`/posts/${encodeURIComponent(slug)}`);
  return normalizePost(data);
}
