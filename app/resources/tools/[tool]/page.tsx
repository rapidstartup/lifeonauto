"use client";

import { toolItems } from '../../data';
import { notFound } from 'next/navigation';
import { ResourceLayout } from '../../components/resource-layout';
import ToolContent from '../../components/tool-content';

export default function ToolPage({ params }: { params: { tool: string } }) {
  const tool = toolItems.find(t => t.href === params.tool);

  if (!tool) {
    notFound();
  }

  return (
    <ResourceLayout type="tools">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">{tool.title}</h1>
        <ToolContent tool={tool} />
      </div>
    </ResourceLayout>
  );
}

export async function generateStaticParams() {
  return toolItems.map((tool) => ({
    tool: tool.href,
  }));
} 