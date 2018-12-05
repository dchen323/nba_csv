import React, { Component } from "react";
import Papa from "papaparse";
import "./App.css";
import data from "./data/nba.csv";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };

    this.parseData = this.parseData.bind(this);
  }

  componentDidMount() {
    this.parseData();
  }

  parseData() {
    Papa.parse(data, {
      header: true,
      download: true,
      complete: results => {
        this.setState({ data: results.data });
      }
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        <h1>Filler</h1>
      </div>
    );
  }
}

export default App;
