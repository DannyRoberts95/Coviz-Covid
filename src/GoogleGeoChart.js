import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Chart from "react-google-charts";
import { Typography } from "@material-ui/core";
export default function DataChart({ chartData }) {
  console.log(chartData);
  const theme = useTheme();

  const sample = { Ireland: chartData["Ireland"] };
  console.log(sample);

  // const deathsByCountry = Object.keys(chartData).map((country, i) => {
  //   let deaths = 0;
  //   chartData[country].forEach((item) => (deaths += item.deaths));
  //   const returnItem = [country, deaths];
  //   deaths = 0;
  //   return returnItem;
  // });

  const deathsByCountry = Object.keys(chartData).map((country) => {
    return [
      country,
      chartData[country][[chartData[country].length - 1]].deaths,
      chartData[country][[chartData[country].length - 1]].confirmed,
    ];
  });

  const data = [["Country", "Deaths", "confirmed"], ...deathsByCountry];

  return (
    <Chart
      width={"100%"}
      height={"75vh"}
      chartType="GeoChart"
      data={data}
      mapsApiKey="AIzaSyAo80uBFdN2Li3si93EBEyQ-8araYz4Bac"
      options={{        
        colorAxis: { colors: ["#00853f", "#e31b23"] },
        backgroundColor: "#81d4fa",
        datalessRegionColor: "#f8bbd0",
        defaultColor: "#f5f5f5",
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
}
