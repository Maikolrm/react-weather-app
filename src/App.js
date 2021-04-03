import { useState, useEffect } from 'react'
import { fetchWeather } from './api/fetchWeather'

const App = () => {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [isPending, setIsPending] = useState(true)

  function cleanData(data) {
    return {
      cityName: data.name,
      country: data.sys.country,
      temp: parseInt(data.main.temp, 10),
      description: data.weather[0].description
    }
  }

  useEffect(() => {
    setTimeout(async () => {
      const data = await fetchWeather('Oslo')
      setWeather(cleanData(data))
      setIsPending(false)
    }, 1000)
  }, [])

  const search = async (e) =>{
    if (e.key === 'Enter') {
      if (city.trim() === '') return
      try {
        const data = await fetchWeather(city)
        setWeather(cleanData(data))
        setCity('')
      } catch (e) { console.log(e) }
    }
  }

  return (
    <div className="main">
      <input
        className="main__element main__search-box"
        name="weather"
        placeholder="Buscar...."
        value={city}
        onChange={e => setCity(e.target.value)}
        onKeyPress={search}
        autoComplete="off"
      />
      <div className="main__element main__content">
        { isPending ? (
          <div className="loader">
            <div className="loader__center"></div>
          </div>
        ) : '' }
        { weather.cityName ? (
          <>
            <div className="content__city">
              <p className="city-name">{ weather.cityName }</p>
              <span className="city-label">{ weather.country }</span>
            </div>
            <h3 className="city-temp">{ weather.temp }</h3>
            <p className="city-weather-description">{ weather.description }</p>
          </>
        ) : '' }
      </div>
    </div>
  )
}

export default App
