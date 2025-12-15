import { createContext, useCallback, useContext, useEffect, useState } from "react"

const PostsContext = createContext(null)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000"

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
      const response = await fetch(`${API_URL}/posts`)
      if (!response.ok) {
        throw new Error(`Unable to load posts (${response.status})`)
      }
      const data = await response.json()
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
