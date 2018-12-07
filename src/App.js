import React, { Component } from "react";
import Papa from "papaparse";
import "./App.css";
import data from "./data/nba.csv";
import Dropdown from "./components/Dropdown";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      teams: []
    };

    this.parseCSV = this.parseCSV.bind(this);
    this.parseTeam = this.parseTeam.bind(this);
  }

  componentDidMount() {
    this.parseCSV();
  }

  parseCSV() {
    Papa.parse(data, {
      header: true,
      download: true,
      complete: results => {
        const teams = this.parseTeam(results.data);
        this.setState({ data: results.data, teams });
      }
    });
  }

  parseTeam(data) {
    const temp = {};
    const results = [];
    for (let i = 0; i < data.length; i++) {
      if (results.length === 30) break;
      const currentTeam = data[i].Visitor;
      if (!temp[data[i].Visitor]) {
        temp[data[i].Visitor] = true;
        results.push(currentTeam);
      }
    }

    return results.sort();
  }

  render() {
    return (
      <div className="App">
        <Dropdown
          title={"Choose an NBA team"}
          items={this.state.teams}
          data={this.state.data}
        />
        {/* <test/> */}
      </div>
    );
  }
}

export default App;
