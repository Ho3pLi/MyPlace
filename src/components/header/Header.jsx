import React from "react"
import "./header.css"
import CTA from "./CTA"
import ME from "../../assets/meV2.png"
import HeaderSocial from "./HeaderSocial"

const Header = () => {
  return (
    <header>

      <div className="container header__container">

        <h5>Hi I'm</h5>
        <h1>Daniele Barile</h1>
        <h5 className="test-light">Fullstack Developer</h5>
        <h6>(frontend makes me go crazy)</h6>
        <CTA />
        <HeaderSocial />

        <div className="me">

          <img src={ME} alt="me" />

        </div>

        <a href="#contact" className="scroll__down">Scroll Down</a>
      </div>

    </header>
  )
}

export default Header