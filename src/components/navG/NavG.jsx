import React from 'react'
import './navG.css'
import {AiOutlineHome} from 'react-icons/ai'
import {BiBook} from 'react-icons/bi'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const NavG = () => {

  let navigate = useNavigate()

  const [activeNav, setActiveNav] = useState('#')

  return (
    <nav>

      <a href="/" onClick={() => {navigate("/"); setActiveNav('#')}} className={activeNav === '#home' ? 'active' : ''}><AiOutlineHome/></a>
      <a href="#" onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}><BiBook/></a>
      
    </nav>
  )
}

export default NavG