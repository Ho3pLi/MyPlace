import React from "react"
import "./navGG.css"
import {AiOutlineHome} from "react-icons/ai"
import {TbError404} from "react-icons/tb"
import {useState} from "react"
import {Link} from "react-router-dom"

const NavG = () => {
  const [activeNav, setActiveNav] = useState("#")

  return (
    <nav>

      <Link to="/" onClick={() => setActiveNav("#home")} className={activeNav === "#home" ? "active" : ''}><AiOutlineHome/></Link>
      <Link to="/404" onClick={() => setActiveNav("#")} className={activeNav === "#" ? "active" : ''}><TbError404/></Link>
      
    </nav>
  )
}

export default NavG
