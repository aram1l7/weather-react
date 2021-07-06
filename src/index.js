import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
const api = {
  key: "c1c68865ac86ffd7f6886b1b61feeb64",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [weather, setWeather] = useState({});
  const [search, setSearch] = useState("");

  const searchCountries = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setSearch("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`;
  };
  const inputChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={typeof weather.main != "undefined" ? (weather.main.temp > 16 ? "app sun" : "app") : "app"}>
      <main>
        <div className="search-box">
          <input onKeyPress={searchCountries} value={search} onChange={inputChange} type="text" placeholder="Enter country/city" className="search-bar" />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="country">
              <div className="country-name">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-data">
              <div className="celcius">{Math.round(weather.main.temp)}°C</div>
              <div className="weather-type">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
