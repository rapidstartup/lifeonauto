import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { 
  Activity,
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Settings, 
  RefreshCw,
  ArrowDown,
  ArrowUp,
  Battery,
  Zap,
  XCircle 
} from 'lucide-react';

interface AutomationStatus {
  id: string;
  name: string;
  status: 'running' | 'failed' | 'warning' | 'stopped';
  lastRun: string;
  nextRun: string;
  successRate: number;
  averageRuntime: number;
  errors: number;
  category: string;
}

interface PerformanceMetric {
  timestamp: string;
  executions: number;
  errors: number;
  runtime: number;
}

const mockAutomations: AutomationStatus[] = [
  {
    id: 'auto-1',
    name: 'Customer Data Processing',
    status: 'running',
    lastRun: '2024-02-20T10:00:00',
    nextRun: '2024-02-20T11:00:00',
    successRate: 98.5,
    averageRuntime: 45,
    errors: 2,
    category: 'data'
  },
  {
    id: 'auto-2',
    name: 'Invoice Generation',
    status: 'warning',
    lastRun: '2024-02-20T09:30:00',
    nextRun: '2024-02-20T10:30:00',
    successRate: 95.0,
    averageRuntime: 60,
    errors: 5,
    category: 'finance'
  }
];

const mockPerformanceData: PerformanceMetric[] = Array.from({ length: 24 }, (_, i) => ({
  timestamp: `${i}:00`,
  executions: Math.floor(Math.random() * 100),
  errors: Math.floor(Math.random() * 5),
  runtime: 30 + Math.random() * 30
}));

export default function AutomationMonitorDashboard() {
  const [automations] = useState<AutomationStatus[]>(mockAutomations);
  const [performanceData] = useState<PerformanceMetric[]>(mockPerformanceData);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusIcon = (status: AutomationStatus['status']) => {
    switch (status) {
      case 'running':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'stopped':
        return <Clock className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeColor = (status: AutomationStatus['status']) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'stopped':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Automation Monitor</h1>
        <div className="space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Automations</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <ArrowUp className="w-4 h-4 mr-1" />
            <span>2 more than yesterday</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold">98.5%</p>
            </div>
            <Battery className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <ArrowUp className="w-4 h-4 mr-1" />
            <span>1.2% improvement</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Executions</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="mt-2 flex items-center text-sm text-red-600">
            <ArrowDown className="w-4 h-4 mr-1" />
            <span>5% decrease</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Runtime</p>
              <p className="text-2xl font-bold">45s</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <ArrowUp className="w-4 h-4 mr-1" />
            <span>10% faster</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="col-span-2 p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold">Performance Overview</h2>
            <div className="space-x-2">
              {['24h', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as typeof timeRange)}
                  className={`px-3 py-1 rounded ${
                    timeRange === range
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <LineChart width={700} height={300} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="executions"
              stroke="#3b82f6"
              name="Executions"
            />
            <Line
              type="monotone"
              dataKey="errors"
              stroke="#ef4444"
              name="Errors"
            />
            <Line
              type="monotone"
              dataKey="runtime"
              stroke="#8b5cf6"
              name="Runtime (s)"
            />
          </LineChart>
        </div>

        {/* Status List */}
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="font-semibold mb-4">Automation Status</h2>
          <div className="space-y-4">
            {automations.map((automation) => (
              <div
                key={automation.id}
                className="p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(automation.status)}
                    <div>
                      <h3 className="font-medium">{automation.name}</h3>
                      <p className="text-sm text-gray-500">
                        Last run: {new Date(automation.lastRun).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(
                      automation.status
                    )}`}
                  >
                    {automation.status}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm text-gray-600">
                  <div>
                    <p className="font-medium">{automation.successRate}%</p>
                    <p className="text-xs">Success Rate</p>
                  </div>
                  <div>
                    <p className="font-medium">{automation.averageRuntime}s</p>
                    <p className="text-xs">Avg Runtime</p>
                  </div>
                  <div>
                    <p className="font-medium">{automation.errors}</p>
                    <p className="text-xs">Errors</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
