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

function normalizeAdminPost(post) {
  return {
    id: post.id,
    title: post.title || "",
    slug: post.slug || "",
    excerpt: post.excerpt || "",
    banner: post.banner || "",
    bannerAlt: post.bannerAlt || "",
    github: post.github || "",
    content: post.content || "",
    readTime: Number(post.readTime || 0),
    publishedAt: post.publishedAt || "",
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

async function fetchAdminJson(path, token, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const error = new Error(`Admin request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return null;
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

export async function adminLogin(token) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  });

  if (!response.ok) {
    const error = new Error(`Login failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function fetchAdminPosts(token) {
  const data = await fetchAdminJson("/admin/posts", token);
  return Array.isArray(data) ? data.map(normalizeAdminPost) : [];
}

export async function createAdminPost(token, payload) {
  const data = await fetchAdminJson("/admin/posts", token, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return normalizeAdminPost(data);
}

export async function updateAdminPost(token, id, payload) {
  const data = await fetchAdminJson(`/admin/posts/${id}`, token, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
  return normalizeAdminPost(data);
}

export async function deleteAdminPost(token, id) {
  await fetchAdminJson(`/admin/posts/${id}`, token, {
    method: "DELETE"
  });
}
