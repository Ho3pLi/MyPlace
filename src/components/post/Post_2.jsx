import React from "react"
import "./post_2.css"
import Giscus from "../giscus/Giscus"
import POST2 from "../../assets/MySecondPostBn.png"
import ME from "../../assets/Me_square.jpg"
import {useNavigate} from "react-router-dom"

const Post_2 = () => {

  let navigate = useNavigate()

  return (
    <div className="container post__container">

      <a href="/" onClick={() => {navigate("/")}} className="nothing"><h1 className="">$<a className="blinkItem">_</a> Daniele's Blog</h1></a>
      
      <div className="post__banner">

        <img src={POST2} alt="MySecondPost" />

      </div>

      <div className="post__header">

      <small>August 28, 2022 • 1 min{/* TO-DO: devo mettere il coso del caffè */}</small>
      <h2>HotShare</h2>
      
      </div>

      <div className="post__content">

        <p>Hello everyone and welcome back to my blog!

          <br />

          For those who don't know me, my name is Daniele Barile and I aspire to become an excellent Full Stack Developer.

          <br />

          I'm here today writing this post to announce the start of development of my first Flutter app, HotShare!

          <br />

          For now I can't tell you or reveal much yet, but I promise you it will be fantastic!

          <br />

          Stay tuned to receive all the updates!

          <br />

          Happy coding :)
          
        </p>

        <hr />

        <img src={ME} alt="Me" className="MeFooterBlog"/> <p className="post__footer">Personal blog of Daniele Barile. I'm a fullstack developer, i also have a strong interest in cybersecurity and pentesting.</p>

        <div className="comments"><Giscus/></div>

      </div>
      
      <div className="next_previous">

      <a href="/Blog/buymeanr6please" onClick={() => {navigate("/Blog/buymeanr6please")}} className="post__link-previous">← Previous</a>

      <a href="/notfound" onClick={() => {navigate("/notfound")}} className="post__link-next">Next →</a>

      </div>

    </div>
  )
}

export default Post_2