import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
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
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
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
    </Router>
  )
}

export default App
