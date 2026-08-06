import React from "react"
import { Link } from "react-router-dom"
import "./error.css"

const Error = () => {
  return (
    <main className="errorPage">
      <Link className="errorHomeLink" to="/">Home</Link>
      <div className="errorCopy">
        <span className="errorMeta">404</span>
        <h1>Page not found</h1>
        <p className="errorLead">
          Try something else.
        </p>
        <p className="errorHint">(try to find the easter egg)</p>
        <p className="errorEgg">if you are looking for a hidden thing, it is not here</p>
        <small className="errorEgg">o forse è proprio questa, chissà</small>
      </div>
    </main>
  )
}

export default Error
