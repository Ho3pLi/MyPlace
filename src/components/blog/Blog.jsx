import React, { useMemo, useState } from "react"
import "./blog.css"
import Data from "./Data"
import SearchBar from "../searchBar/SearchBar"
import { Link } from "react-router-dom"

const Blog = () => {
  const [query, setQuery] = useState("")

  const filteredPosts = useMemo(() => {
    if (!query.trim()) {
      return Data
    }

    const lowered = query.trim().toLowerCase()
    return Data.filter((post) => post.title.toLowerCase().includes(lowered))
  }, [query])

  return (
    <section id="blog">
      <header className="blogHeader">
        <div className="container blogHeader__container">
          <h1>Welcome in my blog!</h1>
          <h3>the blog of a simple developer..</h3>
          <h4>..where i write what goes through my mind</h4>
          <SearchBar
            placeholder="Search in the blog..."
            data={Data}
            value={query}
            onChange={setQuery}
          />
        </div>
      </header>

      <div className="container blog__container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ id, image, title, github, read }) => (
            <article key={id} className="blog__item">
              <div className="blog__item-image">
                <img src={image} alt={title} />
              </div>

              <h3>{title}</h3>

              <div className="blog__item-cta">
                <Link to={read} className="btn btn-primary">
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