"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/ui/navigation";
import { Card } from "@/components/ui/card";
import { ToolCard } from "./components/tool-card";

// Add these imports
import { templateItems, toolItems } from "./data";

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

          <Tabs defaultValue="templates" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templateItems.map((template, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                    <p className="text-muted-foreground mb-4">{template.description}</p>
                    {/* Add any template-specific actions here */}
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tools">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolItems.map((tool, index) => (
                  <ToolCard
                    key={index}
                    title={tool.title}
                    description={tool.description}
                    href={tool.href}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tutorials">
              <div className="grid grid-cols-1 gap-4">
                {/* Tutorial content */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}