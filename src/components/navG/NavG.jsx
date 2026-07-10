import React from "react"
import "./navG.css"
import {AiOutlineHome} from "react-icons/ai"
import {BiBook} from "react-icons/bi"
import {useState} from "react"
import {Link} from "react-router-dom"

const NavG = () => {
  const [activeNav, setActiveNav] = useState("#")

  return (
    <nav>

      <Link to="/" onClick={() => setActiveNav("#home")} className={activeNav === "#home" ? "active" : ''}><AiOutlineHome/></Link>
      <Link to="/Blog" onClick={() => setActiveNav("#")} className={activeNav === "#" ? "active" : ''}><BiBook/></Link>
      
    </nav>
  )
}

export default NavG
