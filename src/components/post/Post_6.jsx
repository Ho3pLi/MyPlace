import React from "react"
import "./post_6.css"
import Giscus from "../giscus/Giscus"
import POST6 from "../../assets/MySixthPostBn.svg"
import ME from "../../assets/Me_square.jpg"
import { useNavigate } from "react-router-dom"

const Post_6 = () => {
  const navigate = useNavigate()

  return (
    <div className="container post__container">
      <a href="/" onClick={() => { navigate("/") }} className="nothing">
        <h1>
          $<a className="blinkItem">_</a> Daniele's Blog
        </h1>
      </a>

      <div className="post__banner">
        <img src={POST6} alt="Two Years Later… Still Here banner" />
      </div>

      <div className="post__header">
        <small>October 1, 2025 • 4 min{/* TO-DO: add coffee icon */}</small>
        <h2>Two Years Later… Still Here!</h2>
      </div>

      <div className="post__content">
        <p>
          It has been a while—more than two years, in fact—since I last wrote here. The funny (and
          slightly embarrassing) part is that my previous post was all about how I didn&apos;t want to
          neglect this blog anymore.
          <br />
          <br />
          Life had other plans. Between work, cycling all around Milan, and the steady rhythm of my
          routines, the days slipped into months and, eventually, into years. On the surface it might
          look like nothing changed: I&apos;m in the same city, riding the same bike, and working the same
          job. But beneath that familiar surface I&apos;ve been busy growing.
          <br />
          <br />
          Over these twenty-four months I&apos;ve tackled new projects, expanded my skills, and taken on
          challenges I would have never imagined back in 2023. Each experience has pushed me forward,
          both professionally and personally, and it feels good to pause for a moment and recognize
          that progress.
          <br />
          <br />
          With so much going on, the blog kept getting pushed aside. Again. But here I am, ready to
          give it another shot and breathe a little life back into this space. Maybe this time the
          momentum will stick. Or maybe future me will circle back in another two years to write a
          similar post—let&apos;s hope not!
          <br />
          <br />
          Either way, it feels great to be back. Thanks for sticking around, and see you in the next
          update.
        </p>

        <hr />

        <img src={ME} alt="Daniele Barile" className="MeFooterBlog" />
        <p className="post__footer">
          Personal blog of Daniele Barile. I&apos;m a fullstack developer with a strong interest in
          cybersecurity and pentesting.
        </p>

        <div className="comments">
          <Giscus />
        </div>
      </div>

      <div className="next_previous">
        <a
          href="/Blog/UpdatePostSummer"
          onClick={() => { navigate("/Blog/UpdatePostSummer") }}
          className="post__link-previous"
        >
          ← Previous
        </a>
        <a
          href="/notfound"
          onClick={() => { navigate("/notfound") }}
          className="post__link-next"
        >
          Next →
        </a>
      </div>
    </div>
  )
}

export default Post_6
