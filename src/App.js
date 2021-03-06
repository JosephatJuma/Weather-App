import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import background_img from "./img/bg.jpg";

const api_key = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "922c60e5c41e269a109d4ce1a978f327",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [isSearch, setIsSearch] = useState(true);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `${api_key.base}weather?q=${query}&units=metric&APPID=${api_key.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);

          console.log(result);
          setIsSearch(false);
        });
      console.log(query);
    }
  };

  const useDevicePosition = (evt) => {
    const location = "Kampala";
    if (evt.key === "Enter") {
      setQuery(location);
      fetch(
        `${api_key.base}weather?q=${query}&units=metric&APPID=${api_key.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);

          console.log(result);
          setIsSearch(false);
        });
      console.log(location);
    }
  };
  return (
    <div className="wrapper">
      <header>
        <Header
          title="Weather App"
          isSearch={isSearch}
          goBack={() => setIsSearch(true)}
        />
      </header>
      <div className="input-part">
        <Search
          searchTerm={query}
          onSearch={search}
          getSearch={(e) => setQuery(e.target.value)}
          isSerach={isSearch}
          getCurrentLocation={useDevicePosition}
        />
      </div>
      <div className="weather-part">
        {!isSearch ? (
          typeof weather.main != "undefined" ? (
            <div className="weather">
              <div className="active">
                <div className="location">
                  <p>{weather.name}</p>,<br />
                  <p>{weather.sys.country}</p>
                </div>
                <div>
                  <p>Speed of wind: {weather.wind.speed}</p>
                </div>
                <div className="temp">{weather.main.temp}??C</div>
              </div>
            </div>
          ) : (
            <div className="location">
              <p>City not identified</p>
            </div>
          )
        ) : (
          " "
        )}
      </div>
    </div>
  );
}

export default App;

// const arr = {
//   Objectbase: "stations",
//   clouds: { all: 87 },
//   cod: 200,
//   coord: { lon: 34.4509, lat: 1.3965 },
//   dt: 1654518791,
//   id: 232235,
//   main: { temp: 21.5, feels_like: 21.12, temp_min: 21.5, temp_max: 21.5, pressure: 1011,????? },
//   name: "Kapchorwa",
//   sys: { country: 'UG', sunrise: 1654486503, sunset: 1654530414 },
//   timezone: 10800,
//   visibility: 10000,
//   weather: [{??? }],
//   wind: { speed: 1.14, deg: 215, gust: 3.21 },
//   [[Prototype]]: Object
// }
