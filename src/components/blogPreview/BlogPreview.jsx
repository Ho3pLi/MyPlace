import React, { useMemo } from "react"
import "./blogPreview.css"
import {useNavigate} from "react-router-dom"
import { usePosts } from "../../context/PostsContext"

const BlogPreview = () => {

  let navigate = useNavigate()
  const { posts } = usePosts()

  const recentPosts = useMemo(() => {
    return posts
      .filter((post) => post.status === "published")
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3)
  }, [posts])

  return (
    <section id="blogPreview">
    
     <h5>My Recent Post</h5>
     <h6 onClick={() => {navigate("/Blog")}}>(yea i also have a blog, check it out!)</h6>
     <h2>Blog</h2>

     <div className="container blogPreview__container">

      {

        recentPosts.map(({id, title, github, slug, banner}) => {

          return(
            <article key={id} className="blogPreview__item">

              <div className="blogPreview__item-image">
              
                <img src={banner} alt={title} />
                
              </div>

              <h3>{title}</h3>

              <div className="blogPreview__item-cta">

                <a href={`/Blog/${slug}`} className="btn btn-primary">Read</a>
                <a href={github} className="btn" target="_blank" rel="noreferrer">Github</a>

              </div>

            </article>

          )

        })

      }

     </div>

    </section>
  )
}

export default BlogPreview
