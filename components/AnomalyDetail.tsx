import { Anomaly } from '@/lib/types';
import { getAnomalyTypeInfo, getSeverityBadge, formatCurrency, formatPercentage } from '@/lib/mockData';
import { ArrowRight, Download, CheckCircle2 } from 'lucide-react';

interface AnomalyDetailProps {
  anomaly: Anomaly;
}

export default function AnomalyDetail({ anomaly }: AnomalyDetailProps) {
  const typeInfo = getAnomalyTypeInfo(anomaly.type);
  const severity = getSeverityBadge(anomaly.severity);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${severity.color}`}>
            {severity.emoji} {severity.text}
          </span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
              <CheckCircle2 className="w-4 h-4" />
              Mark Resolved
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {severity.emoji} {typeInfo.name}
        </h1>
        <p className="text-gray-600 mt-2">{anomaly.description}</p>
      </div>

      {/* Comparison Cards */}
      {anomaly.observed_value && anomaly.historical_baseline && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-sm text-gray-500 mb-2">Observed Value</div>
            <div className="text-2xl font-bold text-gray-900">
              {anomaly.type.includes('price') || anomaly.type.includes('charge')
                ? formatCurrency(anomaly.observed_value, anomaly.data.currency || 'USD')
                : anomaly.observed_value.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-sm text-gray-500 mb-2">Historical Average</div>
            <div className="text-2xl font-bold text-gray-900">
              {anomaly.type.includes('price') || anomaly.type.includes('charge')
                ? formatCurrency(anomaly.historical_baseline, anomaly.data.currency || 'USD')
                : anomaly.historical_baseline.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
        <div className="space-y-3">
          {anomaly.data.supplier_email && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Supplier Email</span>
              <span className="text-sm font-medium text-gray-900">{anomaly.data.supplier_email}</span>
            </div>
          )}
          {anomaly.data.product_name && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Product Name</span>
              <span className="text-sm font-medium text-gray-900">{anomaly.data.product_name}</span>
            </div>
          )}
          {anomaly.data.rfq_reference && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">RFQ Reference</span>
              <span className="text-sm font-medium text-gray-900">{anomaly.data.rfq_reference}</span>
            </div>
          )}
          {anomaly.data.quantity !== undefined && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Quantity</span>
              <span className="text-sm font-medium text-gray-900">{anomaly.data.quantity.toLocaleString()}</span>
            </div>
          )}
          {anomaly.data.baseline_samples && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Baseline Samples</span>
              <span className="text-sm font-medium text-gray-900">{anomaly.data.baseline_samples}</span>
            </div>
          )}
          {anomaly.deviation_percentage !== undefined && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Deviation</span>
              <span className={`text-sm font-medium ${Math.abs(anomaly.deviation_percentage) > 50 ? 'text-red-600' : 'text-gray-900'}`}>
                {formatPercentage(anomaly.deviation_percentage)}
              </span>
            </div>
          )}
          <div className="flex justify-between py-2">
            <span className="text-sm text-gray-500">Detected At</span>
            <span className="text-sm font-medium text-gray-900">{new Date(anomaly.detected_at).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h2>
        <ul className="space-y-2">
          {anomaly.type.includes('price') && (
            <>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Verify quote accuracy with vendor</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Check if product specifications changed</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Compare with other supplier quotes</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Document investigation findings</span>
              </li>
            </>
          )}
          {anomaly.type.includes('vendor') && (
            <>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Contact vendor to understand issues</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Review vendor performance history</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Consider adding to watchlist</span>
              </li>
            </>
          )}
          {anomaly.type.includes('quantity') && (
            <>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Confirm with requester if quantity is correct</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Check if bulk discount applies</span>
              </li>
            </>
          )}
          {anomaly.type.includes('delivery') && (
            <>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Verify delivery terms with vendor</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Compare with alternative delivery options</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Alert History */}
      {anomaly.alert_sent && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alert History</h2>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-green-600">✓</span>
            Alert sent to #engineering-product at {new Date(anomaly.detected_at).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
