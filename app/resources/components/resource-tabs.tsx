"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceSidebar from './resource-sidebar';
import { templateItems, toolItems } from '../data';
import { useRouter } from 'next/navigation';

export function ResourceTabs() {
  const router = useRouter();

  const handleTemplateClick = (href: string) => {
    router.push(`/resources/templates/${href.split('/').pop()}`);
  };

  const handleToolClick = (href: string) => {
    router.push(`/resources/tools/${href}`);
  };

  return (
    <Tabs defaultValue="templates" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="templates">Templates</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
        <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
      </TabsList>
      <TabsContent value="templates">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templateItems.map((template, index) => (
            <div
              key={index}
              className="cursor-pointer p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              onClick={() => handleTemplateClick(template.href)}
            >
              <h3 className="font-semibold mb-2">{template.title}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="tools">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolItems.map((tool, index) => (
            <div
              key={index}
              className="cursor-pointer p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              onClick={() => handleToolClick(tool.href)}
            >
              <h3 className="font-semibold mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="tutorials">
        <div className="flex items-center justify-center h-64 flex-col gap-2">
          <p className="text-2xl text-gray-500 font-semibold">Video Walk Throughs</p>
          <p className="text-xl text-gray-400">Coming Soon!</p>
        </div>
      </TabsContent>
    </Tabs>
  );
} 