import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
import NavG from './components/navG/NavG'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Services from './components/services/Services'
import BlogPreview from './components/blogPreview/BlogPreview'
import Blog from './components/blog/Blog'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={
              <>
                <Header />
                <Nav />
                <About />
                <Experience />
                <Services/>
                <BlogPreview/>
                <Contact/>
                <Footer/>
              </>}
            />
            <Route path='/Blog' element={
              <>
                <Blog/>
                <NavG/>
              </>}  
            />
          </Routes>
      </Router>
    </>
    )
}

export default App