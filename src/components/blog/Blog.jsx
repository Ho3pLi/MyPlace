import React, { useMemo, useState } from "react"
import "./blog.css"
import SearchBar from "../searchBar/SearchBar"
import { Link } from "react-router-dom"
import { usePosts } from "../../context/PostsContext"

const Blog = () => {
  const [query, setQuery] = useState("")
  const { posts, loading, error } = usePosts()

  const filteredPosts = useMemo(() => {
    if (!query.trim()) {
      return posts
    }

    const lowered = query.trim().toLowerCase()
    return posts.filter((post) => post.title.toLowerCase().includes(lowered))
  }, [posts, query])

  const searchData = useMemo(
    () =>
      posts.map((post) => ({
        id: post.id,
        title: post.title,
        read: `/Blog/${post.slug}`
      })),
    [posts]
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
        {loading ? (
          <div className="blog__empty">Loading posts...</div>
        ) : error ? (
          <div className="blog__empty">Failed to load posts: {error}</div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map(({ id, banner, title, github, slug, excerpt }) => (
            <article key={id} className="blog__item">
              <div className="blog__item-image">
                <img src={banner} alt={title} />
              </div>

              <h3>{title}</h3>
              {excerpt && <p className="blog__item-excerpt">{excerpt}</p>}

              <div className="blog__item-cta">
                <Link to={`/Blog/${slug}`} className="btn btn-primary">
                  Read
                </Link>
                {github && (
                  <a href={github} className="btn" target="_blank" rel="noreferrer">
                    Github
                  </a>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="blog__empty">
            {posts.length === 0 ? "No published posts yet." : "No posts match your search."}
          </div>
        )}
      </div>
    </section>
  )
}

export default Blog
