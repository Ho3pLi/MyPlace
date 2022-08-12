import React from "react"
import "./blogPreview.css"
import Data from "../blog/Data"
import {useNavigate} from "react-router-dom"

const BlogPreview = () => {

  let navigate = useNavigate()

  return (
    <section id="blogPreview">
    
     <h5>My Recent Post</h5>
     <h6 onClick={() => {navigate("/Blog")}}>(yea i also have a blog, check it out!)</h6>
     <h2>Blog</h2>

     <div className="container blogPreview__container">

      {

        Data.slice(-3).map(({id, image, title, github, read}) => {

          return(
            <article key={id} className="blogPreview__item">

              <div className="blogPreview__item-image">
              
                <img src={image} alt={title} />
                
              </div>

              <h3>{title}</h3>

              <div className="blogPreview__item-cta">

                <a href={read} className="btn btn-primary">Read</a>
                <a href={github} className="btn" target="_blank">Github</a>

              </div>

            </article>

          )

        })

      }

     </div>

    </section>
  )
}

export default BlogPreview