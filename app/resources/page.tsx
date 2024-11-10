"use client";

import { Navigation } from "@/components/ui/navigation";
import { ResourceTabs } from "./components/resource-tabs";

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
          <ResourceTabs />
        </div>
      </main>
    </div>
  );
}