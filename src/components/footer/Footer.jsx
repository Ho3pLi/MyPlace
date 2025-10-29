import React from "react"
import "./footer.css"
import {FaGithub} from "react-icons/fa"
import {FiGitlab} from "react-icons/fi"
import {BsLinkedin} from "react-icons/bs"
import {useNavigate} from "react-router-dom"

const Footer = () => {

  let navigate = useNavigate()

  return (    
    <footer>

      <a href="#" className="footer__logo">Daniele Barile</a>

      <ul className="permalinks">

        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="/Blog" onClick={() => {navigate("/Blog")}}>Blog</a></li>
        <li><a href="/developer-tools" onClick={() => {navigate("/developer-tools")}}>Developer Tools</a></li>
        <li><a href="#contact">Contact</a></li>

      </ul>

      <div className="footer__socials">

        <a href="https://github.com"><FaGithub/></a>
        <a href="https://www.linkedin.com/in/danielebarile/"><BsLinkedin/></a>
        <a href="https://gitlab.com"><FiGitlab/></a>

      </div>

      <div className="footer__copyright">

        <small>&copy; Daniele Barile. All rights reserved.</small>

      </div>

    </footer>
  )
}

export default Footer
