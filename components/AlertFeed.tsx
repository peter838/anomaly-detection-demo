'use client';

import { Anomaly } from '@/lib/types';
import { getAnomalyTypeInfo, getSeverityBadge, formatTimeAgo } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';

interface AlertFeedProps {
  anomalies: Anomaly[];
}

export default function AlertFeed({ anomalies }: AlertFeedProps) {
  const [liveMode, setLiveMode] = useState(true);
  const [newAnomalies, setNewAnomalies] = useState<Anomaly[]>([]);

  // Simulate live alerts
  useEffect(() => {
    if (!liveMode) return;

    const interval = setInterval(() => {
      // Randomly add a new anomaly occasionally
      if (Math.random() > 0.7) {
        const randomAnomaly = anomalies[Math.floor(Math.random() * anomalies.length)];
        const newAlert = {
          ...randomAnomaly,
          id: `${randomAnomaly.id}-${Date.now()}`,
          detected_at: new Date().toISOString()
        };
        setNewAnomalies(prev => [newAlert, ...prev].slice(0, 10));
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [liveMode, anomalies]);

  const allAnomalies = [...newAnomalies, ...anomalies];

  // Group by date
  const groupedAlerts = allAnomalies.reduce((acc, anomaly) => {
    const date = new Date(anomaly.detected_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(anomaly);
    return acc;
  }, {} as Record<string, Anomaly[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        <button
          onClick={() => setLiveMode(!liveMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            liveMode ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {liveMode ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
          Live {liveMode ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Alerts grouped by date */}
      {Object.entries(groupedAlerts).map(([date, alerts]) => (
        <div key={date} className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 border-b border-gray-200 pb-2">
            {date}
          </h2>
          <div className="space-y-2">
            {alerts.map((alert) => {
              const typeInfo = getAnomalyTypeInfo(alert.type);
              const severity = getSeverityBadge(alert.severity);
              const timeStr = new Date(alert.detected_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={alert.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow animate-in fade-in slide-in-from-top-2"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{typeInfo.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-500">{timeStr}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${severity.color}`}>
                          {severity.emoji} {severity.text}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
