import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes, useLocation, matchPath, Navigate, useParams } from "react-router-dom"
import { FiMoon, FiSun } from "react-icons/fi"
import NavG from "./components/navG/NavG"
import Blog from "./components/blog/Blog"
import Error from "./components/error/Error"
import Post from "./components/post/Post"
import DeveloperTools from "./components/developerTools/DeveloperTools"
import PrivacyPolicy from "./components/developerTools/PrivacyPolicy"
import TermsOfService from "./components/developerTools/TermsOfService"
import Statly from "./components/statly/Statly"
import Home from "./components/home/Home"

const routesWithThemeToggle = [
  "/",
  "/blog",
  "/blog/:slug",
  "/statly",
  "/developer-tools",
  "/developer-tools/privacy-policy",
  "/developer-tools/terms-of-service"
]

const BlogPostRedirect = () => {
  const { slug } = useParams()
  return <Navigate to={`/blog/${slug}`} replace />
}

const AppContent = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("site-theme") || "light")
  const location = useLocation()
  const isDarkTheme = theme === "dark"
  const showThemeToggle = routesWithThemeToggle.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  )

  useEffect(() => {
    localStorage.setItem("site-theme", theme)
  }, [theme])

  return (
    <div className={`appShell ${isDarkTheme ? "appShellDark" : ""}`}>
      <div className="siteReworkBanner" role="status">
        Site under rework: some features may be unavailable.
      </div>
      {showThemeToggle && (
        <button
          className="themeToggle"
          type="button"
          aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
          title={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
          onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
        >
          {isDarkTheme ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
      )}
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/Blog"
          caseSensitive
          element={<Navigate to="/blog" replace />}
        />
        <Route
          path="/Blog/:slug"
          caseSensitive
          element={<BlogPostRedirect />}
        />
        <Route
          path="/blog"
          element={<Blog />}
        />
        <Route path="/blog/:slug" element={<Post />} />
        <Route
          path="/statly"
          element={<Statly />}
        />
        <Route
          path="/developer-tools"
          element={<DeveloperTools />}
        />
        <Route
          path="/developer-tools/privacy-policy"
          element={
            <>
              <NavG />
              <PrivacyPolicy />
            </>
          }
        />
        <Route
          path="/developer-tools/terms-of-service"
          element={
            <>
              <NavG />
              <TermsOfService />
            </>
          }
        />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </div>
  )
}

const App = () => {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AppContent />
    </Router>
  )
}

export default App
