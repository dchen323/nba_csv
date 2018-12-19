import React, { Component } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "./DropdownItem";
import Chart from "./Chart";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      teamList: [],
      status: "Both"
    };
    this.getDropdownItems = this.getDropdownItems.bind(this);
    this.filterData = this.filterData.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  getDropdownItems() {
    const menuItems = this.props.items.map((item, idx) => (
      <DropdownItem
        eventKey={idx}
        key={idx}
        item={item}
        filterData={this.filterData}
      />
    ));

    return menuItems;
  }

  filterData(name) {
    const visitorData = this.props.data.filter(data => data.Visitor === name);

    const homeData = this.props.data.filter(data => data.Home === name);

    const visitorScore = this.filterScore(visitorData, "PTS/V");
    const homeScore = this.filterScore(homeData, "PTS/H");

    let filteredScore;
    if (this.state.status === "Both") {
      filteredScore = [...visitorScore, ...homeScore].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } else if (this.state.status === "Home") {
      filteredScore = homeScore;
    } else {
      filteredScore = visitorScore;
    }

    const newEntry = [{ name, data: filteredScore }];

    this.setState(prevState => {
      let newState = [...prevState.filteredData, ...newEntry];

      return {
        filteredData: newState,
        teamList: [...prevState.teamList, name]
      };
    });
  }

  filterScore(data, status) {
    const graphData = [];
    for (let i = 0; i < data.length; i++) {
      const entries = {
        date: new Date(data[i].Date).getTime(),
        score: data[i][status]
      };

      graphData.push(entries);
    }

    return graphData;
  }

  onClick(e) {
    this.setState({ status: e.target.innerText });
    setTimeout(() => {
      console.log(this.state.status);
      for (let i = 0; i < this.state.teamList; i++) {
        this.filterData(this.state.teamList[i]);
      }
    }, 0);
  }

  render() {
    const dropdownItems = this.getDropdownItems();
    return (
      <div className="graph-container">
        <DropdownButton
          title={this.props.title}
          key={1}
          id={`dropdown-basic-${this.props.title}`}
        >
          {dropdownItems}
        </DropdownButton>
        <Chart data={this.state.filteredData} teamList={this.state.teamList} />
        <div className="btn-group" role="group" aria-label="...">
          <button type="button" className="btn" onClick={this.onClick}>
            Home
          </button>
          <button type="button" className="btn" onClick={this.onClick}>
            Away
          </button>
          <button type="button" className="btn" onClick={this.onClick}>
            Both
          </button>
        </div>
      </div>
    );
  }
}
