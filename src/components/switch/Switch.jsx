import React, { useState, useEffect }from 'react'
import "./switch.css"

const Switch = () => {

    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {

        setTheme((curr) => (curr === "light" ? "dark" : "light"))
    }

    useEffect(() => {document.documentElement.setAttribute("id", theme)}, [theme])

  return (

    <button onClick={(toggleTheme)} className="switch"></button>

  )
}

export default Switch