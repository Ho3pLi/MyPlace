import React, { useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Link } from "react-router-dom"
import {
  adminLogin,
  createAdminPost,
  deleteAdminPost,
  fetchAdminPosts,
  updateAdminPost
} from "../../api/posts"
import "./admin.css"

const STORAGE_KEY = "myplace_admin_token"

const createEmptyDraft = () => ({
  id: null,
  title: "",
  slug: "",
  excerpt: "",
  banner: "",
  bannerAlt: "",
  github: "",
  content: "",
  readTime: 3,
  publishedAt: formatDateTimeLocal(new Date().toISOString()),
  status: "draft",
  tags: ""
})

function formatDateTimeLocal(value) {
  if (!value) {
    return ""
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ""
  }

  const pad = (part) => `${part}`.padStart(2, "0")

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join("-") + `T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function slugify(value) {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
}

function toEditorState(post) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    banner: post.banner,
    bannerAlt: post.bannerAlt,
    github: post.github,
    content: post.content,
    readTime: post.readTime || 3,
    publishedAt: formatDateTimeLocal(post.publishedAt),
    status: post.status,
    tags: (post.tags || []).join(", ")
  }
}

function toPayload(form) {
  return {
    title: form.title.trim(),
    slug: form.slug.trim(),
    excerpt: form.excerpt.trim(),
    banner: form.banner.trim(),
    bannerAlt: form.bannerAlt.trim(),
    github: form.github.trim(),
    content: form.content,
    readTime: Math.max(1, Number(form.readTime || 1)),
    publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : new Date().toISOString(),
    status: form.status,
    tags: form.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }
}

const Admin = () => {
  const [token, setToken] = useState(() => window.localStorage.getItem(STORAGE_KEY) || "")
  const [tokenInput, setTokenInput] = useState("")
  const [authError, setAuthError] = useState("")
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState("")
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [filter, setFilter] = useState("all")
  const [query, setQuery] = useState("")
  const [editor, setEditor] = useState(createEmptyDraft)

  useEffect(() => {
    if (!token) {
      return undefined
    }

    let cancelled = false

    const loadPosts = async () => {
      setLoading(true)
      setLoadError("")

      try {
        const data = await fetchAdminPosts(token)
        if (!cancelled) {
          setPosts(data)
          setEditor((current) => {
            if (!current.id) {
              return current
            }

            const updatedCurrent = data.find((post) => post.id === current.id)
            return updatedCurrent ? toEditorState(updatedCurrent) : createEmptyDraft()
          })
        }
      } catch (error) {
        if (!cancelled) {
          if (error.status === 401) {
            window.localStorage.removeItem(STORAGE_KEY)
            setToken("")
            setPosts([])
          }
          setLoadError(error.message || "Failed to load posts")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPosts()

    return () => {
      cancelled = true
    }
  }, [token])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesStatus = filter === "all" ? true : post.status === filter
      const loweredQuery = query.trim().toLowerCase()
      const matchesQuery =
        !loweredQuery ||
        post.title.toLowerCase().includes(loweredQuery) ||
        post.slug.toLowerCase().includes(loweredQuery)

      return matchesStatus && matchesQuery
    })
  }, [filter, posts, query])

  const selectedSlug = editor.slug.trim() || slugify(editor.title)

  const stats = useMemo(() => {
    return {
      total: posts.length,
      published: posts.filter((post) => post.status === "published").length,
      drafts: posts.filter((post) => post.status === "draft").length
    }
  }, [posts])

  const handleTokenSubmit = async (event) => {
    event.preventDefault()
    setAuthError("")

    try {
      const result = await adminLogin(tokenInput.trim())
      window.localStorage.setItem(STORAGE_KEY, result.token)
      setToken(result.token)
      setTokenInput("")
    } catch (error) {
      setAuthError(error.message || "Login failed")
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setToken("")
    setPosts([])
    setEditor(createEmptyDraft())
    setLoadError("")
    setSaveError("")
  }

  const handleEditorChange = (field, value) => {
    setEditor((current) => ({
      ...current,
      [field]: value
    }))
  }

  const handleSelectPost = (post) => {
    setSaveError("")
    setEditor(toEditorState(post))
  }

  const handleNewPost = () => {
    setSaveError("")
    setEditor(createEmptyDraft())
  }

  const refreshPosts = async (nextToken = token) => {
    const data = await fetchAdminPosts(nextToken)
    setPosts(data)
    return data
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setSaveError("")
    setSaving(true)

    try {
      const payload = toPayload(editor)
      const savedPost = editor.id
        ? await updateAdminPost(token, editor.id, payload)
        : await createAdminPost(token, payload)

      const data = await refreshPosts()
      const freshPost = data.find((post) => post.id === savedPost.id) || savedPost
      setEditor(toEditorState(freshPost))
    } catch (error) {
      if (error.status === 401) {
        handleLogout()
        setAuthError("Session expired. Sign in again.")
      } else {
        setSaveError(error.message || "Unable to save post")
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post?")) {
      return
    }

    setSaveError("")
    setSaving(true)

    try {
      await deleteAdminPost(token, postId)
      const data = await refreshPosts()
      if (editor.id === postId) {
        setEditor(createEmptyDraft())
      } else if (editor.id) {
        const freshPost = data.find((post) => post.id === editor.id)
        if (freshPost) {
          setEditor(toEditorState(freshPost))
        }
      }
    } catch (error) {
      if (error.status === 401) {
        handleLogout()
        setAuthError("Session expired. Sign in again.")
      } else {
        setSaveError(error.message || "Unable to delete post")
      }
    } finally {
      setSaving(false)
    }
  }

  if (!token) {
    return (
      <section className="admin admin--auth">
        <div className="container admin__auth-shell">
          <div className="admin__auth-card">
            <p className="admin__eyebrow">MyPlace Admin</p>
            <h1>Sign in</h1>
            <p className="admin__muted">
              Enter the backend admin token. It stays only in this browser via local storage.
            </p>

            <form className="admin__auth-form" onSubmit={handleTokenSubmit}>
              <label htmlFor="admin-token">Admin token</label>
              <input
                id="admin-token"
                type="password"
                value={tokenInput}
                onChange={(event) => setTokenInput(event.target.value)}
                placeholder="Paste ADMIN_TOKEN"
                required
              />
              {authError && <p className="admin__error">{authError}</p>}
              <button type="submit" className="btn btn-primary">
                Enter admin
              </button>
            </form>

            <Link to="/" className="admin__back-link">
              Back to website
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="admin">
      <div className="container admin__shell">
        <header className="admin__header">
          <div>
            <p className="admin__eyebrow">MyPlace Admin</p>
            <h1>Post manager</h1>
            <p className="admin__muted">Draft, preview and publish Markdown posts from one screen.</p>
          </div>

          <div className="admin__header-actions">
            <Link to="/" className="btn">
              View site
            </Link>
            <button type="button" className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <section className="admin__stats">
          <article>
            <span>{stats.total}</span>
            <small>Total posts</small>
          </article>
          <article>
            <span>{stats.published}</span>
            <small>Published</small>
          </article>
          <article>
            <span>{stats.drafts}</span>
            <small>Drafts</small>
          </article>
        </section>

        <div className="admin__layout">
          <aside className="admin__sidebar">
            <div className="admin__sidebar-toolbar">
              <button type="button" className="btn btn-primary" onClick={handleNewPost}>
                New post
              </button>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title or slug"
              />
              <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="all">All statuses</option>
                <option value="draft">Drafts</option>
                <option value="published">Published</option>
              </select>
            </div>

            {loading ? <p className="admin__muted">Loading posts...</p> : null}
            {loadError ? <p className="admin__error">{loadError}</p> : null}

            <div className="admin__post-list">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className={`admin__post-card${editor.id === post.id ? " is-active" : ""}`}
                >
                  <button type="button" className="admin__post-select" onClick={() => handleSelectPost(post)}>
                    <div className="admin__post-meta">
                      <span className={`admin__badge admin__badge--${post.status}`}>{post.status}</span>
                      <small>{new Date(post.updatedAt || post.publishedAt).toLocaleString()}</small>
                    </div>
                    <h3>{post.title}</h3>
                    <p>/{post.slug}</p>
                  </button>
                  <button
                    type="button"
                    className="admin__delete-button"
                    onClick={() => handleDelete(post.id)}
                    disabled={saving}
                  >
                    Delete
                  </button>
                </article>
              ))}

              {!loading && filteredPosts.length === 0 ? (
                <p className="admin__muted">No posts match the current filters.</p>
              ) : null}
            </div>
          </aside>

          <div className="admin__editor-stack">
            <form className="admin__editor" onSubmit={handleSave}>
              <div className="admin__editor-head">
                <div>
                  <p className="admin__eyebrow">{editor.id ? "Editing existing post" : "Creating new post"}</p>
                  <h2>{editor.title || "Untitled post"}</h2>
                </div>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving..." : editor.id ? "Update post" : "Create post"}
                </button>
              </div>

              {saveError && <p className="admin__error">{saveError}</p>}

              <div className="admin__grid">
                <label>
                  Title
                  <input
                    type="text"
                    value={editor.title}
                    onChange={(event) => handleEditorChange("title", event.target.value)}
                    required
                  />
                </label>

                <label>
                  Slug
                  <input
                    type="text"
                    value={editor.slug}
                    onChange={(event) => handleEditorChange("slug", event.target.value)}
                    placeholder={slugify(editor.title)}
                  />
                </label>

                <label>
                  Publish date
                  <input
                    type="datetime-local"
                    value={editor.publishedAt}
                    onChange={(event) => handleEditorChange("publishedAt", event.target.value)}
                    required
                  />
                </label>

                <label>
                  Status
                  <select
                    value={editor.status}
                    onChange={(event) => handleEditorChange("status", event.target.value)}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </label>

                <label>
                  Read time
                  <input
                    type="number"
                    min="1"
                    value={editor.readTime}
                    onChange={(event) => handleEditorChange("readTime", event.target.value)}
                    required
                  />
                </label>

                <label>
                  Tags
                  <input
                    type="text"
                    value={editor.tags}
                    onChange={(event) => handleEditorChange("tags", event.target.value)}
                    placeholder="react, backend, release"
                  />
                </label>

                <label className="admin__grid-span">
                  Excerpt
                  <textarea
                    rows="3"
                    value={editor.excerpt}
                    onChange={(event) => handleEditorChange("excerpt", event.target.value)}
                  />
                </label>

                <label>
                  Banner URL
                  <input
                    type="url"
                    value={editor.banner}
                    onChange={(event) => handleEditorChange("banner", event.target.value)}
                    placeholder="https://..."
                  />
                </label>

                <label>
                  Banner alt text
                  <input
                    type="text"
                    value={editor.bannerAlt}
                    onChange={(event) => handleEditorChange("bannerAlt", event.target.value)}
                  />
                </label>

                <label className="admin__grid-span">
                  Github URL
                  <input
                    type="url"
                    value={editor.github}
                    onChange={(event) => handleEditorChange("github", event.target.value)}
                    placeholder="https://github.com/..."
                  />
                </label>
              </div>

              <label className="admin__markdown-field">
                Markdown content
                <textarea
                  rows="18"
                  value={editor.content}
                  onChange={(event) => handleEditorChange("content", event.target.value)}
                  placeholder={"# Heading\n\nWrite your post in Markdown."}
                  required
                />
              </label>
            </form>

            <section className="admin__preview">
              <div className="admin__preview-head">
                <div>
                  <p className="admin__eyebrow">Live preview</p>
                  <h2>{editor.title || "Untitled post"}</h2>
                </div>
                <span className={`admin__badge admin__badge--${editor.status}`}>{editor.status}</span>
              </div>

              <div className="admin__preview-meta">
                <span>Slug: /{selectedSlug || "untitled-post"}</span>
                <span>{editor.tags || "No tags yet"}</span>
              </div>

              {editor.excerpt && <p className="admin__preview-excerpt">{editor.excerpt}</p>}

              <div className="admin__preview-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{editor.content || "_Nothing to preview yet._"}</ReactMarkdown>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Admin
