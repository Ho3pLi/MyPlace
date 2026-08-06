import React from "react"
import { Link } from "react-router-dom"
import "./developerTools.css"

const featureLines = [
  {
    label: "Workflow",
    content: "Quick browser actions for recurring developer tasks."
  },
  {
    label: "Interface",
    content: "Minimal UI designed to stay out of the way."
  },
  {
    label: "Privacy",
    content: "No personal data collection."
  }
]

const DeveloperTools = () => {
  return (
    <main id="developer-tools" className="devtoolsPage">
      <nav className="devtoolsNav" aria-label="Developer Tools navigation">
        <Link to="/">Home</Link>
        <a href="#features">Features</a>
        <a href="#install">Install</a>
        <Link to="/developer-tools/privacy-policy">Privacy</Link>
        <Link to="/developer-tools/terms-of-service">Terms</Link>
      </nav>

      <header className="devtoolsIntro">
        <span className="devtoolsMeta">Chrome Extension</span>
        <h1>Developer Tools</h1>
        <p className="devtoolsLead">
          A lightweight suite of utilities to speed up common developer tasks right in your browser.
          Clean design, practical shortcuts, and a privacy-friendly footprint.
        </p>
      </header>

      <div className="devtoolsSep" aria-hidden="true" />

      <section id="features" className="devtoolsSection">
        <h2>Features</h2>
        <div className="devtoolsBlock">
          {featureLines.map(({ label, content }) => (
            <div className="devtoolsLine" key={label}>
              <span className="devtoolsMeta">{label}</span>
              <div>{content}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="install" className="devtoolsSection">
        <h2>Install</h2>
        <article className="devtoolsItem">
          <span className="devtoolsMeta">Chrome Store</span>
          <div>
            <a
              className="devtoolsItemTitle"
              href="https://chromewebstore.google.com/detail/iopaecchbfgonpfdleogegogcolggped?utm_source=item-share-cb"
              target="_blank"
              rel="noreferrer"
            >
              Install from Chrome Web Store
            </a>
            <p>
              The extension is available from the official Chrome Web Store listing.
            </p>
          </div>
        </article>
      </section>
    </main>
  )
}

export default DeveloperTools
