"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

interface ToolContentProps {
  tool: {
    title: string;
    href: string;
  };
}

export default function ToolContent({ tool }: ToolContentProps) {
  // Dynamically import the tool component based on the href
  const ToolComponent = dynamic(
    () => import(`../tools/${tool.href}`),
    {
      loading: () => (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ),
      ssr: false
    }
  );

  return <ToolComponent />;
} 