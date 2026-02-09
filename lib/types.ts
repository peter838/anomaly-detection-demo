export type AnomalyType =
  | 'price_high'
  | 'price_low'
  | 'quantity_high'
  | 'quantity_low'
  | 'vendor_response_slow'
  | 'vendor_rejection_streak'
  | 'vendor_price_spike'
  | 'delivery_long'
  | 'delivery_charge_high';

export type AnomalyCategory = 'price' | 'quantity' | 'vendor_behavior' | 'delivery';

export type AnomalySeverity = 'critical' | 'high' | 'medium';

export interface AnomalyData {
  supplier_email?: string;
  product_name?: string;
  quantity?: number;
  rfq_reference?: string;
  baseline_samples?: number;
  z_score?: number;
  simple_multiplier?: number;
  slow_count?: number;
  rfq_references?: string[];
  rejection_count?: number;
  previous_price?: number;
  region?: string;
  currency?: string;
}

export interface Anomaly {
  id: string;
  type: AnomalyType;
  severity: AnomalySeverity;
  detected_at: string;
  description: string;
  historical_baseline?: number;
  observed_value?: number;
  deviation_percentage?: number;
  data: AnomalyData;
  resolved_at?: string;
  alert_sent?: boolean;
}

export interface AnomalyTypeConfig {
  id: AnomalyType;
  name: string;
  category: AnomalyCategory;
  description: string;
  threshold_config: string;
}

export interface HistoricalBaseline {
  id: string;
  baseline_type: 'price' | 'quantity' | 'delivery_time' | 'delivery_charge';
  supplier_id?: string;
  product_id?: string;
  region?: string;
  currency?: string;
  avg_value: number;
  std_dev: number;
  sample_count: number;
  min_value: number;
  max_value: number;
  calculated_at: string;
  valid_until: string;
}

export interface Alert {
  id: string;
  anomaly_id: string;
  sent_at: string;
  channel: string;
  message: string;
}
