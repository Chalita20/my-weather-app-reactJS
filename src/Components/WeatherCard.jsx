/* eslint-disable react/prop-types */
import React from 'react';
import { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rainy.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'
import { useStateContext } from '../Context'

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  conditions,
}) => {

  const [icon, setIcon] = useState(sun)
  const { weather, dateTime } = useStateContext()
  const { date, time } = useDate({ dateTime });


  useEffect(() => {

    if (weather.conditions) {
      let icon = weather.conditions.toLowerCase();
      if (icon.includes('rain')) {
        setIcon(rain)
      } else if (icon.includes('cloud') || icon.includes('overcast')) {
        setIcon(cloud)
      } else if (icon.includes('clear')) {
        setIcon(sun)
      } else if (icon.includes('thunder')) {
        setIcon(storm)
      } else if (icon.includes('fog')) {
        setIcon(fog)
      } else if (icon.includes('snow')) {
        setIcon(snow)
      } else if (icon.includes('wind')) {
        setIcon(wind)
      }
   } 
  }, [weather])

  return (
    <div className='w-[22rem] min-w-[22rem] h-auto glassCard p-4'>
      <div className="flex w-min items-center gap-4 mt-12 mb-4">
        <img src={icon} className='w-36 h-auto' alt="weather_icon" />
        <p className="font-bold text-5xl">{temperature}°C</p>
      </div>
      <div className='font-bold text-center text-xl'>
        {place}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'>{date || time}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <span className='font-normal'>{windspeed} km/h</span></p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <span className='font-normal'>{humidity} gm/m&#179;</span></p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        <p className='font-semibold text-lg'>Heat Index</p>
        <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
      </div>
      <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
        {conditions}
      </div>
    </div>
  )
}

export default WeatherCard