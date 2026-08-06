import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { FiMoon, FiSun } from "react-icons/fi"
import NavG from "./components/navG/NavG"
import NavGG from "./components/navGG/NavGG"
import Admin from "./components/admin/Admin"
import Blog from "./components/blog/Blog"
import Error from "./components/error/Error"
import Post from "./components/post/Post"
import DeveloperTools from "./components/developerTools/DeveloperTools"
import PrivacyPolicy from "./components/developerTools/PrivacyPolicy"
import TermsOfService from "./components/developerTools/TermsOfService"
import Statly from "./components/statly/Statly"
import Home from "./components/home/Home"

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("site-theme") || "light")
  const isDarkTheme = theme === "dark"

  useEffect(() => {
    localStorage.setItem("site-theme", theme)
  }, [theme])

  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className={`appShell ${isDarkTheme ? "appShellDark" : ""}`}>
        <div className="siteReworkBanner" role="status">
          Site under rework: some features may be unavailable.
        </div>
        <button
          className="themeToggle"
          type="button"
          aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
          title={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
          onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
        >
          {isDarkTheme ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/admin"
            element={<Admin />}
          />
          <Route
            path="/Blog"
            element={
              <>
                <Blog />
                <NavG />
              </>
            }
          />
          <Route path="/Blog/:slug" element={<Post />} />
          <Route
            path="/statly"
            element={
              <>
                <NavG />
                <Statly />
              </>
            }
          />
          <Route
            path="/developer-tools"
            element={
              <>
                <NavG />
                <DeveloperTools />
              </>
            }
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
            element={
              <>
                <Error />
                <NavGG />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
