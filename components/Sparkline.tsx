import React from 'react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, Tooltip } from 'recharts';

interface SparklineProps {
  data: { value: number }[];
  color: string;
}

const Sparkline: React.FC<SparklineProps> = ({ data, color }) => (
  <ResponsiveContainer width="100%" height={40}>
    <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
       <defs>
        <linearGradient id={`color-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
          <stop offset="95%" stopColor={color} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <Tooltip
        contentStyle={{ fontSize: '12px', padding: '2px 8px' }}
        labelStyle={{ display: 'none' }}
        formatter={(value) => [`${value} docs`, null]}
      />
      <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#color-${color.slice(1)})`} />
    </AreaChart>
  </ResponsiveContainer>
);

export default Sparkline;
