import React from "react"
import "./services.css"
import {BiCheck} from "react-icons/bi"

const Services = () => {
  return (
    <section id="services">

      <h5>What I Can Do</h5>
      <h6>(at this point i think we understand that i develop code)</h6>
      <h2>Services</h2>

      <div className="container services__container">

        <article className="service">

          <div className="service__head">

            <h3>UI/UX Design</h3>

          </div>

          <ul className="service__list">

            <li>
              <BiCheck className="service__list-icon"/>
              <p> I get along with photo editing </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> I have some experience (and curses) with the use of After Effects </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> Nothing more (actually I'll delegate everything to my graphic designer friend hehe) </p>
            </li>

          </ul>

        </article> {/*first*/}

        <article className="service">

          <div className="service__head">

            <h3>Web Development</h3>

          </div>

          <ul className="service__list">

            <li>
              <BiCheck className="service__list-icon"/>
              <p> I could develop a fantastic hello world ! </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> I can build a nice flowchart !! </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> Apparte gli scherzi, I can develop a web application, complete with db </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> I can develop Java software </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> Working with APIs </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> And so on! </p>
            </li>

          </ul>

        </article> {/*second*/}

        <article className="service">

          <div className="service__head">

            <h3>other stuff</h3>

          </div>

          <ul className="service__list">

            <li>
              <BiCheck className="service__list-icon"/>
              <p> play rl with you if you have no friends </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> play r6 with you, only if you don't use montagne/tachanka </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> idk, build a fpv drone </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> set up a server easily at home (this is cool) </p>
            </li>
            <li>
              <BiCheck className="service__list-icon"/>
              <p> or assemble a computer, only if you don't give me a 3090, otherwise I feel poor </p>
            </li>

          </ul>

        </article> {/*third*/}

      </div>

    </section>
  )
}

export default Services