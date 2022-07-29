import React from 'react'
import './contact.css'
import {MdOutlineEmail} from 'react-icons/md'
import {AiOutlineLinkedin} from 'react-icons/ai'

const Contact = () => {
  return (
    <section id='contact'>

      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">

        <div className="contact__options">

          <article className='contact__option'>

            <MdOutlineEmail className='contact__option-icon'/>
            <h4>Email</h4>
            <h5>daniele.barile.lavoro@gmail.com</h5>
            <a href="mailto:daniele.barile.lavoro@gmail.com">Send a message</a>

          </article>

          <article className='contact__option'>

            <AiOutlineLinkedin className='contact__option-icon'/>
            <h4>LinkedIn</h4>
            <h5>Daniele Barile</h5>
            <a href="https://www.linkedin.com/in/danielebarile/" target="_blank">Send a message</a>
            
          </article>

        </div>

        <form action="">

          <input type="text" name="name" placeholder='Your Full Name' required/>
          <input type="email" name="email" placeholder='Your Email' required/>
          <textarea name="message" rows="7" placeholder='Your Message' required></textarea>
          <button type="submit" className='btn btn-primary'>Send</button>

        </form>

      </div>

    </section>
  )
}

export default Contact