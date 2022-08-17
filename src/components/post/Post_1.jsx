import React from "react"
import "./post_1.css"
import Giscus from "../giscus/Giscus"
import POST1 from "../../assets/MyFirstPostBn.png"
import ME from "../../assets/Me_square.jpg"
import {useNavigate} from "react-router-dom"

const Post_1 = () => {

  let navigate = useNavigate()

  return (
    <div className="container post__container">

      <a href="/" onClick={() => {navigate("/")}} className="nothing"><h1 className="">$<a className="blinkItem">_</a> Daniele's Blog</h1></a>
      
      <div className="post__banner">

        <img src={POST1} alt="MyFirstPost" />

      </div>

      <div className="post__header">

      <small>August 11, 2022 • 1 min{/* TO-DO: devo mettere il coso del caffè */}</small>
      <h2>My first post!</h2>
      
      </div>

      <div className="post__content">

        <p>Hi, welcome to my blog. My name's Daniele Barile and I aspire to become an excellent Fullstack Developer. 
        I'd say that I'm still "at the beginning" but actually I've got 4 years of experience in application development.
        I'm interested almost in everything: client development, server development, frontend, and backend.
        I like to improve myself and to play with unknown technologies.
        In this blog I'll publish articles of any kind, all about (or almost) what wanders in my head.
        This site was my first experiment with ReactJS (very interesting);  if you want to take a look at the code, you can find a button in the article preview that will bring you to the repo.
        At this point, I think I've said it all for now.
        Happy coding :)
        </p>

        <hr />

        <img src={ME} alt="Me" className="MeFooterBlog"/> <p className="post__footer">Personal blog of Daniele Barile. I'm a fullstack developer, i also have a strong interest in cybersecurity and pentesting.</p>

        <div className="comments"><Giscus/></div>

        <a href="/" onClick={() => {navigate("/")}} className="post__link-next">Next →</a>

      </div>

    </div>
  )
}

export default Post_1