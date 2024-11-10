"use client";

import { toolItems } from '../../data';
import { notFound } from 'next/navigation';
import { ResourceLayout } from '../../components/resource-layout';
import dynamic from 'next/dynamic';

export default function ToolPage({ params }: { params: { tool: string } }) {
  const tool = toolItems.find(t => t.href === params.tool);

  if (!tool) {
    notFound();
  }

  // Dynamically import the tool component based on the href
  const ToolComponent = dynamic(
    () => import(`../${tool.href}`),
    {
      loading: () => (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ),
    ssr: false
    }
  );

  return (
    <ResourceLayout type="tools">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">{tool.title}</h1>
        <ToolComponent />
      </div>
    </ResourceLayout>
  );
}

export async function generateStaticParams() {
  return toolItems.map((tool) => ({
    tool: tool.href,
  }));
} 