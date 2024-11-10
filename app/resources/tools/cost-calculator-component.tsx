import { useState } from 'react';
import { Calculator, PlusCircle, MinusCircle, RefreshCcw } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface CostCategory {
  name: string;
  items: {
    description: string;
    oneTime: number;
    monthly: number;
  }[];
}

interface CostSummary {
  totalOneTime: number;
  totalMonthly: number;
  firstYearTotal: number;
  monthlyRunRate: number;
}

const defaultCategories: CostCategory[] = [
  {
    name: "Software & Tools",
    items: [
      { description: "Main Automation Tool", oneTime: 0, monthly: 0 },
      { description: "Additional Licenses", oneTime: 0, monthly: 0 }
    ]
  },
  {
    name: "Implementation",
    items: [
      { description: "Setup & Configuration", oneTime: 0, monthly: 0 },
      { description: "Training", oneTime: 0, monthly: 0 }
    ]
  },
  {
    name: "Maintenance",
    items: [
      { description: "Regular Updates", oneTime: 0, monthly: 0 },
      { description: "Support", oneTime: 0, monthly: 0 }
    ]
  }
];

export default function CostCalculator() {
  const [categories, setCategories] = useState<CostCategory[]>(defaultCategories);
  const [summary, setSummary] = useState<CostSummary>({
    totalOneTime: 0,
    totalMonthly: 0,
    firstYearTotal: 0,
    monthlyRunRate: 0
  });

  const calculateSummary = (cats: CostCategory[]) => {
    const totalOneTime = cats.reduce((sum, category) => 
      sum + category.items.reduce((catSum, item) => catSum + item.oneTime, 0), 0
    );

    const totalMonthly = cats.reduce((sum, category) => 
      sum + category.items.reduce((catSum, item) => catSum + item.monthly, 0), 0
    );

    setSummary({
      totalOneTime,
      totalMonthly,
      firstYearTotal: totalOneTime + (totalMonthly * 12),
      monthlyRunRate: totalMonthly
    });
  };

  const updateCost = (
    categoryIndex: number,
    itemIndex: number,
    field: 'oneTime' | 'monthly',
    value: number
  ) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items[itemIndex][field] = value;
    setCategories(newCategories);
    calculateSummary(newCategories);
  };

  const addItemToCategory = (categoryIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items.push({
      description: `New Item ${newCategories[categoryIndex].items.length + 1}`,
      oneTime: 0,
      monthly: 0
    });
    setCategories(newCategories);
  };

  const removeItemFromCategory = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items.splice(itemIndex, 1);
    setCategories(newCategories);
    calculateSummary(newCategories);
  };

  const addCategory = () => {
    setCategories([...categories, {
      name: `New Category ${categories.length + 1}`,
      items: [{ description: "New Item", oneTime: 0, monthly: 0 }]
    }]);
  };

  const updateCategoryName = (index: number, name: string) => {
    const newCategories = [...categories];
    newCategories[index].name = name;
    setCategories(newCategories);
  };

  const getChartData = () => {
    const yearlyData = Array.from({ length: 12 }, (_, month) => ({
      month: `Month ${month + 1}`,
      total: summary.totalOneTime + (summary.totalMonthly * (month + 1))
    }));
    return yearlyData;
  };

  const resetCalculator = () => {
    setCategories(defaultCategories);
    setSummary({
      totalOneTime: 0,
      totalMonthly: 0,
      firstYearTotal: 0,
      monthlyRunRate: 0
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Automation Cost Calculator</h1>
        <div className="space-x-2">
          <button 
            onClick={resetCalculator}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cost Categories */}
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={category.name}
              onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
              className="text-xl font-semibold bg-transparent border-none focus:outline-none"
            />
            <button
              onClick={() => addItemToCategory(categoryIndex)}
              className="text-blue-500 hover:text-blue-600"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>

          {category.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex space-x-4 items-center">
              <input
                type="text"
                value={item.description}
                onChange={(e) => {
                  const newCategories = [...categories];
                  newCategories[categoryIndex].items[itemIndex].description = e.target.value;
                  setCategories(newCategories);
                }}
                className="flex-1 p-2 border rounded"
                placeholder="Description"
              />
              <input
                type="number"
                value={item.oneTime}
                onChange={(e) => updateCost(categoryIndex, itemIndex, 'oneTime', Number(e.target.value))}
                className="w-32 p-2 border rounded"
                placeholder="One-time cost"
                min="0"
                step="0.01"
              />
              <input
                type="number"
                value={item.monthly}
                onChange={(e) => updateCost(categoryIndex, itemIndex, 'monthly', Number(e.target.value))}
                className="w-32 p-2 border rounded"
                placeholder="Monthly cost"
                min="0"
                step="0.01"
              />
              {category.items.length > 1 && (
                <button
                  onClick={() => removeItemFromCategory(categoryIndex, itemIndex)}
                  className="text-red-500 hover:text-red-600"
                >
                  <MinusCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={addCategory}
        className="w-full p-2 text-blue-500 hover:bg-blue-50 rounded-lg border-2 border-dashed border-blue-200"
      >
        Add Category
      </button>

      {/* Cost Summary */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cost Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">One-time Costs</p>
            <p className="text-2xl font-bold">${summary.totalOneTime.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">Monthly Costs</p>
            <p className="text-2xl font-bold">${summary.totalMonthly.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">First Year Total</p>
            <p className="text-2xl font-bold">${summary.firstYearTotal.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">Monthly Run Rate</p>
            <p className="text-2xl font-bold">${summary.monthlyRunRate.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        <BarChart width={600} height={300} data={getChartData()} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3b82f6" name="Cumulative Cost" />
        </BarChart>
      </div>
    </div>
  );
}
