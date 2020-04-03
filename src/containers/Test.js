import React, { useRef, useEffect } from "react";
import { select } from "d3";

import "../css/style.css";

const data = [23, 34, 55, 333, 87];

const Test = () => {
  const svgRef = useRef();

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("fill", "red");
  }, []);
  return <svg ref={svgRef}></svg>;
};

export default Test;
