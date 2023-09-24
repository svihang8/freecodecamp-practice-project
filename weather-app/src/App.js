import { useState, useEffect } from 'react';
import './App.css';
import 'axios';
import axios from 'axios';

function App() {
  // scale O --> celsius 1 --> farenheit
  const [scale, setScale] = useState({ 'id': 0, 'unit': 'C' })
  // weather data
  const [weather, setWeather] = useState({})
  const [error, setError] = useState({});
  const getWeatherData = (coords) => {
    // console.log(coords);
    try {
      const url = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${coords['lat']}&lon=${coords['lon']}`
      axios
        .get(url)
        .then(
          (res) => {
            setWeather(res.data)
            // console.log(weather['name']);
          }
        )
        .catch(
          (res) => {
            setError({ 'message': res.data['error'] })
          }
        )
    } catch (error) {
      setError({
        'error': error
      })
    }
  }

  const getCoordinates = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // console.log(pos);
          // console.log(pos.coords['latitude']);
          getWeatherData({
            'lat': pos.coords['latitude'],
            'lon': pos.coords['longitude'],
          });
        },
        (err) => {
          // console.log(err.message);
          setError({ 'message': err.message });
        }
      )
    } catch (error) {
      setError({
        'error': error,
      });
    }
  }

  const changeScale = (e) => {
    e.preventDefault();
    let curr = { ...scale };
    let weatherData = { ...weather };
    if (curr['id'] == 0) {
      weatherData['main']['temp'] = Math.round(weatherData['main']['temp'] * 9 / 5 + 32);
      curr['id'] = 1
      curr['unit'] = 'F'
    } else {
      weatherData['main']['temp'] = Math.round((weatherData['main']['temp'] - 32) * 5 / 9);
      curr['id'] = 0
      curr['unit'] = 'C'
    }
    setScale(curr);
    setWeather(weatherData);
    return;
  }

  useEffect(() => { getCoordinates(); }, []);

  return (
    <div className='App'>
      <h1>Free Code Camp Weather App</h1>
      {
        JSON.stringify(weather) !== '{}' &&
        <>
          <h3>{weather["name"]}</h3>
          <h3>
            {weather["main"]["temp"]}
            <a href='' onClick={changeScale}><span>&#176;</span>{scale['unit']}</a>
          </h3>
          <h3>{weather["weather"][0]["main"]}</h3>
          <img src={weather["weather"][0]["icon"]} alt={weather["weather"][0]["main"]} />
        </>
      }
      {
        JSON.stringify(error) !== '{}' &&
        <p>{error['message'] || 'server error'}</p>
      }
    </div>
  );
}

export default App;
