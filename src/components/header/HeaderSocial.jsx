import React from "react"
import {BsLinkedin} from "react-icons/bs"
import {FaGithub} from "react-icons/fa"
import {FiGitlab} from "react-icons/fi"

const HeaderSocial = () => {
  return (
    <div className="header__socials">

        <a href="https://www.linkedin.com/in/danielebarile/" target="_blank"><BsLinkedin/></a>
        <a href="https://github.com/Ho3pLi" target="_blank"><FaGithub/></a>
        <a href="https://gitlab.com/Ho3pLi" target="_blank"><FiGitlab/></a>

    </div>
  )
}

export default HeaderSocial