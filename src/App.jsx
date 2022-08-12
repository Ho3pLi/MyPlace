import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Nav from "./components/nav/Nav"
import NavG from "./components/navG/NavG"
import NavGG from "./components/navGG/NavGG"
import About from "./components/about/About"
import Experience from "./components/experience/Experience"
import Services from "./components/services/Services"
import BlogPreview from "./components/blogPreview/BlogPreview"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
import Footer from "./components/footer/Footer"
import Error from "./components/error/Error"
import Post1 from "./components/post/Post_1"

const App = () => {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={
              <>
                <Header/>
                <Nav/>
                <About/>
                <Experience/>
                <Services/>
                <BlogPreview/>
                <Contact/>
                <Footer/>
              </>}
            />
            <Route path="/Blog" element={
              <>
                <Blog/>
                <NavG/>
              </>}  
            />
            <Route path="*" element={
              <>
                <Error/>
                <NavGG/>
              </>
            }/>
            <Route path="/Blog/buymeanr6please" element={
              <>
                <Post1/>
              </>
            }/>
          </Routes>
      </Router>
    </>
    )
}

export default App