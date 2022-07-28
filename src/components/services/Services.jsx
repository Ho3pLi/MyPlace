import React from 'react'
import './services.css'
import {BiCheck} from 'react-icons/bi'

const Services = () => {
  return (
    <section id='services'>

      <h5>What I Can Do</h5>
      <h6>(at this point i think we understand that i develop code)</h6>
      <h2>Services</h2>

      <div className="container services__container">

        <article className="service">

          <div className="service__head">

            <h3>UI/UX Design</h3>

          </div>

          <ul className='service__list'>

            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>

          </ul>

        </article> {/*first*/}

        <article className="service">

          <div className="service__head">

            <h3>Web Development</h3>

          </div>

          <ul className='service__list'>

            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>

          </ul>

        </article> {/*second*/}

        <article className="service">

          <div className="service__head">

            <h3>other stuff</h3>

          </div>

          <ul className='service__list'>

            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>
            <li>
              <BiCheck className='service__list-icon'/>
              <p> irdgas </p>
            </li>

          </ul>

        </article> {/*third*/}

      </div>

    </section>
  )
}

export default Services