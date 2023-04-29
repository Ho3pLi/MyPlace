import React from "react"
import "./post_4.css"
import Giscus from "../giscus/Giscus"
import POST4 from "../../assets/MyFourthPostBn.png"
import ME from "../../assets/Me_square.jpg"
import {useNavigate} from "react-router-dom"

const Post_4 = () => {

  let navigate = useNavigate()

  return (
    <div className="container post__container">

      <a href="/" onClick={() => {navigate("/")}} className="nothing"><h1 className="">$<a className="blinkItem">_</a> Daniele's Blog</h1></a>
      
      <div className="post__banner">

        <img src={POST4} alt="MyFourthPost" />

      </div>

      <div className="post__header">

      <small>April 29, 2023 • 2 min{/* TO-DO: devo mettere il coso del caffè */}</small>
      <h2>Update 04/2023</h2>
      
      </div>

      <div className="post__content">

        <p>Hello everyone and welcome back to my blog!

            <br />

            For those who don't know me, my name is Daniele Barile and I aspire to become an excellent Full Stack Developer.

            <br />

            Today I'm so happy to announce that my first Android app is online!

            <br />

            I don't want to go into explaining what it is, as that is not the purpose of this article.  
            
            <br />
            
            I'll just leave you the links to the download from Google Play (https://play.google.com/store/apps/details?id=com.internet_checker).

            <br />
            
            These past two months have been very productive, besides the release of my app I have also developed a discord bot. Mainly because i had a need and i couldn't find anything on the net that could help me.
            
            <br />
            
            The bot in question allows you to control an Aternos server (Minecraft) directly from Discord, without having to go to the dedicated dashboard having to open a browser.
            
            <br />
            
            For those who are curious, I leave the link to the repository in the post button. For those who want to use the bot instead, just look for it on top.gg with the name "AternoServerController".
            
            <br />
            
            Beyond this I have some projects in mind, which maybe I'll tell you about later.
            
            <br />
            
            Stay tuned to receive all the updates!

            <br />

            That's all for today gentlemen :)

            <br />

            Happy coding :)
          
        </p>

        <hr />

        <img src={ME} alt="Me" className="MeFooterBlog"/> <p className="post__footer">Personal blog of Daniele Barile. I'm a fullstack developer, i also have a strong interest in cybersecurity and pentesting.</p>

        <div className="comments"><Giscus/></div>

      </div>
      
      <div className="next_previous">

      <a href="/Blog/Update022023" onClick={() => {navigate("/Blog/Update022023")}} className="post__link-previous">← Previous</a>

      <a href="/notfound" onClick={() => {navigate("/notfound")}} className="post__link-next">Next →</a>

      </div>

    </div>
  )
}

export default Post_4