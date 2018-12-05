import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";

export default function Dropdown(props) {
  const menuItems = props.items.map((item, idx) => (
    <MenuItem eventKey={idx} key={idx}>
      {item}
    </MenuItem>
  ));
  return (
    <DropdownButton
      title={props.title}
      key={1}
      id={`dropdown-basic-${props.title}`}
    >
      {menuItems}
    </DropdownButton>
  );
}
