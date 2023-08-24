
import React, { useState } from 'react';
import Landing from './Landing/Landing';
import Result from './Result/Result';
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import "./App.css"

function App() {
  const [information, setInformation] = useState({});
  const update =(info)=>{
    setInformation(info);
  }
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Landing update = {update}/>}></Route>
      <Route path="/result" element={<Result information = {information}  />}></Route>
     
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
