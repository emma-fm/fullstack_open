import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryInfo = ({data}) => {
  
  return (
    <div>
      <h1>{data.name.common}</h1>
      <div>
        <p>capital {data.capital[0]}</p>
        <p>area {data.area}</p>
      </div>
      <div>
        <h2>languages:</h2>
        <ul>
          {Object.entries(data.languages).map((l) => <li key={l[0]}>{l[1]}</li>)}
        </ul>
      </div>
      <div>
        <img src={data.flags.png} />
      </div>

    </div>
  )
}

const SearchBar = ({onSearch}) => {
  
  return(
  <div>
    <form>
      find countries <input onChange={onSearch}></input>
    </form>
  </div>
  )
}

const SearchResult = ({result}) => {

  if (result.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (result.length > 1) {
    return (
      <div>
        <ul>
          {result.map(r => <li key={r.cca3}>{r.name.common}</li>)}
        </ul>
      </div>
    )
  }

  if (result.length == 1) {
    return (
      <div>
        <CountryInfo data={result[0]} />
      </div>
    )
  }

  return (
    <div>
      No data matches search query
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [result, setResult] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleOnSearch = (value) => {
    const match = countries.filter((c) => c.name.common.toLowerCase().includes(value.toLowerCase()))

    setResult(match)
  }

  return (
    <div>
      <SearchBar onSearch={(ev) => handleOnSearch(ev.target.value)}/>
      <SearchResult result={result}/>
    </div>
  )
}

export default App
