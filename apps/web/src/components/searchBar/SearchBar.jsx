import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import "./searchBar.css"

const SearchBar = ({ placeholder = "Search", data = [], value = "", onChange }) => {
  const [term, setTerm] = useState(value)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setTerm(value)
  }, [value])

  const results = useMemo(() => {
    if (!term.trim()) {
      return []
    }

    const lowered = term.trim().toLowerCase()
    return data.filter((item) => item.title.toLowerCase().includes(lowered))
  }, [data, term])

  const handleChange = (event) => {
    const nextValue = event.target.value
    setTerm(nextValue)
    if (onChange) {
      onChange(nextValue)
    }
  }

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 150)
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={term}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
        <div className="searchIcon" aria-hidden="true">/</div>
      </div>

      {isFocused && term && (
        <div className="dataResult">
          {results.length > 0 ? (
            <ul>
              {results.map((item) => (
                <li key={item.id}>
                  <Link to={item.read}>{item.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="noResults">No results</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar