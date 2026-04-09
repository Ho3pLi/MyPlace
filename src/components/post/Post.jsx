import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Link, Navigate, useParams } from "react-router-dom"
import Giscus from "../giscus/Giscus"
import ME from "../../assets/Me_square.jpg"
import "./Post.css"
import { usePosts } from "../../context/PostsContext"
import { fetchPostBySlug } from "../../api/posts"

const Post = () => {
  const { slug } = useParams()
  const { posts, loading, error } = usePosts()
  const [post, setPost] = useState(null)
  const [postLoading, setPostLoading] = useState(true)
  const [postError, setPostError] = useState("")

  useEffect(() => {
    let cancelled = false

    const selectedPost = posts.find((item) => item.slug === slug)
    if (selectedPost) {
      setPost(selectedPost)
      setPostLoading(false)
      setPostError("")
      return undefined
    }

    if (loading) {
      return undefined
    }

    const loadPost = async () => {
      setPostLoading(true)
      setPostError("")

      try {
        const data = await fetchPostBySlug(slug)
        if (!cancelled) {
          if (data.status !== "published") {
            setPost(null)
          } else {
            setPost(data)
          }
        }
      } catch (err) {
        if (!cancelled) {
          setPost(null)
          if (err.status !== 404) {
            setPostError(err.message || "Failed to load post")
          }
        }
      } finally {
        if (!cancelled) {
          setPostLoading(false)
        }
      }
    }

    loadPost()

    return () => {
      cancelled = true
    }
  }, [loading, posts, slug])

  if (loading || postLoading) {
    return <div className="container post__container">Loading post...</div>
  }

  if (error || postError) {
    return <div className="container post__container">Failed to load post: {error || postError}</div>
  }

  if (!post) {
    return <Navigate to="/Blog" replace />
  }

  const index = posts.findIndex((item) => item.slug === post.slug)
  const previous = index < posts.length - 1 ? posts[index + 1] : null
  const next = index > 0 ? posts[index - 1] : null

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

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
          {formattedDate} {post.readTime > 0 ? `- ${post.readTime} min read` : ""}
        </small>
        <h2>{post.title}</h2>
        {post.excerpt && <p className="post__excerpt">{post.excerpt}</p>}
      </div>

      <div className="post__content">
        <div className="post__body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, children, ...props }) => (
                <a {...props} target="_blank" rel="noreferrer">
                  {children}
                </a>
              ),
              code: ({ inline, className, children, ...props }) =>
                inline ? (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ) : (
                  <pre className="post__code-block">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                )
            }}
          >
            {post.content || ""}
          </ReactMarkdown>
        </div>

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
