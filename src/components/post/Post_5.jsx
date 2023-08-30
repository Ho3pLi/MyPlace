import React from "react"
import "./post_5.css"
import Giscus from "../giscus/Giscus"
import POST5 from "../../assets/MyFifthPostBn.png"
import ME from "../../assets/Me_square.jpg"
import {useNavigate} from "react-router-dom"

const Post_5 = () => {

  let navigate = useNavigate()

  return (
    <div className="container post__container">

      <a href="/" onClick={() => {navigate("/")}} className="nothing"><h1 className="">$<a className="blinkItem">_</a> Daniele's Blog</h1></a>
      
      <div className="post__banner">

        <img src={POST5} alt="MyFifthPost" />

      </div>

      <div className="post__header">

      <small>August 30, 2023 • 7 min{/* TO-DO: devo mettere il coso del caffè */}</small>
      <h2>Am I neglecting my site?</h2>
      
      </div>

      <div className="post__content">

        <p>Hello everyone and welcome back to my blog!

            <br />

            For those who don't know me, my name is Daniele Barile and I aspire to become an excellent Full Stack Developer.

            <br />

            Yes. I acknowledge that I have been neglecting my site for the past few months.

            <br />

            I recently noticed it and I don't like it, I want to try to keep it updated as much as possible.

            <br />
            
            Hoping you accept my "apologies", here are the updates of the last months!

            <br />
            
            My app has had a lot of success! (sike). In reality I was thinking of doing a mini advertising campaign but I don't know how to do it and I will inform myself.            
            
            <br />
            
            At the beginning of summer, almost a year after I moved here to Milan, I bought a motorcycle!

            <br />
            
            In addition to the passion for information technology I have a huge passion for motorcycles :)

            <br />
            
            It's a Yamaha R7, and I love it.

            <br />

            My summer was very quiet, i traveled a lot around Italy by my R7 with my girlfriend and it was very nice. (check my insta and tiktok)
            
            <br/>

            As always, I have some projects in mind and some work in progress, now that September begins I'm very excited to get back on track!

            <br/>

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

      <a href="/Blog/Update042023" onClick={() => {navigate("/Blog/Update042023")}} className="post__link-previous">← Previous</a>

      <a href="/notfound" onClick={() => {navigate("/notfound")}} className="post__link-next">Next →</a>

      </div>

    </div>
  )
}

export default Post_5