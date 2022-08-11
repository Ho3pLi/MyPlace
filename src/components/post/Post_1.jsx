import React from "react"
import "./post_1.css"
import POST1 from "../../assets/MyFirstPost.png"

function Post_1() {
  return (
    <div className="post__container">

      <div className="post__banner">

        <img src={POST1} alt="MyFirstPost" />

      </div>

      <h1>My first post!</h1>

      <div className="post__content">

        <p>Hi, welcome to my Blog, my name is Daniele Barile and I aspire to become an excellent Fullstack Developer. 
        I am still "in the beginning", I have just 4 years of experience in application development.
        I am interested in a little bit of everything, client development, server development, frontend and backend.
        I like to improve myself and "experiment" with unknown technologies.
        In this blog I will publish articles of all kinds, all (or almost) what goes through my head.
        This site was my first experiment with ReactJS, very interesting, if you want to take a look at the code, you can find a button in the article preview that will bring you back to the repo.
        That said, I think I've said it all for now.
        Happy coding :)
        </p>

      </div>

    </div>
  )
}

export default Post_1