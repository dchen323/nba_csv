import React, { Component } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "./DropdownItem";
import Chart from "./Chart";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      teamList: []
    };
    this.getDropdownItems = this.getDropdownItems.bind(this);
    this.filterData = this.filterData.bind(this);
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

    const allFilteredScore = [...visitorScore, ...homeScore].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const newEntry = [{ name, data: allFilteredScore }];

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
        date: data[i].Date,
        score: data[i][status]
      };

      graphData.push(entries);
    }

    return graphData;
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
      </div>
    );
  }
}
