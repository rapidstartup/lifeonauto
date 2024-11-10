import { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, Clock, Save, Download, RefreshCcw } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category: string;
  priority: 'high' | 'medium' | 'low';
  notes: string;
}

interface ChecklistCategory {
  name: string;
  description: string;
  items: ChecklistItem[];
}

const defaultCategories: ChecklistCategory[] = [
  {
    name: "System Status",
    description: "Check core system functionality and performance",
    items: [
      {
        id: "sys1",
        text: "All automated workflows running",
        checked: false,
        category: "System Status",
        priority: "high",
        notes: ""
      },
      {
        id: "sys2",
        text: "No error notifications in last 24 hours",
        checked: false,
        category: "System Status",
        priority: "high",
        notes: ""
      },
      {
        id: "sys3",
        text: "All integrations connected",
        checked: false,
        category: "System Status",
        priority: "high",
        notes: ""
      },
      {
        id: "sys4",
        text: "Response times within normal range",
        checked: false,
        category: "System Status",
        priority: "medium",
        notes: ""
      }
    ]
  },
  {
    name: "Data Quality",
    description: "Verify data integrity and processing",
    items: [
      {
        id: "data1",
        text: "Input data arriving as expected",
        checked: false,
        category: "Data Quality",
        priority: "high",
        notes: ""
      },
      {
        id: "data2",
        text: "Output data properly formatted",
        checked: false,
        category: "Data Quality",
        priority: "high",
        notes: ""
      },
      {
        id: "data3",
        text: "No duplicate processing",
        checked: false,
        category: "Data Quality",
        priority: "medium",
        notes: ""
      }
    ]
  },
  {
    name: "Security",
    description: "Review security measures and access controls",
    items: [
      {
        id: "sec1",
        text: "Access controls current",
        checked: false,
        category: "Security",
        priority: "high",
        notes: ""
      },
      {
        id: "sec2",
        text: "Security logs reviewed",
        checked: false,
        category: "Security",
        priority: "medium",
        notes: ""
      },
      {
        id: "sec3",
        text: "Backup systems operational",
        checked: false,
        category: "Security",
        priority: "high",
        notes: ""
      }
    ]
  }
];

export default function QualityControlChecklist() {
  const [categories, setCategories] = useState<ChecklistCategory[]>(defaultCategories);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].name);
  const [checklistName, setChecklistName] = useState<string>("New Quality Control Check");
  const [checklistDate, setChecklistDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const getProgress = () => {
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const checkedItems = categories.reduce((sum, cat) => 
      sum + cat.items.filter(item => item.checked).length, 0
    );
    return {
      percentage: totalItems ? (checkedItems / totalItems) * 100 : 0,
      completed: checkedItems,
      total: totalItems
    };
  };

  const toggleItem = (categoryName: string, itemId: string) => {
    setCategories(categories.map(category => {
      if (category.name === categoryName) {
        return {
          ...category,
          items: category.items.map(item => 
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      }
      return category;
    }));
  };

  const updateNotes = (categoryName: string, itemId: string, notes: string) => {
    setCategories(categories.map(category => {
      if (category.name === categoryName) {
        return {
          ...category,
          items: category.items.map(item => 
            item.id === itemId ? { ...item, notes } : item
          )
        };
      }
      return category;
    }));
  };

  const resetChecklist = () => {
    setCategories(defaultCategories);
    setChecklistDate(new Date().toISOString().split('T')[0]);
  };

  const progress = getProgress();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <input
            type="text"
            value={checklistName}
            onChange={(e) => setChecklistName(e.target.value)}
            className="text-2xl font-bold bg-transparent border-none focus:outline-none"
          />
          <input
            type="date"
            value={checklistDate}
            onChange={(e) => setChecklistDate(e.target.value)}
            className="text-gray-600 bg-transparent border-none focus:outline-none"
          />
        </div>
        <button 
          onClick={resetChecklist}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{progress.completed} of {progress.total} tasks completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 border-b">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
              activeCategory === category.name
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Checklist Items */}
      {categories.map((category) => (
        <div
          key={category.name}
          className={`space-y-4 ${activeCategory === category.name ? '' : 'hidden'}`}
        >
          <p className="text-gray-600">{category.description}</p>
          
          {category.items.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
              <button
                onClick={() => toggleItem(category.name, item.id)}
                className="mt-1"
              >
                {item.checked ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </button>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}>
                    {item.text}
                  </span>
                  {item.priority === 'high' && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
                
                <textarea
                  placeholder="Add notes..."
                  value={item.notes}
                  onChange={(e) => updateNotes(category.name, item.id, e.target.value)}
                  className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={1}
                />
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Summary Footer */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <Clock className="w-4 h-4 inline mr-1" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded">
              <Download className="w-4 h-4 inline mr-1" />
              Export
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <Save className="w-4 h-4 inline mr-1" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
