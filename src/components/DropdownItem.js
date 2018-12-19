import React, { Component } from "react";
import { MenuItem } from "react-bootstrap";

export default class DropdownItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      clicked: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (!this.state.clicked) {
      this.props.filterData(e.target.text);
    }
    this.setState(prevState => ({
      disabled: true,
      clicked: true
    }));
  }

  render() {
    return (
      <MenuItem
        eventKey={this.props.idx}
        key={this.props.idx}
        onClick={this.onClick}
        disabled={this.state.disabled}
      >
        {this.props.item}
      </MenuItem>
    );
  }
}
