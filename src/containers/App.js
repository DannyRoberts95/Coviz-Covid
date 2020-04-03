// import { connect } from "react-redux";
// import { shallowEqual, useSelector } from 'react-redux'

import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  const [page, setPage] = useState(1);
  const [covidData, setCovidData] = useState(false);
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
      .then(data => {
        setIsLoading(false);
        setCovidData(data);      
      }).catch(error => console.log(error));
  }, [page]);

  const content = (
    <div className="App">
      <div>
        {isLoading && <p>Wait I'm Loading data for you</p>}
        {console.log(covidData.Ireland)}
        <button onClick={loadMore}>Load More Commits</button>
        {/* {covidData && ( Object.keys(covidData).map((i,item)=><p key={i}>{covidData.Ireland.term}</p>))} */}
      </div>
    </div>
  );

  return content;
};

export default App;
