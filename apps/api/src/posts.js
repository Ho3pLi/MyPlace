import db from "./db.js";

function parseTags(raw) {
  try {
    const parsed = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function mapRow(row) {
  if (!row) return null;
  return {
    ...row,
    tags: parseTags(row.tags),
  };
}

const selectAllStmt = db.prepare(
  "SELECT * FROM posts ORDER BY datetime(updatedAt) DESC"
);
const selectPublishedStmt = db.prepare(
  "SELECT * FROM posts WHERE status = 'published' ORDER BY datetime(publishedAt) DESC, datetime(updatedAt) DESC"
);
const selectBySlugStmt = db.prepare("SELECT * FROM posts WHERE slug = ?");
const selectPublishedBySlugStmt = db.prepare(
  "SELECT * FROM posts WHERE slug = ? AND status = 'published'"
);
const selectByIdStmt = db.prepare("SELECT * FROM posts WHERE id = ?");
const insertStmt = db.prepare(`
  INSERT INTO posts (
    title, slug, excerpt, banner, bannerAlt, github, content,
    readTime, publishedAt, status, views, tags, createdAt, updatedAt
  ) VALUES (
    @title, @slug, @excerpt, @banner, @bannerAlt, @github, @content,
    @readTime, @publishedAt, @status, @views, @tags, @createdAt, @updatedAt
  )
`);
const updateStmt = db.prepare(`
  UPDATE posts SET
    title=@title,
    slug=@slug,
    excerpt=@excerpt,
    banner=@banner,
    bannerAlt=@bannerAlt,
    github=@github,
    content=@content,
    readTime=@readTime,
    publishedAt=@publishedAt,
    status=@status,
    views=@views,
    tags=@tags,
    updatedAt=@updatedAt
  WHERE id=@id
`);
const deleteStmt = db.prepare("DELETE FROM posts WHERE id = ?");

function conflictError() {
  const err = new Error("Slug already exists");
  err.status = 409;
  return err;
}

function ensureSlugAvailable(slug, excludeId) {
  const existing = selectBySlugStmt.get(slug);
  if (existing && existing.id !== excludeId) {
    throw conflictError();
  }
}

export function listPosts() {
  return selectAllStmt.all().map(mapRow);
}

export function listPublishedPosts() {
  return selectPublishedStmt.all().map(mapRow);
}

export function getPostBySlug(slug) {
  return mapRow(selectBySlugStmt.get(slug));
}

export function getPublishedPostBySlug(slug) {
  return mapRow(selectPublishedBySlugStmt.get(slug));
}

export function getPostById(id) {
  return mapRow(selectByIdStmt.get(id));
}

export function createPost(data) {
  ensureSlugAvailable(data.slug);

  const now = new Date().toISOString();
  const info = insertStmt.run({
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt ?? "",
    banner: data.banner ?? "",
    bannerAlt: data.bannerAlt ?? "",
    github: data.github ?? "",
    content: data.content ?? "",
    readTime: data.readTime ?? 3,
    publishedAt: data.publishedAt,
    status: data.status ?? "draft",
    views: data.views ?? 0,
    tags: JSON.stringify(data.tags ?? []),
    createdAt: now,
    updatedAt: now,
  });

  return getPostById(info.lastInsertRowid);
}

export function updatePost(id, changes) {
  const existing = getPostById(id);
  if (!existing) {
    return null;
  }

  const nextSlug = changes.slug ?? existing.slug;
  if (nextSlug !== existing.slug) {
    ensureSlugAvailable(nextSlug, id);
  }

  const nextPost = {
    ...existing,
    ...changes,
    slug: nextSlug,
    tags: changes.tags ?? existing.tags,
    updatedAt: new Date().toISOString(),
  };

  updateStmt.run({
    ...nextPost,
    tags: JSON.stringify(nextPost.tags ?? []),
    id,
  });

  return getPostById(id);
}

export function deletePost(id) {
  const info = deleteStmt.run(id);
  return info.changes > 0;
}
