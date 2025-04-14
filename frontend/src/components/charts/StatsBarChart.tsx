import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface MonthlyStats {
  month: string;
  newUsers: number;
  newListings: number;
  newRequests: number;
  [key: string]: string | number;
}

interface StatsBarChartProps {
  data: MonthlyStats[];
}

const StatsBarChart: React.FC<StatsBarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="newUsers" fill="#8884d8" name="New Users" />
        <Bar dataKey="newListings" fill="#82ca9d" name="New Listings" />
        <Bar dataKey="newRequests" fill="#ffc658" name="New Requests" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatsBarChart; 