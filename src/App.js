import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

const App = () => {
  const [covidData, setCovidData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((data) => {
        setIsLoading(false);
        setCovidData(data);
      })
      .catch((error) => {
        setIsLoading(true);
        console.log(error);
      });
  }, [isLoading]);

  return <Dashboard data={covidData}></Dashboard>;
};

export default App;
