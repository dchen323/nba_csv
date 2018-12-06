import React, { Component } from "react";
import { MenuItem } from "react-bootstrap";

export default class DropdownItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.filterTeams(e.target.text);
    this.setState(prevState => ({ disabled: !prevState.disabled }));
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
