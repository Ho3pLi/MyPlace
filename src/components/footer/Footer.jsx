import React from "react"
import "./footer.css"
import {FaGithub} from "react-icons/fa"
import {FiGitlab} from "react-icons/fi"
import {BsLinkedin} from "react-icons/bs"
import {Link} from "react-router-dom"

const Footer = () => {
  return (    
    <footer>

      <Link to="/" className="footer__logo">Daniele Barile</Link>

      <ul className="permalinks">

        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/developer-tools">Developer Tools</Link></li>
        <li><Link to="/statly">Statly</Link></li>
        <li><a href="#contact">Contact</a></li>

      </ul>

      <div className="footer__socials">

        <a href="https://github.com/Ho3pLi" target="_blank" rel="noreferrer"><FaGithub/></a>
        <a href="https://www.linkedin.com/in/danielebarile/" target="_blank" rel="noreferrer"><BsLinkedin/></a>
        <a href="https://gitlab.com/Ho3pLi" target="_blank" rel="noreferrer"><FiGitlab/></a>

      </div>

      <div className="footer__copyright">

        <small>&copy; Daniele Barile. All rights reserved.</small>

      </div>

    </footer>
  )
}

export default Footer
