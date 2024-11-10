import { useState } from 'react';
import { 
  Plus,
  Trash2,
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileText,
  Save,
  Download
} from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  description: string;
  steps: string[];
  expectedResult: string;
  actualResult: string;
  status: 'pending' | 'passed' | 'failed' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  category: string;
  prerequisites: string[];
  notes: string;
  lastRun?: string;
}

interface TestSuite {
  id: string;
  name: string;
  description: string;
  testCases: TestCase[];
}

const defaultTestCase: TestCase = {
  id: '',
  name: '',
  description: '',
  steps: [],
  expectedResult: '',
  actualResult: '',
  status: 'pending',
  priority: 'medium',
  category: 'functional',
  prerequisites: [],
  notes: ''
};

export default function TestingFrameworkGenerator() {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([{
    id: 'default-suite',
    name: 'Default Test Suite',
    description: 'Main testing suite for automation',
    testCases: []
  }]);
  const [activeSuite, setActiveSuite] = useState<string>('default-suite');
  const [activeTestCase, setActiveTestCase] = useState<TestCase | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTestCase = () => {
    const newTestCase: TestCase = {
      ...defaultTestCase,
      id: `test-${Date.now()}`
    };
    setTestSuites(suites => 
      suites.map(suite => 
        suite.id === activeSuite 
          ? { ...suite, testCases: [...suite.testCases, newTestCase] }
          : suite
      )
    );
    setActiveTestCase(newTestCase);
    setIsEditing(true);
  };

  const updateTestCase = (updatedCase: TestCase) => {
    setTestSuites(suites =>
      suites.map(suite =>
        suite.id === activeSuite
          ? {
              ...suite,
              testCases: suite.testCases.map(test =>
                test.id === updatedCase.id ? updatedCase : test
              )
            }
          : suite
      )
    );
  };

  const addTestStep = (testId: string, step: string) => {
    if (!step.trim()) return;
    setTestSuites(suites =>
      suites.map(suite =>
        suite.id === activeSuite
          ? {
              ...suite,
              testCases: suite.testCases.map(test =>
                test.id === testId
                  ? { ...test, steps: [...test.steps, step.trim()] }
                  : test
              )
            }
          : suite
      )
    );
  };

  const removeTestStep = (testId: string, stepIndex: number) => {
    setTestSuites(suites =>
      suites.map(suite =>
        suite.id === activeSuite
          ? {
              ...suite,
              testCases: suite.testCases.map(test =>
                test.id === testId
                  ? { ...test, steps: test.steps.filter((_, i) => i !== stepIndex) }
                  : test
              )
            }
          : suite
      )
    );
  };

  const getStatusColor = (status: TestCase['status']) => {
    switch (status) {
      case 'passed': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'blocked': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityColor = (priority: TestCase['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Testing Framework Generator</h1>
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

      <div className="grid grid-cols-3 gap-6">
        {/* Test Cases List */}
        <div className="col-span-1 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Test Cases</h2>
            <button
              onClick={addTestCase}
              className="p-2 text-blue-500 hover:bg-blue-50 rounded"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            {testSuites
              .find(suite => suite.id === activeSuite)
              ?.testCases.map(test => (
                <div
                  key={test.id}
                  onClick={() => {
                    setActiveTestCase(test);
                    setIsEditing(false);
                  }}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    activeTestCase?.id === test.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{test.name || 'Unnamed Test'}</h3>
                      <p className="text-sm text-gray-500">{test.description || 'No description'}</p>
                    </div>
                    <span className={`ml-2 ${getStatusColor(test.status)}`}>
                      {test.status === 'passed' && <CheckCircle className="w-5 h-5" />}
                      {test.status === 'failed' && <XCircle className="w-5 h-5" />}
                      {test.status === 'blocked' && <AlertCircle className="w-5 h-5" />}
                      {test.status === 'pending' && <Clock className="w-5 h-5" />}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(test.priority)}`}>
                      {test.priority}
                    </span>
                    <span className="text-xs text-gray-500">{test.category}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Test Case Details */}
        <div className="col-span-2">
          {activeTestCase ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-4 flex-1">
                  <input
                    type="text"
                    value={activeTestCase.name}
                    onChange={(e) => updateTestCase({ ...activeTestCase, name: e.target.value })}
                    className="text-xl font-bold w-full bg-transparent border-none focus:outline-none"
                    placeholder="Test Case Name"
                  />
                  <textarea
                    value={activeTestCase.description}
                    onChange={(e) => updateTestCase({ ...activeTestCase, description: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Test case description"
                    rows={2}
                  />
                </div>
                <div className="space-x-2">
                  <button 
                    onClick={() => updateTestCase({ 
                      ...activeTestCase, 
                      status: 'passed',
                      lastRun: new Date().toISOString()
                    })}
                    className="p-2 text-green-500 hover:bg-green-50 rounded"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setTestSuites(suites =>
                      suites.map(suite =>
                        suite.id === activeSuite
                          ? {
                              ...suite,
                              testCases: suite.testCases.filter(t => t.id !== activeTestCase.id)
                            }
                          : suite
                      )
                    )}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={activeTestCase.priority}
                    onChange={(e) => updateTestCase({ 
                      ...activeTestCase, 
                      priority: e.target.value as TestCase['priority']
                    })}
                    className="mt-1 w-full p-2 border rounded-md"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={activeTestCase.category}
                    onChange={(e) => updateTestCase({ ...activeTestCase, category: e.target.value })}
                    className="mt-1 w-full p-2 border rounded-md"
                  >
                    <option value="functional">Functional</option>
                    <option value="integration">Integration</option>
                    <option value="performance">Performance</option>
                    <option value="security">Security</option>
                  </select>
                </div>
              </div>

              {/* Test Steps */}
              <div className="space-y-4">
                <h3 className="font-medium">Test Steps</h3>
                {activeTestCase.steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-gray-500">{index + 1}.</span>
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => {
                        const newSteps = [...activeTestCase.steps];
                        newSteps[index] = e.target.value;
                        updateTestCase({ ...activeTestCase, steps: newSteps });
                      }}
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      onClick={() => removeTestStep(activeTestCase.id, index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">{activeTestCase.steps.length + 1}.</span>
                  <input
                    type="text"
                    placeholder="Add new step"
                    className="flex-1 p-2 border rounded-md"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTestStep(activeTestCase.id, (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                </div>
              </div>

              {/* Expected Result */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Result</label>
                <textarea
                  value={activeTestCase.expectedResult}
                  onChange={(e) => updateTestCase({ 
                    ...activeTestCase, 
                    expectedResult: e.target.value 
                  })}
                  className="mt-1 w-full p-2 border rounded-md"
                  rows={2}
                />
              </div>

              {/* Actual Result */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Actual Result</label>
                <textarea
                  value={activeTestCase.actualResult}
                  onChange={(e) => updateTestCase({ 
                    ...activeTestCase, 
                    actualResult: e.target.value 
                  })}
                  className="mt-1 w-full p-2 border rounded-md"
                  rows={2}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={activeTestCase.notes}
                  onChange={(e) => updateTestCase({ 
                    ...activeTestCase, 
                    notes: e.target.value 
                  })}
                  className="mt-1 w-full p-2 border rounded-md"
                  rows={3}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">Select a test case or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
