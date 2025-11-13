import React from "react"
import "./header.css"
import CTA from "./CTA"
import HeaderSocial from "./HeaderSocial"

const heroHighlights = [
  { label: "Stack", value: "React / Node / Cloud" },
  { label: "Focus", value: "DX & Automation" },
  { label: "Status", value: "Remote friendly" }
]

const currentFocus = [
  "Operational tooling that removes busywork",
  "Secure API design with measurable impact",
  "Playful side projects that teach something new"
]

const Header = () => {
  return (
    <header className="siteHeader">
      <div className="header__glow" aria-hidden="true" />

      <div className="container header__container">
        <div className="header__content">
          <p className="header__eyebrow">Always shipping / Open to collaborations</p>
          <h1>Daniele Barile</h1>
          <p className="header__lead">
            Fullstack developer with a soft spot for developer experience, secure systems and projects
            that blur the line between product and playground.
          </p>

          <div className="header__cta-row">
            <CTA />
            <a href="#experience" className="btn btn--ghost">View experience</a>
          </div>

          <div className="header__highlights">
            {heroHighlights.map(({ label, value }) => (
              <article key={label}>
                <span>{value}</span>
                <small>{label}</small>
              </article>
            ))}
          </div>

          <HeaderSocial />
        </div>

        <div className="header__panel">
          <p className="header__panel-title">Currently hacking on</p>
          <ul>
            {currentFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="header__panel-foot">
            <span>Need help shipping faster?</span>
            <a href="#contact">Let's talk</a>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll__down">Keep scrolling</a>
    </header>
  )
}

export default Header
