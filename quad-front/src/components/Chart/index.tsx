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
  { name: 'ART', fullName: 'Arts', "Review count": 72 },
  { name: 'BUS', fullName: 'Business and Economics', "Review count": 60 },
  { name: 'CAI', fullName: 'Creative Arts and Industries', "Review count": 55 },
  { name: 'EDU', fullName: 'Education and Social Work', "Review count": 43 },
  { name: 'ENG', fullName: 'Engineering', "Review count": 78 },
  { name: 'LAW', fullName: 'Law', "Review count": 101 },
  { name: 'MED', fullName: 'Medical and Health Science', "Review count": 11 },
  { name: 'SCI', fullName: 'Science', "Review count": 82 },
  { name: 'GEN', fullName: 'General Education', "Review count": 64 },
];

const colors = ['#A61E32', '#860064', '#E4660B', '#52A01B', '#492973', '#03618F', '#028384', '#0055A0', '#CFC70A'];


export default function CustomBarChart() {

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { fullName, name, ['Review count']: count } = payload[0].payload;
  
      return (
        <div style={{
          backgroundColor: '#000000b1',
          color: 'white',
          borderRadius: '4px',
          fontSize: '12px',
          padding: '6px 10px',
        }}>
          <div><strong>{fullName ?? name}</strong></div>
          <div>Review count: {count}</div>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="70%" height={240}>
      <BarChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: 'black', fontSize: 12, fontWeight: 400 }} />
        <YAxis />
        <Tooltip
          content={<CustomTooltip />}
          itemStyle={{
            color: 'white',
            fontSize: '12px'
          }}
          cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
        />
        <Tooltip />
        {/* <Legend verticalAlign="bottom" iconType="plainline"/> */}
        <Bar dataKey="Review count" activeBar={<Rectangle />}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}