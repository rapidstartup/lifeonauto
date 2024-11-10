"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolCardProps {
  tool: {
    title: string;
    category: string;
    chapter: string;
    component: string;
  };
}

export function ToolCard({ tool }: ToolCardProps) {
  // Dynamically import the tool component
  const ToolComponent = dynamic(() => import(`../tools/${tool.component}`));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tool.title}</CardTitle>
        <p className="text-muted-foreground">
          {tool.category} • {tool.chapter}
        </p>
      </CardHeader>
      <CardContent>
        <ToolComponent />
      </CardContent>
    </Card>
  );
} 