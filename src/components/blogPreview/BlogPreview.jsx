import React from 'react'
import './blogPreview.css'
import Data from '../blog/Data'

const BlogPreview = () => {
  return (
    <section id='blogPreview'>
    
     <h5>My Recent Post</h5>
     <h6>(yea i also have a blog, check it out!)</h6>
     <h2>Blog</h2>

     <div className="container blogPreview__container">

      {

        Data.map(({id, image, title, github, gitlab}) => {

          return(

            <article key={id} className='blogPreview__item'>

              <div className="blogPreview__item-image">
              
                <img src={image} alt={title} />
                
              </div>

              <h3>{title}</h3>

              <div className="blogPreview__item-cta">

                <a href={github} className='btn' target='_blank'>Github</a>
                <a href={gitlab} className='btn btn-primary' target='_blank'>Gitlab</a>

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