import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPostBySlug,
  listPosts,
  updatePost,
} from "../posts.js";
import { postInputSchema, postUpdateSchema, slugify } from "../validation.js";
import { requireAuth } from "./auth.js";

const adminPostsRouter = Router();

adminPostsRouter.use(requireAuth);

adminPostsRouter.get("/", (req, res, next) => {
  try {
    const posts = listPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

adminPostsRouter.get("/id/:id", (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      const badIdError = new Error("Invalid post id");
      badIdError.status = 400;
      throw badIdError;
    }

    const post = getPostById(id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
});

adminPostsRouter.get("/slug/:slug", (req, res, next) => {
  try {
    const post = getPostBySlug(req.params.slug);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
});

adminPostsRouter.post("/", (req, res, next) => {
  try {
    const parsed = postInputSchema.parse(req.body || {});
    const slug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.title);
    if (!slug) {
      const slugError = new Error("Slug cannot be empty");
      slugError.status = 400;
      throw slugError;
    }

    const post = createPost({
      ...parsed,
      slug,
      tags: parsed.tags ?? [],
      status: parsed.status ?? "draft",
      views: parsed.views ?? 0,
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

adminPostsRouter.patch("/:id", (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      const badIdError = new Error("Invalid post id");
      badIdError.status = 400;
      throw badIdError;
    }

    const existing = getPostById(id);
    if (!existing) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    const parsed = postUpdateSchema.parse(req.body || {});
    const changes = { ...parsed };

    if (parsed.slug !== undefined) {
      const base = parsed.slug || parsed.title || existing.title;
      changes.slug = slugify(base);
      if (!changes.slug) {
        const slugError = new Error("Slug cannot be empty");
        slugError.status = 400;
        throw slugError;
      }
    }

    const updated = updatePost(id, changes);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

adminPostsRouter.delete("/:id", (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      const badIdError = new Error("Invalid post id");
      badIdError.status = 400;
      throw badIdError;
    }

    const deleted = deletePost(id);
    if (!deleted) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default adminPostsRouter;
