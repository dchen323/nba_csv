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

import moment from "moment";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: [],
      index: 0,
      ticks: []
    };

    this.getTicks = this.getTicks.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.getTicks();
    }
  }

  getTicks() {
    const ticks = [];
    for (let i = 0; i < this.props.data.length; i++) {
      const current = this.props.data[i].data;
      for (let j = 0; j < current.length; j++) {
        ticks.push(current[j].date);
      }
    }

    this.setState(prevState => {
      const newTicks = [...prevState.ticks, ...ticks]
        .sort()
        .filter((date, idx, arr) => arr.indexOf(date) === idx);

      return {
        range: [newTicks[0], newTicks[newTicks.length - 1]],
        index: newTicks.length,
        ticks: newTicks
      };
    });
  }

  dateFormat(time) {
    return moment(time).format("MM/DD/YY");
  }

  mouseOver(e) {
    console.log(e);
  }

  render() {
    const lines = this.props.data.map((team, idx) => {
      return (
        <Line key={idx} dataKey="score" data={team.data} name={team.name} />
      );
    });

    return (
      <LineChart
        width={1500}
        height={600}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          domain={this.state.range}
          type="number"
          ticks={this.state.ticks}
          ticksCount={this.state.index}
          tickFormatter={this.dateFormat}
          onMouseOver={this.onMouseOver}
          name="dateTime"
        />
        <YAxis dataKey="score" />
        <Tooltip labelFormatter={this.dateFormat} />
        <Legend />
        {lines}
      </LineChart>
    );
  }
}
