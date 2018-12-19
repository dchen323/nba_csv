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
import randomColor from "randomcolor";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticks: [],
      colors: []
    };

    this.getTicks = this.getTicks.bind(this);
  }

  componentDidMount() {
    const colors = [];
    while (colors.length < 30) {
      let color = randomColor({
        luminosity: "dark",
        alpha: 1
      });
      if (colors.indexOf(color) === -1) {
        colors.push(color);
      }
    }

    this.setState({ colors });
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
        ticks: newTicks
      };
    });
  }

  dateFormat(time) {
    return moment(time).format("MM/DD/YY");
  }

  render() {
    const lines = this.props.data.map((team, idx) => {
      return (
        <Line
          key={idx}
          dataKey="score"
          data={team.data}
          name={team.name}
          stroke={this.state.colors[idx]}
        />
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
          domain={[
            this.state.ticks[0],
            this.state.ticks[this.state.ticks.length - 1]
          ]}
          type="number"
          ticks={this.state.ticks}
          ticksCount={this.state.ticks.length}
          tickFormatter={this.dateFormat}
        />
        <YAxis dataKey="score" />
        <Tooltip labelFormatter={this.dateFormat} />
        <Legend />
        {lines}
      </LineChart>
    );
  }
}
