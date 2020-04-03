import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Home from "./Home";

import "../css/style.css"

import UIkit from "../../node_modules/uikit/dist/js/uikit";
import Icons from "../../node_modules/uikit/dist/js/uikit-icons";
UIkit.use(Icons);



const App = () => {
  const [covidData, setCovidData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then(res => {
        return res.data;
      })
      .then(data => {
        setIsLoading(false);
        console.log(data);
        setCovidData(data);
      })
      .catch(error => {
        setIsLoading(true);
        console.log(error);
      });
  }, []);



  const content = (
    <div className="App">
      {/* <Navbar></Navbar> */}
      {isLoading ? (
        <div className="uk-container-expand uk-background-muted">
          <div className="uk-position-center " uk-spinner="ratio: 3"></div>
        </div>
      ) : (
        <div className="uk-container-expand uk-background-muted uk-height-1-1">
          <Router> 
            <Switch>
              <Route exact path="/">
                <Home data={covidData}></Home>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );

  return content;
};

export default App;
