import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";

const formattedData = [
  {
    data_time: "2016-08-12 10:22:04",
    timestamp: 100,
    "1_value": 43
  },
  {
    data_time: "2016-08-12 08:49:04",
    timestamp: 200,
    "2_value": 14
  },
  {
    data_time: "2016-08-12 07:44:04",
    timestamp: 300,
    "2_value": 14
  }
];

const channelIds = ["1", "2"];

export default function test() {
  return (
    <LineChart data={formattedData} layout="vertical" width={1200} height={400}>
      <XAxis type="number" />
      <YAxis dataKey="timestamp" type="number" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {channelIds.map(id => {
        return <Line key={`line_${id}`} dataKey={`${id}_value`} />;
      })}
    </LineChart>
  );
}
