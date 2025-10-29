import React from "react"
import { useNavigate } from "react-router-dom"
import "./developerTools.css"

const DeveloperTools = () => {
  const navigate = useNavigate()
  return (
    <section id="developer-tools" className="devtools__section">
      <div className="container devtools__container">
        <header className="devtools__header">
          <h5>Chrome Extension</h5>
          <h2>Developer Tools</h2>
          <p className="text-light">
            A lightweight suite of utilities to speed up common developer tasks
            right in your browser. Clean design, privacy-friendly.
          </p>
          <div className="devtools__cta">
            <a className="btn btn-primary" href="#install">How to install</a>
            <a
              className="btn"
              href="/developer-tools/privacy-policy"
              onClick={(e) => { e.preventDefault(); navigate("/developer-tools/privacy-policy") }}
            >Privacy Policy</a>
            <a
              className="btn"
              href="/developer-tools/terms-of-service"
              onClick={(e) => { e.preventDefault(); navigate("/developer-tools/terms-of-service") }}
            >Terms of Service</a>
          </div>
        </header>

        <div className="devtools__grid">
          <article className="devtools__card">
            <h3>Key features</h3>
            <ul>
              <li>Quick actions for recurring developer workflows.</li>
              <li>Minimal UI.</li>
              <li>No personal data collection (see Privacy Policy).</li>
            </ul>
          </article>

          <article id="install" className="devtools__card">
            <h3>Installation</h3>
            <p>
              Available on the Chrome Web Store.
            </p>
            <p>
              Link: <a href="https://chrome.google.com/webstore/detail/REPLACE_WITH_ID" target="_blank" rel="noreferrer">Install from Chrome Web Store</a>
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default DeveloperTools

