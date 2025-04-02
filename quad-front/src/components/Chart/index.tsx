/** @jsxImportSource react */
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
  Cell,
} from 'recharts';

const data = [
  { name: 'ART', "Review count": 70 },
  { name: 'BUS', "Review count": 60 },
  { name: 'CAI', "Review count": 55 },
  { name: 'EDU', "Review count": 43 },
  { name: 'ENG', "Review count": 78 },
  { name: 'LAW', "Review count": 101 },
  { name: 'MED', "Review count": 11 },
  { name: 'SCI', "Review count": 82 },
  { name: 'GEN', "Review count": 64 }
];

const colors = ['#A61E32', '#860064', '#E4660B', '#52A01B', '#492973', '#03618F', '#028384', '#0055A0', '#CFC70A'];


export default function CustomBarChart() {
  return (
    <ResponsiveContainer width="70%" height={240}>
      <BarChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: 'black', fontSize: 12, fontWeight: 400 }} />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: '#00804bd9',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            fontSize: '12px',
            padding: '6px 10px'
          }}
          itemStyle={{
            color: 'white',
            fontSize: '12px'
          }}
          cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
        />
        <Tooltip />
        {/* <Legend verticalAlign="bottom" iconType="plainline"/> */}
        <Bar dataKey="Review count" activeBar={<Rectangle stroke="white" />}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}