import { toolItems } from '../../data';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/ui/navigation';
import { ResourceTabs } from '../../components/resource-tabs';

export default function ToolPage({ params }: { params: { tool: string } }) {
  const tool = toolItems.find(t => t.id === params.tool);

  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 pt-24">
        <ResourceTabs />
        <div className="mt-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-4">{tool.title}</h1>
            <ToolComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return toolItems.map((tool) => ({
    tool: tool.id,
  }));
} 