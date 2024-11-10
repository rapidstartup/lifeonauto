"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//import { TemplateViewer } from "./template-viewer";
import { ToolCard } from "./tool-card";
import AIPromptBuilder from '../tools/ai-prompt-builder';
import AutomationMonitorDashboard from '../tools/automation-monitor-dashboard';
import CostCalculator from '../tools/cost-calculator-component';
import DocumentGenerator from '../tools/document-generator';
import DocumentationHub from '../tools/documentation-hub';
import EnhancedPromptGenerator from '../tools/enhanced-prompt-generator';
import IntegrationManager from '../tools/integration-manager-complete';
import ProcessDocumentationGenerator from '../tools/process-documentation-generator';
import ROICalculator from '../tools/roi-calculator-component';
import TaskScheduler from '../tools/task-scheduler-complete-fixed';
import TestingFrameworkGenerator from '../tools/testing-framework-generator';
import WorkflowBuilder from '../tools/workflow-builder';

interface ResourceTabsProps {
  type: "templates" | "tools";
}

// Define types for our items
interface Template {
  title: string;
  category: string;
  chapter: string;
  path: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
}

interface Templates {
  [key: string]: Template;
}

interface Tools {
  [key: string]: Tool;
}

const tools: Tool[] = [
  {
    id: 'ai-prompt-builder',
    name: 'AI Prompt Builder',
    description: 'Create and manage AI prompts for various use cases',
    component: AIPromptBuilder
  },
  {
    id: 'automation-monitor',
    name: 'Automation Monitor',
    description: 'Monitor and manage automation workflows',
    component: AutomationMonitorDashboard
  },
  {
    id: 'cost-calculator',
    name: 'Cost Calculator',
    description: 'Calculate automation implementation costs',
    component: CostCalculator
  },
  {
    id: 'document-generator',
    name: 'Document Generator',
    description: 'Generate standardized documentation',
    component: DocumentGenerator
  },
  {
    id: 'documentation-hub',
    name: 'Documentation Hub',
    description: 'Centralized documentation management',
    component: DocumentationHub
  },
  {
    id: 'enhanced-prompt-generator',
    name: 'Enhanced Prompt Generator',
    description: 'Advanced AI prompt generation and management',
    component: EnhancedPromptGenerator
  },
  {
    id: 'integration-manager',
    name: 'Integration Manager',
    description: 'Manage system integrations and connections',
    component: IntegrationManager
  },
  {
    id: 'process-documentation',
    name: 'Process Documentation Generator',
    description: 'Create detailed process documentation',
    component: ProcessDocumentationGenerator
  },
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    description: 'Calculate automation ROI and benefits',
    component: ROICalculator
  },
  {
    id: 'task-scheduler',
    name: 'Task Scheduler',
    description: 'Schedule and manage automation tasks',
    component: TaskScheduler
  },
  {
    id: 'testing-framework',
    name: 'Testing Framework Generator',
    description: 'Create comprehensive testing frameworks',
    component: TestingFrameworkGenerator
  },
  {
    id: 'workflow-builder',
    name: 'Workflow Builder',
    description: 'Visual workflow creation and management',
    component: WorkflowBuilder
  }
];

export function ResourceTabs({ type }: ResourceTabsProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const templates: Templates = {
    "task-analysis": {
      title: "Task Analysis Template",
      category: "Templates & Worksheets",
      chapter: "Ch 2, 3",
      path: "/resources/templates/task-analysis-template.md"
    },
    "process-documentation": {
      title: "Process Documentation Worksheet",
      category: "Templates & Worksheets",
      chapter: "Ch 3",
      path: "/resources/templates/process-documentation-template.md"
    },
    "tool-selection": {
      title: "Tool Selection Worksheet",
      category: "Templates & Worksheets",
      chapter: "Ch 4",
      path: "/resources/templates/tool-selection-worksheet.md"
    },
    "workflow": {
      title: "Workflow Template",
      category: "Templates & Worksheets",
      chapter: "Ch 5",
      path: "/resources/templates/workflow-template.md"
    },
    "system-documentation": {
      title: "System Documentation Template",
      category: "Documentation",
      chapter: "Ch 6",
      path: "/resources/templates/system-documentation-template.md"
    },
    "testing-framework": {
      title: "Testing Framework Template",
      category: "Guides & Frameworks",
      chapter: "Ch 6",
      path: "/resources/templates/testing-framework-template.md"
    },
    "quality-control": {
      title: "Quality Control Checklist",
      category: "Checklists",
      chapter: "Ch 6",
      path: "/resources/templates/quality-control-checklist.md"
    },
    "problem-report": {
      title: "Problem Report Template",
      category: "Documentation",
      chapter: "Ch 7",
      path: "/resources/templates/problem-report-template.md"
    },
    "emergency-response": {
      title: "Emergency Response Guide",
      category: "Guides & Frameworks",
      chapter: "Ch 7",
      path: "/resources/templates/emergency-response-guide-template.md"
    },
    "optimization": {
      title: "Optimization Checklist",
      category: "Checklists",
      chapter: "Ch 7",
      path: "/resources/templates/optimization-checklist.md"
    },
    "future-proofing": {
      title: "Future-Proofing Checklist",
      category: "Checklists",
      chapter: "Ch 8",
      path: "/resources/templates/future-proofing-checklist.md"
    },
    "update-planning": {
      title: "Update Planning Guide",
      category: "Guides & Frameworks",
      chapter: "Ch 8",
      path: "/resources/templates/update-planning-guide-template.md"
    },
    "getting-started": {
      title: "Getting Started Guide",
      category: "Guides & Frameworks",
      chapter: "Ch 4",
      path: "/resources/templates/getting-started-guide-template.md"
    }
  };

  const items = type === "templates" ? templates : tools;

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {['templates', 'tools', 'guides'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedTool(null);
              }}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'tools' && (
          <div>
            {!selectedTool ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <h3 className="font-medium">{tool.name}</h3>
                    <p className="text-sm text-gray-500">{tool.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="mb-4 text-blue-500 hover:text-blue-600"
                >
                  ← Back to Tools
                </button>
                <selectedTool.component />
              </div>
            )}
          </div>
        )}

        {/* Other tab content remains unchanged */}
        {activeTab === 'templates' && (
          <div>
            {/* Template content */}
          </div>
        )}
        
        {activeTab === 'guides' && (
          <div>
            {/* Guide content */}
          </div>
        )}
      </div>
    </div>
  );
} 