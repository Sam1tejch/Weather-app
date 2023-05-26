import React, { useState } from 'react';
import { TiWeatherNight, TiWeatherSunny } from 'react-icons/ti';
import './Weather.css';


export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [lastcity, setlastCity] = useState('');
  
  

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const getDayOrNightIcon = () => {
    if (weatherData && weatherData.current && weatherData.current.is_day ===  1) {
      return <TiWeatherSunny />;
    }
    return <TiWeatherNight />;
  };

  var formattedDateTime = '';

if(weatherData && weatherData.localtime )
{
const inputDateTime = weatherData.location.localtime;
const dateObj = new Date(inputDateTime);
formattedDateTime = dateObj.toLocaleString("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
}



  const handleSubmit = (event) => {
    setlastCity(city);
    event.preventDefault();
    if (city.trim() !== '') {
      const url = "https://api.weatherapi.com/v1/current.json?key=a38b08d6d6b7432dbb5202225232505&q=" + city + "&aqi=no";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data);
          return data;
        })
        .catch((error) => {
         alert(error);
        });
    }
  };

  return (
    <>
      <div class="app-wrap">

        <header>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter city name" value={city} onChange={handleCityChange} />
            <button type="submit">Get Weather</button>
          </form>
        </header>

        {weatherData && weatherData.error && (<main>
             <div class="current">
               <div class="weather">City not found. Please enter a valid city name.</div>
             </div> 
           </main>)}
        {weatherData && weatherData.location &&  (
            
             <main>
             <section class="location">
               <div class="city">{lastcity.charAt(0).toUpperCase() + lastcity.slice(1)}, {weatherData.location.country}</div>
               <div class="date">{formattedDateTime} {getDayOrNightIcon()}</div>
               
             </section>
             <div class="current">
               <div class="temp">{weatherData.current.temp_c}<span>°c</span></div>
               <div class="weather">{weatherData.current.condition.text}</div>
               <div class="weather">Feels like {weatherData.current.feelslike_c} °c</div>
             </div> 
           </main>
          )}
       
      </div>
    </>
  );
}


