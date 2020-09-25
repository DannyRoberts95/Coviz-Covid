import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Chart from "react-google-charts";
import { Typography } from "@material-ui/core";
export default function DataChart({ chartData }) {
  console.log(chartData);
  const theme = useTheme();

  const country = "United Kingdom";
  console.log(chartData[country].deaths);

  const countryMap = chartData[country].map((item, i) => [
    item.date,
    item.deaths,
    item.recovered,
    item.confirmed,
  ]);

  const data = [["Date", "Deaths","Recovered","Cases"], ...countryMap];

  return (
    <div style={{ display: "flex" }}>
      <Chart
        width={"100%"}
        height={"350px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          // isStacked: true,
          title: "Company Performance",
          hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
          vAxis: { minValue: 0 },
          chartArea: { width: "75%", height: "70%" },
        }}
      />
    </div>
  );
}
