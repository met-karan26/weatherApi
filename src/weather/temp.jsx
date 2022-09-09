import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp =()=>{

  const[city,setCity]=useState("Kanpur");
  const[tempInfo,setTempInfo]=useState({});
  
  const handelClick=async()=>{
      //As it is an async function we will have to use error handeling
      try{
          let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=37da8e0395a1bdb7c66f92d71236f675`;
          let res=await fetch(url);
          let data=await res.json();                                       //This line is to  fetch the json format of the weather api n store it in data variable.
          const{temp,humidity,pressure}=data.main;
          const{main:weathermood}=data.weather[0];
          const{speed}=data.wind;
          const{name}=data;
          const{country,sunset}=data.sys;
       
          const myNewWeatherInfo={
              temp,humidity,pressure,speed,country,weathermood,name,sunset
          };
          setTempInfo(myNewWeatherInfo);
      }
      catch(error){
          console.log(error);
      }
  };
  useEffect(()=>{
      handelClick();
  },[]);
  
      return<>
      <div className="wrap">
          <div className='search'>
          <input className='searchTerm' type="search" placeholder='City name' value={city} autoFocus onChange={(event)=>setCity(event.target.value)}></input>
          <button className='searchButton' onClick={handelClick}>Search</button>
          </div>
  </div>
          <Weathercard {...tempInfo}/>
          
      </>
  }
  
  export default Temp;

