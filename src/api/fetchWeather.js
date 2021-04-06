import axios from 'axios'
const appid = 'f33a484cf794d08d0148764789aaba32'

export const fetchWeather = async (cityName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appid}&units=metric`
      const response = await axios.get(url)
      const { data } = response
      resolve(data)
    } catch (e) { reject({}) }
  }) // PROMISE END
}
