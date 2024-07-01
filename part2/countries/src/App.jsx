import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryWeather = ({country}) => {
  //https://api.open-meteo.com/v1/forecast?latitude=60.3172&longitude=24.9633&current=temperature_2m
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState(0)

  useEffect(() => {
    axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[1]}&current=temperature_2m,wind_speed_10m&wind_speed_unit=ms`)
      .then(response => {
        setTemp(response.data.current.temperature_2m)
        setWind(response.data.current.wind_speed_10m)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return(
    <div>
      <h1>Weather in {country.capital}</h1>
      <p>temperature {temp} Celsius</p>
      <p>wind {wind} m/s</p>
    </div>
  )
}

const CountryInfo = ({country}) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
      </div>
      <div>
        <h2>languages:</h2>
        <ul>
          {Object.entries(country.languages).map((l) => <li key={l[0]}>{l[1]}</li>)}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} />
      </div>
      <CountryWeather country={country} />

    </div>
  )
}

const CountryItem = ({country, onShow}) => {
  
  return(
    <div>
      <li>{country.name.common} <button onClick={() => onShow(country.name.common)}>show</button></li>
    </div>
  )
}

const SearchBar = ({onSearch, search}) => {
  
  return(
  <div>
    <form>
      find countries <input onChange={onSearch} value={search}></input>
    </form>
  </div>
  )
}

const SearchResult = ({result, onShow}) => {

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
          {result.map(r => <CountryItem key={r.cca3} country={r} onShow={onShow}/>)}
        </ul>
      </div>
    )
  }

  if (result.length == 1) {
    return (
      <div>
        <CountryInfo country={result[0]} />
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
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const match = countries.filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))

    setResult(match)
  }, [search])


  return (
    <div>
      <SearchBar onSearch={(ev) => setSearch(ev.target.value)} search={search}/>
      <SearchResult result={result} onShow={(name) => setSearch(name)}/>
    </div>
  )
}

export default App
