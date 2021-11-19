import React, { useState, useEffect, useRef } from 'react';
import './style.css';
export default function App() {
  const cityNameRef = useRef(null);

  const [cityName, setCityName] = useState('visakhapatnam');
  const [weather, setWeather] = useState('');
  const [coord, setCoord] = useState('');
  const [country, setCountry] = useState('');

  const getWeather = (e) => {
    e.preventDefault();
    setCityName(cityNameRef.current.value);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=272e9f9dd7554dde325dd9c58422cd78`
      );

      const resdata = await res.json();

      setWeather(resdata.main);
      setCoord(resdata.coord);
      setCountry(resdata.sys);
    };
    fetchWeather();
  }, [cityName]);

  const tempConverter = (temp) => {
    const celcius = Math.round(((temp - 32) * 5) / 9);
    const supStr = 'c';
    const celciusFor = celcius + ' ' + supStr;
    return celciusFor;
  };

  return (
    <>
      <div className="form_wrap">
        <form className=" text-center ">
          <div className=" search_box">
            <input placeholder="Enter City " ref={cityNameRef} />
            <button className="btn btn-success" onClick={getWeather}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
        <div className="data_box row text-center ">
          <div className="col-md-4">
            <h4>
              <i class="fa fa-globe" aria-hidden="true"></i>&nbsp; Country:{' '}
              {country.country}
            </h4>
            <h4>
              <i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;City:{' '}
              {cityName}
            </h4>
          </div>
          <div className="col-md-4">
            <h4>
              <i class="fa fa-empire" aria-hidden="true"></i>&nbsp; Temp:{' '}
              {tempConverter(weather.temp)}
            </h4>
            <h4>
              <i class="fa fa-linux" aria-hidden="true"></i>&nbsp;Feel Like:{' '}
              {tempConverter(weather.feels_like)}{' '}
            </h4>
          </div>
          <div className="col-md-4">
            <h4>
              <i class="fa fa-tint" aria-hidden="true"></i>&nbsp; Humidity:{' '}
              {weather.humidity}
            </h4>
            <h4>long: {coord.lon}</h4>
            <h4>lat: {coord.lon}</h4>
          </div>
        </div>
      </div>
      <div className="image img-responsive">
        <img src="https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
      </div>
    </>
  );
}
