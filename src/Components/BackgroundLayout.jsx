import { useEffect, useState } from "react";
import { useStateContext } from "../Context";
import Clear from "../assets/images/clear.png";
import Fog from "../assets/images/fog.png";
import Cloudy from "../assets/images/cloudy.png";
import Rainy from "../assets/images/rainy.png";
import Snow from "../assets/images/snow.png";
import Stormy from "../assets/images/storm.png";
import Overcast from "../assets/images/overcast.png";

const BackgroundLayout = () => {
  const { weather } = useStateContext();
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weather.conditions) {
      console.log("Weather Conditions:", weather.conditions);
      let imageString = weather.conditions.toLowerCase();
      if (imageString.includes("clear")) {
        setImage(Clear);
      } else if (imageString.includes("rain") || imageString.includes("shower")) {
        setImage(Rainy);
      } else if (imageString.includes("snow") || imageString.includes("flurries")) {
        setImage(Snow);
      } else if (imageString.includes("fog")) {
        setImage(Fog);
      } else if (imageString.includes("thunder") || imageString.includes("storm")) {
        setImage(Stormy);
      } else if (imageString.includes("cloud")) {
        setImage(Cloudy);
      } else if (imageString.includes("overcast")) {
        setImage(Overcast);
      }
    }
  }, [weather]);

  return (
    <img
      src={image}
      alt="weather_image"
      className="h-screen w-full fixed left-0 top-0 -z-[10]"
    />
  );
};

export default BackgroundLayout;
