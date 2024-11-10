import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Save, 
  Download, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface ProcessStep {
  id: string;
  action: string;
  tools: string;
  inputs: string;
  outputs: string;
  timeEstimate: string;
  notes: string;
}

interface DecisionPoint {
  id: string;
  condition: string;
  ifTrue: string;
  ifFalse: string;
}

interface ProcessDoc {
  name: string;
  owner: string;
  department: string;
  lastUpdated: string;
  purpose: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'asNeeded';
  steps: ProcessStep[];
  decisions: DecisionPoint[];
  tools: string[];
  inputs: string[];
  outputs: string[];
}

const defaultProcess: ProcessDoc = {
  name: "",
  owner: "",
  department: "",
  lastUpdated: new Date().toISOString().split('T')[0],
  purpose: "",
  frequency: "daily",
  steps: [],
  decisions: [],
  tools: [],
  inputs: [],
  outputs: []
};

export default function ProcessDocumentationGenerator() {
  const [process, setProcess] = useState<ProcessDoc>(defaultProcess);
  const [activeSection, setActiveSection] = useState<string>('basic');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const addStep = () => {
    const newStep: ProcessStep = {
      id: `step-${Date.now()}`,
      action: "",
      tools: "",
      inputs: "",
      outputs: "",
      timeEstimate: "",
      notes: ""
    };
    setProcess({ ...process, steps: [...process.steps, newStep] });
  };

  const updateStep = (stepId: string, field: keyof ProcessStep, value: string) => {
    setProcess({
      ...process,
      steps: process.steps.map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      )
    });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...process.steps];
    if (direction === 'up' && index > 0) {
      [newSteps[index], newSteps[index - 1]] = [newSteps[index - 1], newSteps[index]];
    } else if (direction === 'down' && index < newSteps.length - 1) {
      [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    }
    setProcess({ ...process, steps: newSteps });
  };

  const addDecisionPoint = () => {
    const newDecision: DecisionPoint = {
      id: `decision-${Date.now()}`,
      condition: "",
      ifTrue: "",
      ifFalse: ""
    };
    setProcess({ ...process, decisions: [...process.decisions, newDecision] });
  };

  const addArrayItem = (field: 'tools' | 'inputs' | 'outputs', value: string) => {
    if (value.trim()) {
      setProcess({ ...process, [field]: [...process[field], value.trim()] });
    }
  };

  const removeArrayItem = (field: 'tools' | 'inputs' | 'outputs', index: number) => {
    setProcess({
      ...process,
      [field]: process[field].filter((_, i) => i !== index)
    });
  };

  const validateProcess = () => {
    const errors: string[] = [];
    if (!process.name) errors.push("Process name is required");
    if (!process.owner) errors.push("Process owner is required");
    if (!process.purpose) errors.push("Process purpose is required");
    if (process.steps.length === 0) errors.push("At least one process step is required");
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSave = () => {
    if (validateProcess()) {
      // Save logic here
      console.log('Process saved:', process);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Process Documentation Generator</h1>
        <div className="space-x-2">
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Save className="w-4 h-4 inline mr-1" />
            Save
          </button>
          <button className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded">
            <Download className="w-4 h-4 inline mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b">
        {['basic', 'steps', 'decisions', 'resources'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
              activeSection === section
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="font-medium text-red-800">Please fix the following errors:</span>
          </div>
          <ul className="mt-2 list-disc list-inside text-red-600">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Basic Information Section */}
      <div className={activeSection === 'basic' ? '' : 'hidden'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Process Name</label>
              <input
                type="text"
                value={process.name}
                onChange={(e) => setProcess({ ...process, name: e.target.value })}
                className="mt-1 w-full p-2 border rounded-md"
                placeholder="Enter process name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Process Owner</label>
              <input
                type="text"
                value={process.owner}
                onChange={(e) => setProcess({ ...process, owner: e.target.value })}
                className="mt-1 w-full p-2 border rounded-md"
                placeholder="Enter process owner"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Purpose</label>
            <textarea
              value={process.purpose}
              onChange={(e) => setProcess({ ...process, purpose: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md"
              rows={3}
              placeholder="Describe the purpose of this process"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Frequency</label>
            <select
              value={process.frequency}
              onChange={(e) => setProcess({ ...process, frequency: e.target.value as ProcessDoc['frequency'] })}
              className="mt-1 w-full p-2 border rounded-md"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="asNeeded">As Needed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className={activeSection === 'steps' ? '' : 'hidden'}>
        <div className="space-y-4">
          {process.steps.map((step, index) => (
            <div key={step.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-medium">Step {index + 1}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => moveStep(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveStep(index, 'down')}
                    disabled={index === process.steps.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setProcess({
                      ...process,
                      steps: process.steps.filter(s => s.id !== step.id)
                    })}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <textarea
                  value={step.action}
                  onChange={(e) => updateStep(step.id, 'action', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Describe the action"
                  rows={2}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={step.tools}
                    onChange={(e) => updateStep(step.id, 'tools', e.target.value)}
                    className="p-2 border rounded-md"
                    placeholder="Tools used"
                  />
                  <input
                    type="text"
                    value={step.timeEstimate}
                    onChange={(e) => updateStep(step.id, 'timeEstimate', e.target.value)}
                    className="p-2 border rounded-md"
                    placeholder="Time estimate"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={step.inputs}
                    onChange={(e) => updateStep(step.id, 'inputs', e.target.value)}
                    className="p-2 border rounded-md"
                    placeholder="Required inputs"
                  />
                  <input
                    type="text"
                    value={step.outputs}
                    onChange={(e) => updateStep(step.id, 'outputs', e.target.value)}
                    className="p-2 border rounded-md"
                    placeholder="Expected outputs"
                  />
                </div>

                <textarea
                  value={step.notes}
                  onChange={(e) => updateStep(step.id, 'notes', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Additional notes"
                  rows={2}
                />
              </div>
            </div>
          ))}

          <button
            onClick={addStep}
            className="w-full p-2 text-blue-500 hover:bg-blue-50 rounded-lg border-2 border-dashed border-blue-200"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Add Step
          </button>
        </div>
      </div>

      {/* Resources Section */}
      <div className={activeSection === 'resources' ? '' : 'hidden'}>
        <div className="space-y-6">
          {['tools', 'inputs', 'outputs'].map((resourceType) => (
            <div key={resourceType} className="space-y-2">
              <h3 className="text-lg font-medium capitalize">{resourceType}</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Add ${resourceType}`}
                  className="flex-1 p-2 border rounded-md"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addArrayItem(
                        resourceType as 'tools' | 'inputs' | 'outputs',
                        (e.target as HTMLInputElement).value
                      );
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.querySelector(`input[placeholder="Add ${resourceType}"]`) as HTMLInputElement;
                    addArrayItem(
                      resourceType as 'tools' | 'inputs' | 'outputs',
                      input.value
                    );
                    input.value = '';
                  }}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {process[resourceType as 'tools' | 'inputs' | 'outputs'].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
                  >
                    <span>{item}</span>
                    <button
                      onClick={() => removeArrayItem(
                        resourceType as 'tools' | 'inputs' | 'outputs',
                        index
                      )}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
