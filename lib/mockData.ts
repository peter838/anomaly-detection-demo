import { Anomaly, AnomalySeverity, AnomalyType } from './types';

export const generateMockAnomalies = (): Anomaly[] => {
  const now = new Date();

  return [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      type: 'price_high' as AnomalyType,
      severity: 'critical' as AnomalySeverity,
      detected_at: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      description: 'Quote price $1,250.00 deviates 65% from 30-day avg $756.00',
      historical_baseline: 756.0,
      observed_value: 1250.0,
      deviation_percentage: 65.2,
      data: {
        supplier_email: 'vendor@example.com',
        product_name: 'Industrial Laser Cutter',
        quantity: 5,
        rfq_reference: 'SG-ABC123',
        baseline_samples: 47
      },
      alert_sent: true
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440001',
      type: 'vendor_response_slow' as AnomalyType,
      severity: 'high' as AnomalySeverity,
      detected_at: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      description: 'vendor@supplier.com has 3 RFQs pending > 48h: SG-XYZ789, SG-ABC456, SG-DEF123',
      data: {
        supplier_email: 'vendor@supplier.com',
        slow_count: 3,
        rfq_references: ['SG-XYZ789', 'SG-ABC456', 'SG-DEF123']
      },
      alert_sent: true
    },
    {
      id: '770e8400-e29b-41d4-a716-446655440002',
      type: 'quantity_high' as AnomalyType,
      severity: 'medium' as AnomalySeverity,
      detected_at: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      description: 'Quantity 5,000 is unusual. Typical: 250 (±75)',
      historical_baseline: 250.0,
      observed_value: 5000.0,
      deviation_percentage: 1900.0,
      data: {
        product_name: 'Office Chairs',
        z_score: 63.3,
        simple_multiplier: 20.0,
        baseline_samples: 156
      },
      alert_sent: true
    },
    {
      id: '880e8400-e29b-41d4-a716-446655440003',
      type: 'delivery_long' as AnomalyType,
      severity: 'high' as AnomalySeverity,
      detected_at: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      description: 'Lead time 45 days deviates 50% from historical avg 30 days',
      historical_baseline: 30.0,
      observed_value: 45.0,
      deviation_percentage: 50.0,
      data: {
        supplier_email: 'logistics@vendor.com',
        region: 'SG',
        rfq_reference: 'SG-DEL789'
      },
      alert_sent: true
    },
    {
      id: '990e8400-e29b-41d4-a716-446655440004',
      type: 'price_low' as AnomalyType,
      severity: 'critical' as AnomalySeverity,
      detected_at: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
      description: 'Quote price $45.00 deviates -40% from 30-day avg $75.00',
      historical_baseline: 75.0,
      observed_value: 45.0,
      deviation_percentage: -40.0,
      data: {
        supplier_email: 'discount@supplier.com',
        product_name: 'Safety Helmets',
        quantity: 100,
        rfq_reference: 'SG-HEL789',
        baseline_samples: 89
      },
      alert_sent: true
    },
    {
      id: 'aa0e8400-e29b-41d4-a716-446655440005',
      type: 'vendor_price_spike' as AnomalyType,
      severity: 'high' as AnomalySeverity,
      detected_at: new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString(),
      description: 'New vendor price spike 35% on Industrial Drill: $450.00 vs $333.00',
      historical_baseline: 333.0,
      observed_value: 450.0,
      deviation_percentage: 35.0,
      data: {
        supplier_email: 'newvendor@example.com',
        product_name: 'Industrial Drill',
        previous_price: 333.0,
        rfq_reference: 'SG-DRILL456'
      },
      alert_sent: true
    },
    {
      id: 'bb0e8400-e29b-41d4-a716-446655440006',
      type: 'quantity_low' as AnomalyType,
      severity: 'medium' as AnomalySeverity,
      detected_at: new Date(now.getTime() - 96 * 60 * 60 * 1000).toISOString(),
      description: 'Quantity 10 is unusual. Typical: 50 (±15)',
      historical_baseline: 50.0,
      observed_value: 10.0,
      deviation_percentage: -80.0,
      data: {
        product_name: 'LED Monitor',
        z_score: -2.7,
        simple_multiplier: 0.2,
        baseline_samples: 203
      },
      alert_sent: true
    },
    {
      id: 'cc0e8400-e29b-41d4-a716-446655440007',
      type: 'vendor_rejection_streak' as AnomalyType,
      severity: 'medium' as AnomalySeverity,
      detected_at: new Date(now.getTime() - 120 * 60 * 60 * 1000).toISOString(),
      description: 'busyvendor@supplier.com rejected 2 consecutive RFQs in last 7 days',
      data: {
        supplier_email: 'busyvendor@supplier.com',
        rejection_count: 2
      },
      alert_sent: true
    },
    {
      id: 'dd0e8400-e29b-41d4-a716-446655440008',
      type: 'delivery_charge_high' as AnomalyType,
      severity: 'medium' as AnomalySeverity,
      detected_at: new Date(now.getTime() - 144 * 60 * 60 * 1000).toISOString(),
      description: 'Delivery charge $150.00 deviates 60% from historical avg $93.75',
      historical_baseline: 93.75,
      observed_value: 150.0,
      deviation_percentage: 60.0,
      data: {
        supplier_email: 'expensive@logistics.com',
        region: 'MY',
        currency: 'MYR'
      },
      alert_sent: true
    },
    {
      id: 'ee0e8400-e29b-41d4-a716-446655440009',
      type: 'price_high' as AnomalyType,
      severity: 'critical' as AnomalySeverity,
      detected_at: new Date(now.getTime() - 168 * 60 * 60 * 1000).toISOString(),
      description: 'Quote price $5,000.00 deviates 120% from 30-day avg $2,272.72',
      historical_baseline: 2272.72,
      observed_value: 5000.0,
      deviation_percentage: 120.0,
      data: {
        supplier_email: 'premium@vendor.com',
        product_name: 'CNC Machine',
        quantity: 1,
        rfq_reference: 'SG-CNC789',
        baseline_samples: 22
      },
      alert_sent: true
    }
  ];
};

