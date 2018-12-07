import React, { Component } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";

export default class Chart extends Component {
  render() {
    const lines = this.props.data.map((team, idx) => {
      console.log(team);
      return (
        <Line key={idx} dataKey="score" data={team.data} name={team.name} />
      );
    });

    console.log(this.props.data);
    return (
      <LineChart
        width={1500}
        height={600}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        data={this.props.data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" allowDuplicatedCategory={false} />
        <YAxis dataKey="score" />
        <Tooltip />
        <Legend />
        {lines}
      </LineChart>
    );
  }
}
