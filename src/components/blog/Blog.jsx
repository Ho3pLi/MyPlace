import React, { useMemo, useState } from "react"
import "./blog.css"
import SearchBar from "../searchBar/SearchBar"
import { Link } from "react-router-dom"
import { usePosts } from "../../context/PostsContext"

const formatDate = (value) => {
  if (!value) {
    return "Draft"
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value))
}

const Blog = () => {
  const [query, setQuery] = useState("")
  const { posts, loading, error } = usePosts()

  const filteredPosts = useMemo(() => {
    if (!query.trim()) {
      return posts
    }

    const lowered = query.trim().toLowerCase()
    return posts.filter((post) => {
      const searchable = [post.title, post.excerpt, ...(post.tags || [])].join(" ").toLowerCase()
      return searchable.includes(lowered)
    })
  }, [posts, query])

  const searchData = useMemo(
    () =>
      posts.map((post) => ({
        id: post.id,
        title: post.title,
        read: `/blog/${post.slug}`
      })),
    [posts]
  )

  return (
    <main id="blog" className="blogPage">
      <nav className="blogNav" aria-label="Blog navigation">
        <Link to="/">Home</Link>
        <a href="#posts">Posts</a>
        <Link to="/developer-tools">Tools</Link>
      </nav>

      <header className="blogIntro">
        <span className="blogMeta">Writing</span>
        <h1>Blog</h1>
        <p className="blogLead">
          Notes, experiments, and practical writeups from the things I am building or learning.
        </p>
      </header>

      <div className="blogSep" aria-hidden="true" />

      <section id="posts" className="blogSection">
        <div className="blogSectionHeader">
          <h2>Posts</h2>
          <SearchBar
            placeholder="Search posts..."
            data={searchData}
            value={query}
            onChange={setQuery}
          />
        </div>

        {loading ? (
          <div className="blogEmpty">Loading posts...</div>
        ) : error ? (
          <div className="blogEmpty">
            <span>No posts found.</span>
            <small>The backend is not working again. Big news :P</small>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="blogItems">
            {filteredPosts.map(({ id, banner, bannerAlt, title, github, slug, excerpt, publishedAt, readTime, tags }) => (
              <article key={id} className="blogItem">
                <span className="blogMeta">{formatDate(publishedAt)}</span>
                <div className="blogItemBody">
                  {banner && (
                    <Link className="blogItemImage" to={`/blog/${slug}`} aria-label={title}>
                      <img src={banner} alt={bannerAlt || title} />
                    </Link>
                  )}
                  <Link className="blogItemTitle" to={`/blog/${slug}`}>{title}</Link>
                  {excerpt && <p>{excerpt}</p>}
                  <div className="blogItemFooter">
                    {readTime > 0 && <span>{readTime} min read</span>}
                    {(tags || []).slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                    {github && (
                      <a href={github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="blogEmpty">
            {posts.length === 0 ? "No published posts yet." : "No posts match your search."}
          </div>
        )}
      </section>
    </main>
  )
}

export default Blog
