import { useState, useEffect } from "react";
import "./App.css";
import search from "./assets/icons/search.png";
import { useStateContext } from "./Context";
import { useDate } from "./Utils/useDate.jsx";
import { BackgroundLayout, WeatherCard, MiniCard } from "./Components";

function App() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const { weather, thisLocation, values, setPlace, cityList, fetchCountries, loading, dateTime } = useStateContext();
  const { time } = useDate({ dateTime });

  useEffect(() => {
    if (input.length > 0) {
      fetchCountries(input);
    } else {
      setSuggestions([]);
    }
  }, [input, fetchCountries]);

  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedFetch = debounce((value) => {
    if (value.length > 0) {
      const filteredCountries = cityList
        .filter((country) =>
          country.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 10);
      setSuggestions(filteredCountries);
    } else {
      setSuggestions([]);
    }
  }, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedFetch(value);
  };

  const handleSuggestionClick = (city) => {
    setInput(city);
    submitCity(city);
  };

  const submitCity = (city) => {
    setPlace(city);
    setInput("");
    setSuggestions([]);
  };

  useEffect(() => {
    if (
      weather.temp &&
      time &&
      !selectedCities.some((c) => c.name === thisLocation)
    ) {
      setSelectedCities([
        ...selectedCities,
        {
          name: thisLocation,
          time: time,
          temp: weather.temp,
        },
      ]);
    }
  }, [weather, time, thisLocation]);

  const removeCity = (city) => {
    setSelectedCities(selectedCities.filter((c) => c.name !== city));
  };
  
  return (
    <div className="w-full h-screen text-white px-8">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">Weather App</h1>
        <div className="relative">
          <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
            <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
            <input
              type="text"
              placeholder="Search city"
              className="focus:outline-none w-full text-[#212121] text-lg"
              value={input}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  submitCity(input);
                }
              }}
            />
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute bg-[#85929e] w-[15rem] shadow-lg rounded mt-1 max-h-40 overflow-auto z-[10]">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      <BackgroundLayout></BackgroundLayout>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-2xl">Loading...</p>
        </div>
      ) : (
        <>
          {selectedCities.length > 0 && (
            <section className="w-full max-w-2xl mx-auto mt-6">
              <h2 className="text-2xl font-bold mb-4">City List</h2>
              <ul className="bg-gray-800 p-4 rounded-lg shadow-lg">
                {selectedCities.map((city, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 border-b border-gray-600"
                  >
                    <span>
                      {city.name} | {city.time} | temp {city.temp}°C
                    </span>
                    <button
                      className="bg-red-500 px-3 py-1 rounded"
                      onClick={() => removeCity(city.name)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
            <WeatherCard
              place={thisLocation}
              windspeed={weather.wspd}
              humidity={weather.humidity}
              temperature={weather.temp}
              heatIndex={weather.heatindex}
              iconString={weather.conditions}
              conditions={weather.conditions}
            />

            <div className="flex justify-center gap-8 flex-wrap w-[60%]">
              {values?.slice(1, 7).map((curr) => {
                return (
                  <MiniCard
                    key={curr.datetime}
                    time={curr.datetime}
                    temp={curr.temp}
                    iconString={curr.conditions}
                  />
                );
              })}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
