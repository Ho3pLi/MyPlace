import React, { createContext, useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
/*import ReactSwitch from "react-switch"*/
import Data from "./components/blog/Data"
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
import Post2 from "./components/post/Post_2"
import Post3 from "./components/post/Post_3"
import Post4 from "./components/post/Post_4"
import SearchBar from "./components/searchBar/SearchBar"


/*export const ThemeContext = createContext(null)*/

const App = () => {
  
  /*const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {

    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  useEffect(() => {document.documentElement.setAttribute("id", theme)}, [theme])*/

  return (
    /*<ThemeContext.Provider value={{theme, toggleTheme}}>*/
      <Router>
          <Routes>
            <Route path="/" element={
              <>
                <Header/>
                <Nav/>
                {/*<ReactSwitch onChange={toggleTheme} checked={theme === "dark"} className="switch"/>*/}
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
                {/*<ReactSwitch onChange={toggleTheme} checked={theme === "dark"} className="switch"/>*/}
                <NavG/>
              </>
            }/>
            <Route path="*" element={
              <>
                <Error/>
                {/*<ReactSwitch onChange={toggleTheme} checked={theme === "dark"} className="switch"/>*/}
                <NavGG/>
              </>
            }/>
            <Route path="/Blog/buymeanr6please" element={
              <>
                <Post1/>
                {/*<ReactSwitch onChange={toggleTheme} checked={theme === "dark"} className="switch"/>*/}
              </>
            }/>
            <Route path="/Blog/HotShare" element={
              <>
                <Post2/>
              </>
            }/>
            <Route path="/Blog/Update022023" element={
              <>
                <Post3/>
              </>
            }/>
            <Route path="/Blog/Update042023" element={
              <>
                <Post4/>
              </>
            }/>
          </Routes>
      </Router>
    /*</ThemeContext.Provider>*/
    )
}

export default App