export const getAnomalyTypeInfo = (type: string) => {
  const typeMap: Record<string, { name: string; category: string; icon: string }> = {
    price_high: { name: 'Price Too High', category: 'price', icon: '📈' },
    price_low: { name: 'Price Too Low', category: 'price', icon: '📉' },
    quantity_high: { name: 'Unusually High Quantity', category: 'quantity', icon: '📦' },
    quantity_low: { name: 'Unusually Low Quantity', category: 'quantity', icon: '📦' },
    vendor_response_slow: { name: 'Slow Response Time', category: 'vendor_behavior', icon: '👤' },
    vendor_rejection_streak: { name: 'Rejection Streak', category: 'vendor_behavior', icon: '👤' },
    vendor_price_spike: { name: 'Price Spike', category: 'vendor_behavior', icon: '👤' },
    delivery_long: { name: 'Long Lead Time', category: 'delivery', icon: '🚚' },
    delivery_charge_high: { name: 'High Delivery Charge', category: 'delivery', icon: '🚚' }
  };
  return typeMap[type] || { name: type, category: 'unknown', icon: '⚠️' };
};

export const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    critical: 'bg-red-500',
    high: 'bg-amber-500',
    medium: 'bg-green-500'
  };
  return colors[severity] || 'bg-gray-500';
};

export const getSeverityBadge = (severity: string) => {
  const badges: Record<string, { emoji: string; text: string; color: string }> = {
    critical: { emoji: '🔴', text: 'Critical', color: 'bg-red-100 text-red-800' },
    high: { emoji: '🟡', text: 'High', color: 'bg-amber-100 text-amber-800' },
    medium: { emoji: '🟢', text: 'Medium', color: 'bg-green-100 text-green-800' }
  };
  return badges[severity] || { emoji: '⚪', text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatPercentage = (value: number) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
};

export const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
};
