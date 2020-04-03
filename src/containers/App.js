import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

import About from "./About"
import Home from "./Home"

const App = () => {
  const [covidData, setCovidData] = useState(false);  
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then(res => {
        return res.data;
      })
      .then(data => {
        setIsLoading(false);
        setCovidData(data);
      })
      .catch(error => {
        setIsLoading(true);
        console.log(error);
      });
  }, []);

  const content = (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            
            </ul>
          </nav>

          <Switch>
            <Route path="/about">
              <About ></About>
            </Route>
            <Route exact path="/">
              <Home data={covidData}></Home>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );

  return content;
};

export default App;
