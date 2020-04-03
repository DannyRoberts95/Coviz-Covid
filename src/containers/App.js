import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

import Test from "./Test";
import Home from "./Home";

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
    <div className="App uk-section-muted">
      <div className="uk-container-expand">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/test">D3</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route exact path="/">
                <Home data={covidData}></Home>
              </Route>
              <Route path="/test">
                <Test></Test>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );

  return content;
};

export default App;
