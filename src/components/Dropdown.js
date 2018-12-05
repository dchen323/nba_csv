import React, { Component } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "./DropdownItem";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.getDropdownItems = this.getDropdownItems.bind(this);
  }

  getDropdownItems() {
    const menuItems = this.props.items.map((item, idx) => (
      <DropdownItem eventKey={idx} key={idx} item={item} />
    ));

    return menuItems;
  }

  render() {
    const dropdownItems = this.getDropdownItems();
    return (
      <DropdownButton
        title={this.props.title}
        key={1}
        id={`dropdown-basic-${this.props.title}`}
      >
        {dropdownItems}
      </DropdownButton>
    );
  }
}
