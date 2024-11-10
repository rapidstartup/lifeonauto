export const templateItems = [
  {
    title: "Change Log Template",
    description: "Template for tracking changes and updates",
    href: "/resources/templates/change-log-template.md"
  },
  {
    title: "System Documentation Template",
    description: "Standardized system documentation format",
    href: "/resources/templates/system-documentation-template.md"
  },
  {
    title: "Testing Framework Template",
    description: "Template for test case documentation",
    href: "/resources/templates/testing-framework-template.md"
  },
  {
    title: "Tool Selection Worksheet",
    description: "Guide for evaluating and selecting tools",
    href: "/resources/templates/tool-selection-worksheet.md"
  },
  {
    title: "Update Planning Guide",
    description: "Template for planning system updates",
    href: "/resources/templates/update-planning-guide-template.md"
  },
  {
    title: "Workflow Template",
    description: "Standard workflow documentation template",
    href: "/resources/templates/workflow-template.md"
  },
  {
    title: "Task Analysis Template",
    description: "Template for analyzing task requirements",
    href: "/resources/templates/task-analysis-template.md"
  }
];

interface ToolItem {
  id: string;
  title: string;
  description: string;
  href: string;
  component: React.ComponentType;
}

export const toolItems: ToolItem[] = [
  {
    id: "ai-prompt-builder",
    title: "AI Prompt Builder",
    description: "Create and manage AI prompts for various use cases",
    href: "ai-prompt-builder",
    component: () => null
  },
  {
    id: "automation-monitor-dashboard",
    title: "Automation Monitor",
    description: "Monitor and manage automation workflows",
    href: "automation-monitor-dashboard",
    component: () => null
  },
  {
    id: "cost-calculator-component",
    title: "Cost Calculator",
    description: "Calculate automation implementation costs",
    href: "cost-calculator-component",
    component: () => null
  },
  {
    id: "document-generator",
    title: "Document Generator",
    description: "Generate standardized documentation",
    href: "document-generator",
    component: () => null
  },
  {
    id: "documentation-hub",
    title: "Documentation Hub",
    description: "Centralized documentation management",
    href: "documentation-hub",
    component: () => null
  },
  {
    id: "enhanced-prompt-generator",
    title: "Enhanced Prompt Generator",
    description: "Advanced AI prompt generation and management",
    href: "enhanced-prompt-generator",
    component: () => null
  },
  {
    id: "integration-manager-complete",
    title: "Integration Manager",
    description: "Manage system integrations and connections",
    href: "integration-manager-complete",
    component: () => null
  },
  {
    id: "process-documentation-generator",
    title: "Process Documentation Generator",
    description: "Create detailed process documentation",
    href: "process-documentation-generator",
    component: () => null
  },
  {
    id: "roi-calculator-component",
    title: "ROI Calculator",
    description: "Calculate automation ROI and benefits",
    href: "roi-calculator-component",
    component: () => null
  },
  {
    id: "task-scheduler-complete-fixed",
    title: "Task Scheduler",
    description: "Schedule and manage automated tasks",
    href: "task-scheduler-complete-fixed",
    component: () => null
  },
  {
    id: "testing-framework-generator",
    title: "Testing Framework Generator",
    description: "Generate comprehensive test frameworks",
    href: "testing-framework-generator",
    component: () => null
  },
  {
    id: "workflow-builder",
    title: "Workflow Builder",
    description: "Build and visualize automation workflows",
    href: "workflow-builder",
    component: () => null
  }
]; 