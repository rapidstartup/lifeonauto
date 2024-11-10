"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/ui/navigation";
import { ResourceTabs } from "./components/resource-tabs";
import { Card } from "@/components/ui/card";

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
              <ResourceTabs type="templates" />
            </TabsContent>
            
            <TabsContent value="tools">
              <ResourceTabs type="tools" />
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