import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { fetchPosts as fetchPostsFromApi } from "../api/posts"

const PostsContext = createContext(null)

const sortByDateDesc = (list) =>
  list.slice().sort((a, b) => new Date(b.publishedAt || b.updatedAt) - new Date(a.publishedAt || a.updatedAt))

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const data = await fetchPostsFromApi()
      setPosts(sortByDateDesc(data))
    } catch (err) {
      setError(err.message || "Failed to load posts")
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const value = {
    posts,
    loading,
    error,
    refresh: fetchPosts
  }

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

export const usePosts = () => {
  const ctx = useContext(PostsContext)
  if (!ctx) {
    throw new Error("usePosts must be used within a PostsProvider")
  }
  return ctx
}
