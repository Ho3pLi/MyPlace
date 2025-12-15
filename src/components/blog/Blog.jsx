import React, { useMemo, useState } from "react"
import "./blog.css"
import SearchBar from "../searchBar/SearchBar"
import { Link } from "react-router-dom"
import { usePosts } from "../../context/PostsContext"

const Blog = () => {
  const [query, setQuery] = useState("")
  const { posts, loading, error } = usePosts()
  const publishedPosts = useMemo(
    () =>
      posts
        .filter((post) => post.status === "published")
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
    [posts]
  )

  const filteredPosts = useMemo(() => {
    if (!query.trim()) {
      return publishedPosts
    }

    const lowered = query.trim().toLowerCase()
    return publishedPosts.filter((post) => post.title.toLowerCase().includes(lowered))
  }, [publishedPosts, query])

  const searchData = useMemo(
    () =>
      publishedPosts.map((post) => ({
        id: post.id,
        title: post.title,
        read: `/Blog/${post.slug}`
      })),
    [publishedPosts]
  )

  return (
    <section id="blog">
      <header className="blogHeader">
        <div className="container blogHeader__container">
          <h1>Welcome in my blog!</h1>
          <h3>the blog of a simple developer..</h3>
          <h4>..where i write what goes through my mind</h4>
          <SearchBar
            placeholder="Search in the blog..."
            data={searchData}
            value={query}
            onChange={setQuery}
          />
        </div>
      </header>

      <div className="container blog__container">
        {loading && <div className="blog__empty">Loading posts...</div>}
        {error && !loading && <div className="blog__empty">Failed to load posts: {error}</div>}
        {!loading && !error && filteredPosts.length > 0 ? (
          filteredPosts.map(({ id, banner, title, github, slug }) => (
            <article key={id} className="blog__item">
              <div className="blog__item-image">
                <img src={banner} alt={title} />
              </div>

              <h3>{title}</h3>

              <div className="blog__item-cta">
                <Link to={`/Blog/${slug}`} className="btn btn-primary">
                  Read
                </Link>
                <a href={github} className="btn" target="_blank" rel="noreferrer">
                  Github
                </a>
              </div>
            </article>
          ))
        ) : (
          <div className="blog__empty">No posts match your search.</div>
        )}
      </div>
    </section>
  )
}

export default Blog
