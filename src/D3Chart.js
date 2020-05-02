import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
  constructor(element, data) {
    let vis = this;
    vis.data = data;

    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    // 1. set the output domain for the visualisation
    vis.x = d3.scaleLinear().range([0, WIDTH]);
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    vis.xAxisGroup = vis.g
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.g.append("g");

    vis.update(vis.data);
  }

  update(data) {
    let vis = this;
    vis.data = data;
    console.log(vis.data);

    //2. set input domain for the vis
    vis.x.domain([
      0,
      d3.max(vis.data, (d) => new Date(d.date).getTime() / 10000),
    ]);
	vis.y.domain([0, d3.max(vis.data, (d) => Number(d.deaths))]);
	

    const xAxisCall = d3.axisBottom(vis.x);
    const yAxisCall = d3.axisLeft(vis.y);
    vis.xAxisGroup.call(xAxisCall);
    vis.yAxisGroup.call(yAxisCall);

	// JOIN
	
    //joining the data to the svg and give each cricle a reference based on its date
    const circles = vis.g.selectAll("circle").data(vis.data, (d) => d.date);

    // EXIT
    circles.exit().remove();

    // UPDATE
    circles
      .attr("cx", (d) => new Date(d.date).getTime() / 10000)
      .attr("cy", (d) => vis.y(d.deaths));

    // ENTER
    circles
      .enter()
      .append("circle")
      .attr("cy", (d) => vis.y(d.deaths))
      .attr("cx", (d) => new Date(d.date).getTime() / 10000)
      .attr("r", 5)
      .attr("fill", "red");

  }
}

export default D3Chart;
