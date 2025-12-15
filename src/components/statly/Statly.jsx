import React from "react"
import "./statly.css"
import valScreen from "../../assets/val_screen.png"
import rlScreen from "../../assets/rl_screen.png"

const Statly = () => {
  return (
    <section id="statly" className="statly">
      <div className="container statly__container">
        <header className="statly__hero">
          <p className="eyebrow">Discord bot</p>
          <h1>Statly</h1>
          <p className="statly__lede">
            Competitive-tracking bot for ranked grinders. Automatic daily summaries, rank deltas, and
            performance insights across Valorant, CS:GO, Apex Legends, Splitgate, The Division 2, and more.
          </p>
          <div className="statly__cta">
            <a className="btn btn-primary" href="#features">See features</a>
            <a className="btn" href="#media">Preview</a>
          </div>
        </header>

        <div className="statly__grid" id="features">
          <article className="statly__card">
            <h3>What Statly tracks</h3>
            <ul>
              <li>Rank points gained/lost during the day.</li>
              <li>Distance to next rank and risk of derank.</li>
              <li>Daily match performance and trendlines.</li>
              <li>Custom daily report time per player.</li>
            </ul>
          </article>

          <article className="statly__card">
            <h3>Why it helps</h3>
            <ul>
              <li>Stay focused on your climb with clear deltas.</li>
              <li>Spot bad streaks early and adjust.</li>
              <li>Share or archive daily reports automatically.</li>
              <li>Clean, reliable, automated—no clutter.</li>
            </ul>
          </article>

          <article className="statly__card">
            <h3>Games covered</h3>
            <div className="statly__pillbox">
              {["Valorant", "League of Legends", "Apex Legends", "Rocket League"].map((game) => (
                <span key={game} className="statly__pill">{game}</span>
              ))}
            </div>
          </article>
        </div>

        <section className="statly__section" id="media">
          <div className="statly__section-copy">
            <p className="eyebrow">Daily report</p>
            <h2>Personalized summaries delivered on schedule</h2>
            <p>
              Set your daily report time and Statly sends a concise recap: rank changes, match stats, and key
              insights to understand your session at a glance.
            </p>
            <div className="statly__bullets">
              <span>Rank delta &amp; streaks</span>
              <span>Next rank progress</span>
              <span>Derank risk</span>
              <span>Recent match highlights</span>
            </div>
          </div>
          <div className="statly__media">
            <figure className="statly__media-frame">
              <img src={valScreen} alt="Statly daily report example" />
              <figcaption>Daily summary with rank deltas and streaks</figcaption>
            </figure>
          </div>
        </section>

        <section className="statly__section statly__section--alt">
          <div className="statly__media">
            <figure className="statly__media-frame">
              <img src={rlScreen} alt="Statly live tracking example" />
              <figcaption>Live session tracking for your climb</figcaption>
            </figure>
          </div>
          <div className="statly__section-copy">
            <p className="eyebrow">Live tracking</p>
            <h2>See progress as you play</h2>
            <p>
              Track gains and losses throughout the day. Statly keeps a running tally so you always know how
              the session is trending before you call it.
            </p>
            <ul className="statly__list">
              <li>Session-based rank points.</li>
              <li>Per-match performance snapshots.</li>
              <li>Alerts when you are close to a rank change.</li>
            </ul>
          </div>
        </section>

        <section className="statly__section">
          <div className="statly__cta-block">
            <h2>Roadmap</h2>
            <p>More games, richer analytics, team dashboards, and exportable reports are on the way.</p>
            <div className="statly__pillbox">
              <span className="statly__pill">More titles</span>
              <span className="statly__pill">Team summaries</span>
              <span className="statly__pill">Deeper trends</span>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Statly
