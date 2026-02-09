import { LucideIcon } from 'lucide-react';

interface SeverityCardProps {
  emoji: string;
  label: string;
  count: number;
  dailyChange: number;
  color: string;
  icon?: LucideIcon;
}

export default function SeverityCard({ emoji, label, count, dailyChange, color, icon: Icon }: SeverityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${color} text-white text-lg`}>
          {emoji}
        </span>
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-bold text-gray-900">{count}</div>
        <div className="text-sm text-gray-500">
          {label}
        </div>
        {dailyChange !== 0 && (
          <div className={`text-xs font-medium ${dailyChange > 0 ? 'text-red-600' : 'text-gray-400'}`}>
            {dailyChange > 0 ? '+' : ''}{dailyChange} today
          </div>
        )}
      </div>
    </div>
  );
}
