import React, { Component } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "./DropdownItem";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.getDropdownItems = this.getDropdownItems.bind(this);
    this.filterTeams = this.filterTeams.bind(this);
  }

  getDropdownItems() {
    const menuItems = this.props.items.map((item, idx) => (
      <DropdownItem
        eventKey={idx}
        key={idx}
        item={item}
        filterTeams={this.filterTeams}
      />
    ));

    return menuItems;
  }

  filterTeams(name) {
    const visitorData = this.props.data.filter(data => data.Visitor === name);

    const homeData = this.props.data.filter(data => data.Home === name);

    const visitorScore = this.filterScore(visitorData, "PTS/V");
    const homeScore = this.filterScore(homeData, "PTS/H");

    const allFilteredScore = [...visitorScore, ...homeScore].sort(
      (a, b) => a.date - b.date
    );

    console.log(allFilteredScore);
  }

  filterScore(data, status) {
    const formatedData = [];
    for (let i = 0; i < data.length; i++) {
      const results = { date: data[i].Date, value: data[i][status] };
      formatedData.push(results);
    }

    return formatedData;
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
      </div>
    );
  }
}
