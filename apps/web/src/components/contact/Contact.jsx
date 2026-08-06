import React from "react"
import "./contact.css"
import {MdOutlineEmail} from "react-icons/md"
import {AiOutlineLinkedin} from "react-icons/ai"
import { useRef, useState } from "react"
import emailjs from "emailjs-com"

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
}


const Contact = () => {

  const form = useRef()
  const [status, setStatus] = useState("")

  const sendEmail = (e) => {
    e.preventDefault()

    const { serviceId, templateId, publicKey } = emailConfig

    if (!serviceId || !templateId || !publicKey) {
      setStatus("Email service is not configured.")
      return
    }

    setStatus("Sending...")

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setStatus("Message sent.")
        e.target.reset()
      }, () => {
        setStatus("Unable to send the message. Please try again later.")
      })
  }

  return (
    <section id="contact">

      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">

        <div className="contact__options">

          <article className="contact__option">

            <MdOutlineEmail className="contact__option-icon"/>
            <h4>Email</h4>
            <h5>daniele.barile@mylifeblike.com</h5>
            <a href="mailto:daniele.barile@mylifeblike.com">Send a message</a>

          </article>

          <article className="contact__option">

            <AiOutlineLinkedin className="contact__option-icon"/>
            <h4>LinkedIn</h4>
            <h5>Daniele Barile</h5>
            <a href="https://www.linkedin.com/in/danielebarile/" target="_blank" rel="noreferrer">Send a message</a>
            
          </article>

        </div>

        <form ref={form} onSubmit={sendEmail}>

          <input type="text" name="name" placeholder="Your Full Name" required/>
          <input type="email" name="email" placeholder="Your Email" required/>
          <textarea name="message" rows="7" placeholder="Your Message" required></textarea>
          <button type="submit" className="btn btn-primary">Send</button>
          {status && <p className="text-light">{status}</p>}

        </form>

      </div>

    </section>
  )
}

export default Contact
