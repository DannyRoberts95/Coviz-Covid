import React, { useState, useEffect } from "react";
import MySelectPicker from "../components/inputs/select";



const Home = props => {  
  const [selectedCountries, setSelectedCountries] = useState([]);
    
  const setCountries = countries => {
    setSelectedCountries(countries);
  };
  
  
  const content = (
    <div>
      <MySelectPicker
        options={Object.keys(props.data)}
        changed={setCountries}
      ></MySelectPicker>
      <p>SELECTED COUNTRY: {selectedCountries}</p>
    </div>
  );

  return content;
};
export default Home;
