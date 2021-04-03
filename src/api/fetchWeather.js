import axios from 'axios'

export const fetchWeather = async (cityName) => {
  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: cityName,
        units: 'metric',
        appid: 'f33a484cf794d08d0148764789aaba32'
      }
    }
  )
  return data
}
