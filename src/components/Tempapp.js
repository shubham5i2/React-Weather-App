import { useEffect, useState } from "react";
import "./css/style.css";

require("dotenv").config();

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [wind, setWind] = useState(null);
  const [countrycode, setCountryCode] = useState(null);
  const [cordinates, setCordinates] = useState(null);
  const [search, setSearch] = useState("Visakhapatnam");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setCity(data.main);
      setWeather(data.weather);
      setWind(data.wind);
      setCountryCode(data.sys);
      setCordinates(data.coord);
    };

    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            placeholder="Enter city name..."
            className="inputField"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="sun-icon">
          <h1>
            <i className="fa fa-sun"></i> Sunshine - Weather App
          </h1>
        </div>

        {!city ? (
          <p className="errorMsg">No data found 😢</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <i className="fa fa-street-view"></i>
                {search}
              </h2>
              <h3 className="temp">{city.temp}°Cel</h3>
              <h3 className="tempmin_max">
                Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel
              </h3>
              <h3 className="feels-like">Feels like {city.feels_like}°Cel</h3>
              <h3 className="humidity">Humidity : {city.humidity}%</h3>
              {weather ? (
                <h3 className="weatherdesc">
                  Weather Description : {weather[0].description}
                </h3>
              ) : null}
              {wind ? (
                <h3 className="wind-speed">
                  Wind Speed : {(wind.speed * 3.6).toFixed(2)} kmph /{" "}
                  {wind.speed} mps
                </h3>
              ) : null}
              {countrycode ? (
                <h3 className="country-code">
                  Country Code : {countrycode.country}
                </h3>
              ) : null}
              {cordinates ? (
                <h3 className="cordinates">
                  Longitude : {cordinates.lon} | Latitude : {cordinates.lat}
                </h3>
              ) : null}
            </div>
            <div className="wave"></div>
          </div>
        )}
      </div>
      <div className="crafted">
        <h3>Crafted with ❤️ by Shubham 😄</h3>
      </div>
    </>
  );
};

export default Tempapp;
