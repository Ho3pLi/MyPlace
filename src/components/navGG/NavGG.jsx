import React from "react"
import "./navGG.css"
import {AiOutlineHome} from "react-icons/ai"
import {TbError404} from "react-icons/tb"
import {useState} from "react"
import {useNavigate} from "react-router-dom"

const NavG = () => {

  let navigate = useNavigate()

  const [activeNav, setActiveNav] = useState("#")

  return (
    <nav>

      <a href="/" onClick={() => {navigate("/"); setActiveNav("#")}} className={activeNav === "#home" ? "active" : ''}><AiOutlineHome/></a>
      <a href="#" onClick={() => setActiveNav("#")} className={activeNav === "#" ? "active" : ''}><TbError404/></a>
      
    </nav>
  )
}

export default NavG