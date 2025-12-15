import React, { useMemo } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import Giscus from "../giscus/Giscus"
import ME from "../../assets/Me_square.jpg"
import "./Post.css"
import { usePosts } from "../../context/PostsContext"

const Post = () => {
  const { slug } = useParams()
  const { posts, loading, error } = usePosts()

  const publishedPosts = useMemo(
    () =>
      posts
        .filter((item) => item.status === "published")
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
    [posts]
  )

  const post = publishedPosts.find((item) => item.slug === slug)

  if (loading) {
    return <div className="container post__container">Loading post...</div>
  }

  if (error) {
    return <div className="container post__container">Failed to load posts: {error}</div>
  }

  if (!post) {
    return <Navigate to="/Blog" replace />
  }

  const index = publishedPosts.findIndex((item) => item.slug === post.slug)
  const previous = index < publishedPosts.length - 1 ? publishedPosts[index + 1] : null
  const next = index > 0 ? publishedPosts[index - 1] : null

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  const sanitizeContent = (html) =>
    (html || "")
      .toString()
      .replace(/<script.*?>.*?<\/script>/gi, "")
      .replace(/on\w+=".*?"/gi, "")

  const bodyHtml = sanitizeContent(post.content || post.body || "")

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
          {formattedDate} - {post.readTime} min read
        </small>
        <h2>{post.title}</h2>
      </div>

      <div className="post__content">
        <div className="post__body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

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
