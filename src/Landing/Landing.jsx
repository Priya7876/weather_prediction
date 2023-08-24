import React, { useEffect ,useRef} from 'react';
import { useState } from 'react';
import axios from 'axios';
// import InputField from "../InputField/InputField";
// import Button from "../Button/Button.jsx";
import './Landing.css'
import Button from '../Button/Button'
import InputField from '../InputField/InputField'
import Result from '../Result/Result';

import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';




const Landing = (props) => {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [location, setLoaction] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const API_KEY = "a4a35d558aa9e1db256321efd6261180";
  const [info, setInfo] = useState({});
  const dialogRef = useRef(null);

  let [isLoading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);



  const handleOnChange = async (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value.trim() !== '') {
      try {

        const accessToken = "pk.eyJ1IjoiY3J5cHRvc2hhaG8iLCJhIjoiY2tlczc0Z3NhMGV3aDJ3bDR3dDQ4NzBpNiJ9.vQU9BmvhA4UkLP9sTfKlvg";
        const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${accessToken}`;

        const res = await axios.get(apiUrl);
        const fea = res.data.features;
        console.log(fea);
        setSuggestedAddresses(fea);
      }

      catch (error) {
        console.log('Error:', error);
      }
    }
    else {
      setSuggestedAddresses([]);
    }

  }
  const onClose = () => {
    setSuggestedAddresses([]);
  };
  const handleAddressSelect = (address) => {
    console.log(address);

    setAddress(address.place_name);
    setSuggestedAddresses([]);
    setLat(address.center[1])
    setLong(address.center[0])


  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  const onIconClick = () => {
    const m = true;
    setLoading(m);

    try {

      if (navigator.geolocation)

        navigator.geolocation.getCurrentPosition(


          async function (position) {

            console.log("Hey i am the error")
            console.log(position.coords.longitude);


            const longi = position.coords.longitude;
            const lati = position.coords.latitude;
            setLat(lati);
            setLong(longi);


            await fetchLocation(longi, lati);


          }

        );



    }
    catch {
      console.log("Error in location")
    }

    finally {
      setLoading(false);
    }

  }
  const fetchLocation = async (longitude, latitude) => {

    if (longitude != null && latitude != null) {
      const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiY3J5cHRvc2hhaG8iLCJhIjoiY2tlczc0Z3NhMGV3aDJ3bDR3dDQ4NzBpNiJ9.vQU9BmvhA4UkLP9sTfKlvg`)
      const response = res.data;
      const k = response.features[0].place_name;
      setAddress(k);

      console.log(response.features[0].place_name);


    }
  }
  const onSearchButtonClick = async () => {
    console.log(lat);
    console.log(long)

    try {

      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);
      console.log(res.status)
      const feature = res.data;

      const obj = { location: feature.name, weather: feature.weather[0].description, temp: feature.main.temp };
      setInfo(obj);
      props.update(obj);
      console.log(obj);
    }
    catch {
      console.log("error in api");
    }
    finally {

    }

  }
  return (

    <div className='parent' >
      <div className='title' >
        IS IT TOO HOT ?
      </div>

      <InputField placeholder="Enter your location" type="text" onIconClick={onIconClick} isLoading={isLoading} address={address} onChange={handleOnChange} />
      {suggestedAddresses.length > 0 && (
        <div id="autocomplete-div" ref={dialogRef}>
          {suggestedAddresses.map((address) => (
            <div key={address.id} >
              <div className="autocomplete-item"

                onClick={() => handleAddressSelect(address)}
              >

                {address.place_name}
              </div>

            </div>
          ))}
        </div>
      )}
      <Link to="/result">
        <Button bg="#FAC576" color="#0000000" height={60} font={22} width={250} xm={300} ym={500} text="Search"
          borderRadius={10} onClk={onSearchButtonClick} />
      </Link>
    </div>
  );
}

export default Landing;
