import React, { useState, useEffect, useRef } from "react";
import { select, line, curveCardinal } from "d3";
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
      if (key == selectedCountry) {
        data = props.data[key].map(item => item.confirmed);
        console.log(data);
      }
    }

    // D3 SETUP AND UPDATE
    const svg = select(svgRef.current);

    const myLine = line()
      .x((value, index) => index*10)
      .y(value => value/10).curve(curveCardinal);
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  
  }, [selectedCountry]);

  const content = (
    <div className="uk-height-1-1">
      <MySelectPicker
        name="country1"
        options={Object.keys(props.data)}
        changed={setCountry}
      ></MySelectPicker>
      <p>SELECTED COUNTRY: {selectedCountry}</p>

      <svg id="graph-svg" ref={svgRef}>
        {" "}
        <path d=""></path>
      </svg>
    </div>
  );

  return content;
};
export default Home;
