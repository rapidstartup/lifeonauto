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
import ResourceSidebar from './resource-sidebar';
import { templateItems } from '../data';
import { toolItems } from '../data';

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

export function ResourceTabs() {
  return (
    <Tabs defaultValue="templates" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="templates">Templates</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
        <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
      </TabsList>
      <TabsContent value="templates">
        <div className="flex gap-6 mt-6">
          <ResourceSidebar 
            items={templateItems}
            currentPath={window.location.pathname}
            title="Templates"
          />
          <div className="flex-1">
            {/* Content will be rendered by the page component */}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="tools">
        <div className="flex gap-6 mt-6">
          <ResourceSidebar 
            items={toolItems}
            currentPath={window.location.pathname}
            title="Tools"
          />
          <div className="flex-1">
            {/* Content will be rendered by the page component */}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="tutorials">
        <div className="flex items-center justify-center h-64">
          <p className="text-2xl text-gray-500 font-semibold">Coming Soon!</p>
        </div>
      </TabsContent>
    </Tabs>
  );
} 