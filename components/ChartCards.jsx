"use client";
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function ChartCard({ title, data }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
    </div>
  );
}
