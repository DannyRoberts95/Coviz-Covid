import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

export default function DataChart({ chartData }) {
  console.log(chartData);
  const theme = useTheme();

  const countries = ["United Kingdom"];

  return (
    <React.Fragment>
      <Typography>{countries[0]}</Typography>
      <ResponsiveContainer width={"100%"} height={350}>
        <LineChart
          data={chartData[countries[0]]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="confirmed" stroke="blue" />
          <Line type="monotone" dataKey="deaths" stroke="red" />
          <Line type="monotone" dataKey="recovered" stroke="green" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
