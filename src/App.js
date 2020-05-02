import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ChartWrapper from "./ChartWrapper";

const App = () => {
  const [covidData, setCovidData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then((res) => {
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

  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand>Covid Viz</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col md={6} xs={12}>
            {covidData ? <ChartWrapper data={covidData.Ireland} /> : null}
          </Col>
          <Col md={6} xs={12}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
