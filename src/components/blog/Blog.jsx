import React from "react"
import "./blog.css"
import Data from "./Data"
import { Link } from "react-router-dom"

const Blog = () => {
  return (
    <section id="blog">
      <header className="blogHeader">
        <div className="container blogHeader__container">
          <h1>Welcome in my blog!</h1>
          <h3>the blog of a simple developer..</h3>
          <h4>..where i write what goes through my mind</h4>
        </div>
      </header>

      <div className="container blog__container">
        {Data.map(({ id, image, title, github, read }) => (
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
        ))}
      </div>
    </section>
  )
}

export default Blog