import { useState, useEffect } from 'react'
import { fetchWeather } from './api/fetchWeather'

const App = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    setTimeout(async () => {
      const data = await fetchWeather('Oslo')
      setWeather(data)
      setIsPending(false)
    }, 1000)
  }, [])

  const search = async (e) =>{
    if (city.trim() === '') return
    if (e.key === 'Enter') {
      try {
        const data = await fetchWeather(city)
        console.log(data)
        setWeather(data)
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
        { weather.main ? (
          <>
            <div className="content__city">
              <p className="city-name">{ weather.name }</p>
              <span className="city-label">{ weather.sys.country }</span>
            </div>
            <h3 className="city-temp">{ parseInt(weather.main.temp, 10) }</h3>
            <p className="city-weather-description">{ weather.weather[0].description }</p>
          </>
        ) : '' }
      </div>
    </div>
  )
}

export default App
