import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
let WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
  constructor(element, data, parent_width) {
    WIDTH = parent_width ? parent_width - MARGIN.LEFT - MARGIN.RIGHT : WIDTH;
    console.log(WIDTH);
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
    vis.x = d3.scaleTime().range([0, WIDTH]);
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    vis.xAxisGroup = vis.g
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT + 5})`);
    vis.yAxisGroup = vis.g.append("g").attr("transform", `translate(-5,0)`);

    vis.update(vis.data);
  }

  update(data) {
    let vis = this;
    vis.data = data;

    let parseTime = d3.timeFormat("%B %d, %Y");
    vis.data.forEach((d) => {
      d.date = parseTime(new Date(d.date));
    });

    console.log(vis.data);
    //2. set input domain for the vis
    vis.x.domain(d3.extent(vis.data, (d) => new Date(d.date)));
    vis.y.domain([0, d3.max(vis.data, (d) => d.confirmed)]);

    const xAxisCall = d3.axisBottom(vis.x);
    const yAxisCall = d3.axisLeft(vis.y);
    vis.xAxisGroup.call(xAxisCall).call((g) => g.select(".domain").remove());
    vis.yAxisGroup.call(yAxisCall).call((g) => g.select(".domain").remove());

    // JOIN
    const confirmed = vis.g.append("path").datum(data);
    const deaths = vis.g.append("path").datum(data);
    const recovered = vis.g.append("path").datum(data);

    //EXIT
    confirmed.exit().remove();
    deaths.exit().remove();
    recovered.exit().remove();

    //ENTER
    confirmed
      .attr(
        "d",
        d3
          .line()
          .x((d) => vis.x(new Date(d.date)))
          .y((d) => vis.y(d.confirmed))
      )
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5);

    deaths
      .attr(
        "d",
        d3
          .line()
          .x((d) => vis.x(new Date(d.date)))
          .y((d) => vis.y(d.deaths))
      )
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5);

    recovered
      .attr(
        "d",
        d3
          .line()
          .x((d) => vis.x(new Date(d.date)))
          .y((d) => vis.y(d.recovered))
      )
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5);
  }
}

export default D3Chart;
