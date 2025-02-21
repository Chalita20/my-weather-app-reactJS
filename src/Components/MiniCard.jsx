/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rainy.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import { useStateContext } from "../Context";

const MiniCard = ({ time, temp }) => {
  const [icon, setIcon] = useState();
  const { weather } = useStateContext();

  useEffect(() => {
    if (weather.conditions) {
      let icon = weather.conditions.toLowerCase();
      if (icon.includes("rain")) {
        setIcon(rain);
      } else if (icon.includes("cloud") || icon.includes("overcast")) {
        setIcon(cloud);
      } else if (icon.includes("clear")) {
        setIcon(sun);
      } else if (icon.includes("thunder")) {
        setIcon(storm);
      } else if (icon.includes("fog")) {
        setIcon(fog);
      } else if (icon.includes("snow")) {
        setIcon(snow);
      } else if (icon.includes("wind")) {
        setIcon(wind);
      }
    }
  }, [weather]);

  return (
    <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col">
      <p className="text-center">
        {
          new Date(time)
            .toLocaleTimeString("en", { weekday: "long" })
            .split(" ")[0]
        }
      </p>
      <hr />
      <div className="w-full flex justify-center items-center flex-1">
        <img
          src={icon}
          alt="forecast not available"
          className="w-[4rem] h-[4rem]"
        />
      </div>
      <p className="text-center font-bold">{temp}&deg;C</p>
    </div>
  );
};

export default MiniCard;
