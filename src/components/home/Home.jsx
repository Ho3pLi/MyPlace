import React from "react"
import { Link } from "react-router-dom"
import "./home.css"

const identityLines = [
  {
    label: "Working on",
    content: (
      <>
        personal web tools, <Link to="/developer-tools">browser utilities</Link>, and small automation projects
      </>
    )
  },
  {
    label: "Building",
    content: (
      <span className="homeLinkList">
        <a href="https://github.com/Ho3pLi" target="_blank" rel="noreferrer">open-source experiments</a>,{" "}
        <Link to="/statly">Statly</Link>, <Link to="/developer-tools">Developer Tools</Link>, and this website
      </span>
    )
  },
  {
    label: "Exploring",
    content: "secure systems, developer experience, home servers, cloud deployments, and practical AI workflows"
  },
  {
    label: "Available for",
    content: (
      <>
        full-stack development, API integrations, automation work, and technical collaboration
      </>
    )
  }
]

const projects = [
  {
    status: "Active",
    title: "Statly",
    to: "/statly",
    description:
      "Competitive-tracking Discord bot with daily summaries, rank deltas, and progress snapshots.",
    links: [{ label: "details", to: "/statly" }]
  },
  {
    status: "Released",
    title: "Developer Tools",
    to: "/developer-tools",
    description:
      "A Chrome extension with lightweight utilities for recurring developer workflows.",
    links: [
      { label: "details", to: "/developer-tools" },
      {
        label: "install",
        href: "https://chromewebstore.google.com/detail/iopaecchbfgonpfdleogegogcolggped?utm_source=item-share-cb"
      }
    ]
  },
  {
    status: "Ongoing",
    title: "MyPlace",
    href: "https://github.com/Ho3pLi/MyPlace",
    description:
      "My personal web home, rebuilt as a cleaner index for projects, writing, and contact points.",
    links: [{ label: "source", href: "https://github.com/Ho3pLi/MyPlace" }]
  }
]

const moreLines = [
  {
    label: "Find me",
    content: (
      <>
        <a href="https://github.com/Ho3pLi" target="_blank" rel="noreferrer">GitHub</a>,{" "}
        <a href="https://gitlab.com/Ho3pLi" target="_blank" rel="noreferrer">GitLab</a>,{" "}
        <a href="https://www.linkedin.com/in/danielebarile/" target="_blank" rel="noreferrer">LinkedIn</a>
      </>
    )
  },
  {
    label: "Contact",
    content: <a href="mailto:daniele.barile@mylifeblike.com">daniele.barile@mylifeblike.com</a>
  },
  {
    label: "Elsewhere",
    content: (
      <>
        <Link to="/blog">Blog</Link>, <Link to="/statly">Statly</Link>, and{" "}
        <Link to="/developer-tools">Developer Tools</Link>
      </>
    )
  }
]

const renderItemLink = ({ label, href, to }) => {
  if (to) {
    return <Link key={label} to={to}>{label}</Link>
  }

  return (
    <a key={label} href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  )
}

const Home = () => {
  return (
    <main className="homePage">
      <nav className="homeNav" aria-label="Main navigation">
        <a href="#projects">Projects</a>
        <Link to="/blog">Writing</Link>
        <Link to="/developer-tools">Tools</Link>
        <a href="#contact">Contact</a>
      </nav>

      <header className="homeIntro">
        <h1>Daniele Barile</h1>
        <p className="homeLead">
          Full-stack developer with a soft spot for developer experience, secure systems, and projects
          that turn practical ideas into working software.
        </p>

        <div className="homeBlock" aria-label="Current work and interests">
          {identityLines.map(({ label, content }) => (
            <div className="homeLine" key={label}>
              <span className="homeLabel">{label}</span>
              <div>{content}</div>
            </div>
          ))}
        </div>
      </header>

      <div className="homeSep" aria-hidden="true" />

      <section id="projects" className="homeSection">
        <h2>Projects</h2>
        <div className="homeItems">
          {projects.map(({ status, title, description, href, to, links }) => (
            <article className="homeItem" key={title}>
              <span className="homeMeta">{status}</span>
              <div>
                {to ? (
                  <Link className="homeItemTitle" to={to}>{title}</Link>
                ) : (
                  <a className="homeItemTitle" href={href} target="_blank" rel="noreferrer">{title}</a>
                )}
                <p>{description}</p>
                <div className="homeItemLinks">{links.map(renderItemLink)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="writing" className="homeSection">
        <h2>Writing</h2>
        <article className="homeItem homeItemPlaceholder">
          <span className="homeMeta">In progress</span>
          <div>
            <span className="homeItemTitle">Writing is coming back soon</span>
            <p>
              The frontend space is ready, while the backend for posts and publishing is still in progress.
            </p>
            <div className="homeItemLinks">
              <Link to="/blog">open blog route</Link>
            </div>
          </div>
        </article>
      </section>

      <section id="contact" className="homeSection">
        <h2>More</h2>
        <div className="homeBlock">
          {moreLines.map(({ label, content }) => (
            <div className="homeLine" key={label}>
              <span className="homeLabel">{label}</span>
              <div>{content}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="homeFooter">
        <span className="homeTiny">Last updated Aug 2026</span>
      </footer>
    </main>
  )
}

export default Home
