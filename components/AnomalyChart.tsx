'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Anomaly } from '@/lib/types';
import { getAnomalyTypeInfo } from '@/lib/mockData';

interface AnomalyChartProps {
  anomalies: Anomaly[];
}

export default function AnomalyChart({ anomalies }: AnomalyChartProps) {
  // Group anomalies by type
  const typeCounts = anomalies.reduce((acc, anomaly) => {
    const typeInfo = getAnomalyTypeInfo(anomaly.type);
    if (!acc[typeInfo.category]) {
      acc[typeInfo.category] = 0;
    }
    acc[typeInfo.category]++;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(typeCounts).map(([type, count]) => ({
    name: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    count,
    fill: type === 'price' ? '#EF4444' : type === 'quantity' ? '#10B981' : type === 'vendor_behavior' ? '#F59E0B' : '#6366F1'
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
