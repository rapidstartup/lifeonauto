import { useState } from 'react';
import { Save, FileDown, RefreshCcw, Calculator } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface CostItem {
  description: string;
  amount: number;
}

interface ROIData {
  projectName: string;
  oneTimeCosts: CostItem[];
  recurringCosts: CostItem[];
  timeSavings: {
    taskName: string;
    hoursPerMonth: number;
    costPerHour: number;
  }[];
  assumptions: {
    workingHoursPerMonth: number;
    numberOfUsers: number;
    implementationMonths: number;
  };
}

const defaultData: ROIData = {
  projectName: '',
  oneTimeCosts: [
    { description: 'Software/Tools', amount: 0 },
    { description: 'Implementation', amount: 0 },
    { description: 'Training', amount: 0 },
    { description: 'Documentation', amount: 0 }
  ],
  recurringCosts: [
    { description: 'Monthly Licenses', amount: 0 },
    { description: 'Maintenance', amount: 0 },
    { description: 'Support', amount: 0 }
  ],
  timeSavings: [
    { taskName: 'Task 1', hoursPerMonth: 0, costPerHour: 0 }
  ],
  assumptions: {
    workingHoursPerMonth: 160,
    numberOfUsers: 1,
    implementationMonths: 3
  }
};

export default function ROICalculator() {
  const [data, setData] = useState<ROIData>(defaultData);
  const [calculations, setCalculations] = useState({
    totalInvestment: 0,
    annualSavings: 0,
    roi: 0,
    paybackMonths: 0
  });

  // Calculation function called whenever data changes
  const calculateROI = () => {
    const totalOneTime = data.oneTimeCosts.reduce((sum, item) => sum + item.amount, 0);
    const totalRecurring = data.recurringCosts.reduce((sum, item) => sum + (item.amount * 12), 0);
    const totalInvestment = totalOneTime + totalRecurring;

    const annualSavings = data.timeSavings.reduce((sum, task) => 
      sum + (task.hoursPerMonth * task.costPerHour * 12), 0);

    const roi = totalInvestment > 0 ? ((annualSavings - totalInvestment) / totalInvestment) * 100 : 0;
    const paybackMonths = annualSavings > 0 ? (totalInvestment / (annualSavings / 12)) : 0;

    setCalculations({
      totalInvestment,
      annualSavings,
      roi,
      paybackMonths
    });
  };

  const updateCost = (
    index: number,
    field: 'amount' | 'description',
    value: number | string,
    type: 'oneTime' | 'recurring'
  ) => {
    const newData = { ...data };
    const costItem = {
      description: typeof value === 'string' ? value : String(value),
      amount: typeof value === 'number' ? value : Number(value)
    };

    if (type === 'oneTime') {
      newData.oneTimeCosts[index] = {
        ...newData.oneTimeCosts[index],
        [field]: field === 'amount' ? Number(value) : String(value)
      };
    } else {
      newData.recurringCosts[index] = {
        ...newData.recurringCosts[index],
        [field]: field === 'amount' ? Number(value) : String(value)
      };
    }
    
    setData(newData);
    calculateROI();
  };

  const updateTimeSaving = (index: number, field: keyof typeof data.timeSavings[0], value: number | string) => {
    const newData = { ...data };
    newData.timeSavings[index] = {
      ...newData.timeSavings[index],
      [field]: field === 'taskName' ? String(value) : Number(value)
    };
    setData(newData);
    calculateROI();
  };

  const addTimeSavingRow = () => {
    setData({
      ...data,
      timeSavings: [...data.timeSavings, { taskName: `Task ${data.timeSavings.length + 1}`, hoursPerMonth: 0, costPerHour: 0 }]
    });
  };

  const getChartData = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    return months.map(month => ({
      month: `Month ${month}`,
      costs: calculations.totalInvestment / 12 * month,
      savings: calculations.annualSavings / 12 * month
    }));
  };

  const resetCalculator = () => {
    setData(defaultData);
    setCalculations({
      totalInvestment: 0,
      annualSavings: 0,
      roi: 0,
      paybackMonths: 0
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ROI Calculator</h1>
        <div className="space-x-2">
          <button 
            onClick={resetCalculator} 
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Project Information */}
      <input
        type="text"
        placeholder="Project Name"
        value={data.projectName}
        onChange={(e) => {
          setData({ ...data, projectName: e.target.value });
          calculateROI();
        }}
        className="w-full p-2 border rounded"
      />

      {/* One-time Costs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">One-time Costs</h2>
        {data.oneTimeCosts.map((cost, index) => (
          <div key={index} className="flex space-x-4">
            <input
              type="text"
              value={cost.description}
              onChange={(e) => updateCost(index, 'description', e.target.value, 'oneTime')}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              value={cost.amount}
              onChange={(e) => updateCost(index, 'amount', Number(e.target.value), 'oneTime')}
              className="w-32 p-2 border rounded"
              min="0"
              step="0.01"
            />
          </div>
        ))}
      </div>

      {/* Recurring Costs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Monthly Recurring Costs</h2>
        {data.recurringCosts.map((cost, index) => (
          <div key={index} className="flex space-x-4">
            <input
              type="text"
              value={cost.description}
              onChange={(e) => updateCost(index, 'description', e.target.value, 'recurring')}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              value={cost.amount}
              onChange={(e) => updateCost(index, 'amount', Number(e.target.value), 'recurring')}
              className="w-32 p-2 border rounded"
              min="0"
              step="0.01"
            />
          </div>
        ))}
      </div>

      {/* Time Savings */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Time Savings</h2>
          <button
            onClick={addTimeSavingRow}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
        {data.timeSavings.map((task, index) => (
          <div key={index} className="flex space-x-4">
            <input
              type="text"
              value={task.taskName}
              onChange={(e) => updateTimeSaving(index, 'taskName', e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Task Name"
            />
            <input
              type="number"
              value={task.hoursPerMonth}
              onChange={(e) => updateTimeSaving(index, 'hoursPerMonth', Number(e.target.value))}
              className="w-32 p-2 border rounded"
              placeholder="Hours/Month"
              min="0"
              step="0.5"
            />
            <input
              type="number"
              value={task.costPerHour}
              onChange={(e) => updateTimeSaving(index, 'costPerHour', Number(e.target.value))}
              className="w-32 p-2 border rounded"
              placeholder="Cost/Hour"
              min="0"
              step="0.01"
            />
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">ROI Analysis</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Total Investment</p>
            <p className="text-2xl font-bold">${calculations.totalInvestment.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">Annual Savings</p>
            <p className="text-2xl font-bold">${calculations.annualSavings.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">ROI</p>
            <p className="text-2xl font-bold">{calculations.roi.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-gray-600">Payback Period</p>
            <p className="text-2xl font-bold">{calculations.paybackMonths.toFixed(1)} months</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        <LineChart width={600} height={300} data={getChartData()} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="costs" stroke="#ef4444" name="Cumulative Costs" />
          <Line type="monotone" dataKey="savings" stroke="#22c55e" name="Cumulative Savings" />
        </LineChart>
      </div>
    </div>
  );
}
