import React from 'react';
import './Result.css'
import { Routes,Route,BrowserRouter } from 'react-router-dom';
const Result = (props) => {
  console.log(props.information)
  return (
    <div className='parent'>
    
      <div className='Card'>
        <p className='Location'>{props.information.location} </p>
        <div  className='WeatherDiv'>
        <p className='Weather'>Weather </p>
        <p className='Weather'> {props.information.weather}</p>
        </div>
        <div  className='TempDiv'>
        <p className='Temp'>Temperature</p>
        <p className='Temp'>{props.information.temp}</p>
        </div>
      </div>
    </div>
  );
}

export default Result;
