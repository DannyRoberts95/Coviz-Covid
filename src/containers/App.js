// import { connect } from "react-redux";
// import { shallowEqual, useSelector } from 'react-redux'

import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  const [page, setPage] = useState(1);
  const [covidData, setCovidData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then(res => { 
        return res.data;
      })
      .then(res => {
        setIsLoading(false);
        setCovidData(res);      
        console.log(covidData);
      })
      .catch(error => console.log(error));
  }, [page]);

  const content = (
    <div className="App">
      <div>
        <h1> API calls with React Hooks </h1>
        {isLoading && <p>Wait I'm Loading data for you</p>}

        <button onClick={loadMore}>Load More Commits</button>

        {/* {covidData && ( Object.keys(covidData).map((i,item)=><p key={i}>{covidData.Ireland.term}</p>))} */}
      </div>
    </div>
  );

  return content;
};

export default App;
