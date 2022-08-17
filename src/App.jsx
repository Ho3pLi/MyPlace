import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { createContext } from "react"
import { useState, useEffect } from "react"
import Data from "./components/blog/Data"
import Header from "./components/header/Header"
import Nav from "./components/nav/Nav"
import NavG from "./components/navG/NavG"
import NavGG from "./components/navGG/NavGG"
import Switch from "./components/switch/Switch"
import About from "./components/about/About"
import Experience from "./components/experience/Experience"
import Services from "./components/services/Services"
import BlogPreview from "./components/blogPreview/BlogPreview"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
import Footer from "./components/footer/Footer"
import Error from "./components/error/Error"
import Post1 from "./components/post/Post_1"
import SearchBar from "./components/searchBar/SearchBar"


export const ThemeContext = createContext(null)

const App = () => {
  
  const [theme, setTheme] = useState("light")

  useEffect(() => {document.documentElement.setAttribute("id", theme)}, [theme])

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Router>
          <Routes>
            <Route path="/" element={
              <>
                <Header/>
                <Nav/>
                <Switch/>
                <About/>
                <Experience/>
                <Services/>
                <BlogPreview/>
                <Contact/>
                <Footer/>
              </>
            }/>
            <Route path="/Blog" element={
              <>
                <Blog/>
                {/*<SearchBar placeholder="Search in the Blog.." data={Data}/>*/}
                <Switch/>
                <NavG/>
              </>
            }/>
            <Route path="*" element={
              <>
                <Error/>
                <Switch/>
                <NavGG/>
              </>
            }/>
            <Route path="/Blog/buymeanr6please" element={
              <>
                <Post1/>
                <Switch/>
              </>
            }/>
          </Routes>
      </Router>
    </ThemeContext.Provider>
    )
}

export default App