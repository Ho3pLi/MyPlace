import React from "react"
import "./post_3.css"
import Giscus from "../giscus/Giscus"
import POST2 from "../../assets/MyThirdPostBn.png"
import ME from "../../assets/Me_square.jpg"
import {useNavigate} from "react-router-dom"

const Post_3 = () => {

  let navigate = useNavigate()

  return (
    <div className="container post__container">

      <a href="/" onClick={() => {navigate("/")}} className="nothing"><h1 className="">$<a className="blinkItem">_</a> Daniele's Blog</h1></a>
      
      <div className="post__banner">

        <img src={POST2} alt="MyThirdPost" />

      </div>

      <div className="post__header">

      <small>February 04, 2023 • 3 min{/* TO-DO: devo mettere il coso del caffè */}</small>
      <h2>Update 02/2023</h2>
      
      </div>

      <div className="post__content">

        <p>Hello everyone and welcome back to my blog!

            <br />

            For those who don't know me, my name is Daniele Barile and I aspire to become an excellent Full Stack Developer.

            <br />

            I haven't posted any updates on the development of the mobile app I had in mind for too long.

            <br />

            And here's a big update on the situation:
            
            <br />
            
            after a long analysis I decided to shelve the development of that app, in favor of another one that is now in the testing phase.
            
            <br />
            
            A first release has been made.
            
            <br />
            
            Internal and open tests are currently underway on the Google Play Store. 😄
            
            <br />
            
            I can't wait to release it to the public!

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

      <a href="/Blog/HotShare" onClick={() => {navigate("/Blog/HotShare")}} className="post__link-previous">← Previous</a>

      <a href="/Blog/Update042023" onClick={() => {navigate("/Blog/Update042023")}} className="post__link-next">Next →</a>

      </div>

    </div>
  )
}

export default Post_3