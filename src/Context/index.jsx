import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Thailand");
  const [thisLocation, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityList, setCountryList] = useState([]);
  const [dateTime, setCurrentDateTime] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: 0,
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const thisData = Object.values(response.data.locations)[0];
      
      if (thisData) {
        setLocation(thisData.address);
        setValues(thisData.values);
        setWeather(thisData.values[0]);

        if (thisData.currentConditions?.datetime) {
            setCurrentDateTime(thisData.currentConditions.datetime);
        }
      } else {
        console.error("No data found for the specified location");
        alert("This place does not exist");
      }
    } catch (e) {
      console.error(e);
      alert("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async (searchTerm) => {
    if (!searchTerm) {
      setCountryList([]);
      return;
    }

    const API_URL = `https://restcountries.com/v3.1/name/${searchTerm}`;

    try {
      const response = await axios.get(API_URL);
      if (response.data) {
        const filteredCountries = response.data.map(
          (country) => country.name.common
        );
        setCountryList(filteredCountries);
      } else {
        console.warn("No country data found.");
      }
    } catch (e) {
      console.error("API Request Error:", e);
      alert("Error fetching country data. Please try again.");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
        cityList,
        fetchCountries,
        loading,
        dateTime,
        fetchWeather
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext);
