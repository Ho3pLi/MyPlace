import React from 'react'
import './blog.css'
import POST from '../../assets/blog-post.jpg'

const Blog = () => {
  return (
    <section id='blog'>
    
     <h5>My Recent Post</h5>
     <h6>(yea i also have a blog, check it out!)</h6>
     <h2>Blog</h2>

     <div className="container blog__container">

      <article className='blog__item'>

        <div className="blog__item-image">
          <img src={POST} alt="" />
        </div>

        <h3>This is a post title</h3>

          <div className="blog__item-cta">

            <a href="https://github.com" className='btn' target='_blank'>Github</a>
            <a href="https://gitlab.com" className='btn btn-primary' target='_blank'>Gitlab</a>

          </div>

      </article>
      <article className='blog__item'>

        <div className="blog__item-image">
          <img src={POST} alt="" />
        </div>

        <h3>This is a post title</h3>

          <div className="blog__item-cta">

            <a href="https://github.com" className='btn' target='_blank'>Github</a>
            <a href="https://gitlab.com" className='btn btn-primary' target='_blank'>Gitlab</a>

          </div>

      </article>
      <article className='blog__item'>

        <div className="blog__item-image">
          <img src={POST} alt="" />
        </div>

        <h3>This is a post title</h3>

          <div className="blog__item-cta">

            <a href="https://github.com" className='btn' target='_blank'>Github</a>
            <a href="https://gitlab.com" className='btn btn-primary' target='_blank'>Gitlab</a>

          </div>

      </article>
      <article className='blog__item'>

        <div className="blog__item-image">
          <img src={POST} alt="" />
        </div>

        <h3>This is a post title</h3>

          <div className="blog__item-cta">

            <a href="https://github.com" className='btn' target='_blank'>Github</a>
            <a href="https://gitlab.com" className='btn btn-primary' target='_blank'>Gitlab</a>

          </div>

      </article>
      <article className='blog__item'>

        <div className="blog__item-image">
          <img src={POST} alt="" />
        </div>

        <h3>This is a post title</h3>

          <div className="blog__item-cta">

            <a href="https://github.com" className='btn' target='_blank'>Github</a>
            <a href="https://gitlab.com" className='btn btn-primary' target='_blank'>Gitlab</a>

          </div>

      </article>
      <article className='blog__item'>

        <div className="blog__item-image">
          <img src={POST} alt="" />
        </div>

        <h3>This is a post title</h3>

          <div className="blog__item-cta">

            <a href="https://github.com" className='btn' target='_blank'>Github</a>
            <a href="https://gitlab.com" className='btn btn-primary' target='_blank'>Gitlab</a>

          </div>

      </article>

     </div>

    </section>
  )
}

export default Blog