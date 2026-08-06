import React, { useMemo } from "react"
import "./blogPreview.css"
import { Link, useNavigate } from "react-router-dom"
import { usePosts } from "../../context/PostsContext"

const BlogPreview = () => {

  let navigate = useNavigate()
  const { posts, loading, error } = usePosts()

  const recentPosts = useMemo(() => {
    return posts
      .slice()
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3)
  }, [posts])

  return (
    <section id="blogPreview">
    
     <h5>My Recent Post</h5>
     <h6 onClick={() => {navigate("/blog")}}>(yea i also have a blog, check it out!)</h6>
     <h2>Blog</h2>

     <div className="container blogPreview__container">

      {loading && <p className="blogPreview__empty">Loading posts...</p>}
      {!loading && error && <p className="blogPreview__empty">Failed to load posts: {error}</p>}
      {!loading && !error && (
        <>
      {

        recentPosts.map(({id, title, github, slug, banner, excerpt}) => {

          return(
            <article key={id} className="blogPreview__item">

              <div className="blogPreview__item-image">
              
                <img src={banner} alt={title} />
                
              </div>

              <h3>{title}</h3>
              {excerpt && <p className="blogPreview__item-excerpt">{excerpt}</p>}

              <div className="blogPreview__item-cta">

                <Link to={`/blog/${slug}`} className="btn btn-primary">Read</Link>
                {github && <a href={github} className="btn" target="_blank" rel="noreferrer">Github</a>}

              </div>

            </article>

          )

        })

      }

      {recentPosts.length === 0 && <p className="blogPreview__empty">No published posts yet.</p>}
        </>
      )}

     </div>

    </section>
  )
}

export default BlogPreview
