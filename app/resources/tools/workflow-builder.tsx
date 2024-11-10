import { useState } from 'react';
import {
  Play,
  Plus,
  Save,
  Download,
  Trash2,
  Settings,
  ArrowRight,
  Box,
  Circle,
  Diamond,
  Square
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  type: 'start' | 'end' | 'process' | 'decision' | 'input' | 'output';
  label: string;
  description: string;
  x: number;
  y: number;
  connections: string[];
  config?: {
    tool?: string;
    condition?: string;
    timeEstimate?: string;
    errorHandling?: string;
  };
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  created: string;
  updated: string;
}

const defaultWorkflow: Workflow = {
  id: 'default',
  name: 'New Workflow',
  description: '',
  steps: [
    {
      id: 'start',
      type: 'start',
      label: 'Start',
      description: 'Workflow start point',
      x: 50,
      y: 50,
      connections: []
    }
  ],
  created: new Date().toISOString(),
  updated: new Date().toISOString()
};

const stepColors = {
  start: 'bg-green-500',
  end: 'bg-red-500',
  process: 'bg-blue-500',
  decision: 'bg-yellow-500',
  input: 'bg-purple-500',
  output: 'bg-indigo-500'
};

export default function WorkflowBuilder() {
  const [workflow, setWorkflow] = useState<Workflow>(defaultWorkflow);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<string | null>(null);
  
  const addStep = (type: WorkflowStep['type']) => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      description: '',
      x: 200,
      y: 200,
      connections: [],
      config: {}
    };
    
    setWorkflow({
      ...workflow,
      steps: [...workflow.steps, newStep]
    });
  };

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setWorkflow({
      ...workflow,
      steps: workflow.steps.map(step =>
        step.id === stepId ? { ...step, ...updates } : step
      )
    });
  };

  const deleteStep = (stepId: string) => {
    setWorkflow({
      ...workflow,
      steps: workflow.steps.filter(step => step.id !== stepId)
    });
    setSelectedStep(null);
  };

  const handleStepClick = (step: WorkflowStep) => {
    if (isDrawing && drawStart) {
      // Complete connection
      if (drawStart !== step.id) {
        const updatedSteps = workflow.steps.map(s => {
          if (s.id === drawStart) {
            return {
              ...s,
              connections: [...s.connections, step.id]
            };
          }
          return s;
        });
        setWorkflow({
          ...workflow,
          steps: updatedSteps
        });
      }
      setIsDrawing(false);
      setDrawStart(null);
    } else {
      setSelectedStep(step);
    }
  };

  const startDrawing = (stepId: string) => {
    setIsDrawing(true);
    setDrawStart(stepId);
  };

  const StepIcon = ({ type }: { type: WorkflowStep['type'] }) => {
    switch (type) {
      case 'start':
      case 'end':
        return <Circle className="w-6 h-6" />;
      case 'process':
        return <Square className="w-6 h-6" />;
      case 'decision':
        return <Diamond className="w-6 h-6" />;
      default:
        return <Box className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-full h-screen flex">
      {/* Tools Panel */}
      <div className="w-64 border-r p-4 space-y-4">
        <h2 className="text-lg font-semibold">Tools</h2>
        
        {/* Step Types */}
        <div className="space-y-2">
          {['process', 'decision', 'input', 'output', 'end'].map(type => (
            <button
              key={type}
              onClick={() => addStep(type as WorkflowStep['type'])}
              className={`w-full p-2 rounded flex items-center space-x-2 text-white ${
                stepColors[type as keyof typeof stepColors]
              }`}
            >
              <StepIcon type={type as WorkflowStep['type']} />
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-4 border-t space-y-2">
          <button className="w-full p-2 bg-blue-500 text-white rounded flex items-center justify-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Workflow</span>
          </button>
          <button className="w-full p-2 text-blue-500 border border-blue-500 rounded flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative bg-gray-50">
        <div className="absolute inset-0">
          {workflow.steps.map(step => (
            <div
              key={step.id}
              className={`absolute p-4 rounded-lg shadow-lg cursor-pointer ${
                stepColors[step.type]
              } text-white`}
              style={{ left: step.x, top: step.y }}
              onClick={() => handleStepClick(step)}
            >
              <div className="flex items-center space-x-2">
                <StepIcon type={step.type} />
                <span>{step.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Properties Panel */}
      {selectedStep && (
        <div className="w-80 border-l p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Properties</h2>
            <button
              onClick={() => deleteStep(selectedStep.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Label</label>
              <input
                type="text"
                value={selectedStep.label}
                onChange={(e) => updateStep(selectedStep.id, { label: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={selectedStep.description}
                onChange={(e) => updateStep(selectedStep.id, { description: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
                rows={3}
              />
            </div>

            {selectedStep.type === 'process' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Tool</label>
                <input
                  type="text"
                  value={selectedStep.config?.tool || ''}
                  onChange={(e) => updateStep(selectedStep.id, {
                    config: { ...selectedStep.config, tool: e.target.value }
                  })}
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
            )}

            {selectedStep.type === 'decision' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Condition</label>
                <input
                  type="text"
                  value={selectedStep.config?.condition || ''}
                  onChange={(e) => updateStep(selectedStep.id, {
                    config: { ...selectedStep.config, condition: e.target.value }
                  })}
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Time Estimate</label>
              <input
                type="text"
                value={selectedStep.config?.timeEstimate || ''}
                onChange={(e) => updateStep(selectedStep.id, {
                  config: { ...selectedStep.config, timeEstimate: e.target.value }
                })}
                className="mt-1 w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Error Handling</label>
              <textarea
                value={selectedStep.config?.errorHandling || ''}
                onChange={(e) => updateStep(selectedStep.id, {
                  config: { ...selectedStep.config, errorHandling: e.target.value }
                })}
                className="mt-1 w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <button
              onClick={() => startDrawing(selectedStep.id)}
              className="w-full p-2 bg-blue-500 text-white rounded flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Draw Connection</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
