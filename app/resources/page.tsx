"use client";

import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, FileText, Video } from "lucide-react";

const resources = [
  {
    title: "AI Tool Directory",
    description: "A comprehensive collection of vetted AI tools for various business needs, complete with implementation guides and best practices.",
    icon: Bot,
    link: "#"
  },
  {
    title: "Automation Templates",
    description: "Ready-to-use templates and workflows for common business processes, designed to get you started immediately.",
    icon: FileText,
    link: "#"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides showing you exactly how to implement the strategies from the book.",
    icon: Video,
    link: "#"
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Book Resources</h1>
            <p className="text-muted-foreground">
              Access exclusive resources to help you implement the strategies from Life on Auto
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {resources.map((resource, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <resource.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              More resources are added regularly. Check back often for updates!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}