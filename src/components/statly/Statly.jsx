import React from "react"
import { Link } from "react-router-dom"
import "./statly.css"
import valScreen from "../../assets/val_screen.png"
import rlScreen from "../../assets/rl_screen.png"

const featureLines = [
  {
    label: "Tracks",
    content: "Rank points gained or lost, distance to next rank, derank risk, and daily match performance."
  },
  {
    label: "Reports",
    content: "Automatic daily summaries delivered on a schedule for each player."
  },
  {
    label: "Games",
    content: "Valorant, League of Legends, Apex Legends, Rocket League, and more."
  }
]

const reportLines = [
  "Rank delta and streaks",
  "Next-rank progress",
  "Derank risk",
  "Recent match highlights"
]

const roadmapLines = [
  {
    label: "More titles",
    content: "Expand tracking coverage across more competitive games."
  },
  {
    label: "Team summaries",
    content: "Shared dashboards and reports for groups."
  },
  {
    label: "Deeper trends",
    content: "Richer analytics for long-running player progress."
  }
]

const Statly = () => {
  return (
    <main id="statly" className="statlyPage">
      <nav className="statlyNav" aria-label="Statly navigation">
        <Link to="/">Home</Link>
        <a href="#features">Features</a>
        <a href="#preview">Preview</a>
        <a href="#roadmap">Roadmap</a>
      </nav>

      <header className="statlyIntro">
        <span className="statlyMeta">Discord bot</span>
        <h1>Statly</h1>
        <p className="statlyLead">
          Competitive-tracking bot for ranked players. Automatic daily summaries, rank deltas,
          and progress snapshots across the games you care about.
        </p>
      </header>

      <div className="statlySep" aria-hidden="true" />

      <section id="features" className="statlySection">
        <h2>Features</h2>
        <div className="statlyBlock">
          {featureLines.map(({ label, content }) => (
            <div className="statlyLine" key={label}>
              <span className="statlyMeta">{label}</span>
              <div>{content}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="preview" className="statlySection">
        <h2>Preview</h2>
        <div className="statlyPreviewList">
          <article className="statlyPreview">
            <div className="statlyPreviewCopy">
              <span className="statlyMeta">Daily report</span>
              <h3>Personalized summaries delivered on schedule</h3>
              <p>
                Set your daily report time and Statly sends a concise recap with rank changes,
                match stats, and key session details.
              </p>
              <div className="statlyTagList">
                {reportLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
            <figure className="statlyMedia">
              <img src={valScreen} alt="Statly daily report example" />
              <figcaption>Daily summary with rank deltas and streaks</figcaption>
            </figure>
          </article>

          <article className="statlyPreview statlyPreviewAlt">
            <figure className="statlyMedia">
              <img src={rlScreen} alt="Statly live tracking example" />
              <figcaption>Live session tracking for your climb</figcaption>
            </figure>
            <div className="statlyPreviewCopy">
              <span className="statlyMeta">Live tracking</span>
              <h3>See progress as you play</h3>
              <p>
                Track gains and losses throughout the day so you know how the session is trending
                before you call it.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="roadmap" className="statlySection">
        <h2>Roadmap</h2>
        <div className="statlyBlock">
          {roadmapLines.map(({ label, content }) => (
            <div className="statlyLine" key={label}>
              <span className="statlyMeta">{label}</span>
              <div>{content}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Statly
