import React from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import Giscus from "../giscus/Giscus"
import ME from "../../assets/Me_square.jpg"
import { getAllPosts, getPostBySlug } from "./postsData"
import "./Post.css"

const Post = () => {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return <Navigate to="/Blog" replace />
  }

  const posts = getAllPosts()
  const index = posts.findIndex((item) => item.slug === post.slug)
  const previous = index < posts.length - 1 ? posts[index + 1] : null
  const next = index > 0 ? posts[index - 1] : null

  return (
    <div className="container post__container">
      <Link to="/" className="nothing">
        <h1>
          $<span className="blinkItem">_</span> Daniele's Blog
        </h1>
      </Link>

      <div className="post__banner">
        <img src={post.banner} alt={post.bannerAlt} />
      </div>

      <div className="post__header">
        <small>
          {post.publishedAt} - {post.readTime}
        </small>
        <h2>{post.title}</h2>
      </div>

      <div className="post__content">
        {post.body}

        <hr />

        <img src={ME} alt="Daniele Barile" className="MeFooterBlog" />
        <p className="post__footer">
          Personal blog of Daniele Barile. I am a fullstack developer and I also have a strong interest
          in cybersecurity and pentesting.
        </p>

        <div className="comments">
          <Giscus />
        </div>
      </div>

      <div className="next_previous">
        {previous && (
          <Link to={`/Blog/${previous.slug}`} className="post__link-previous">
            Previous
          </Link>
        )}

        {next && (
          <Link to={`/Blog/${next.slug}`} className="post__link-next">
            Next
          </Link>
        )}
      </div>
    </div>
  )
}

export default Post