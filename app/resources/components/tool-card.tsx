"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
}

export function ToolCard({ title, description, href }: ToolCardProps) {
  // Dynamically import the tool component
  const ToolComponent = dynamic(() => import(`../tools/${href}`), {
    loading: () => <div>Loading...</div>,
    ssr: false
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-muted-foreground">
          {description}
        </p>
      </CardHeader>
      <CardContent>
        <ToolComponent />
      </CardContent>
    </Card>
  );
} 