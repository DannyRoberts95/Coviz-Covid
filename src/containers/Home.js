import React, { useState, useEffect, useRef } from "react";
import { select } from "d3";
import MySelectPicker from "../components/inputs/select";

const dataFAKE = [23, 34, 55, 333, 87];

const Home = props => {
  const svgRef = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const setCountry = country => {
    setSelectedCountry(country);
  };
  let data = [];

  useEffect(() => {
    for (let [key, value] of Object.entries(props.data)) {
      if(key == selectedCountry){ 
        data = props.data[key].map(item=>item.confirmed);
        console.log(data);

        }
    }

    // D3 SETUP AND UPDATE
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("fill", "red");
  }, [selectedCountry]);

  const content = (
    <div>
      <MySelectPicker
        name="country1"
        options={Object.keys(props.data)}
        changed={setCountry}
      ></MySelectPicker>
      <p>SELECTED COUNTRY: {selectedCountry}</p>

      <svg className="uk-width-1-1" ref={svgRef}></svg>
    </div>
  );

  return content;
};
export default Home;
