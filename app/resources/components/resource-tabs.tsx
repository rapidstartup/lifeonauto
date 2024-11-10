"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceSidebar from './resource-sidebar';
import { templateItems, toolItems } from '../data';
import { useRouter, usePathname } from 'next/navigation';

export function ResourceTabs() {
  const pathname = usePathname();
  const currentTab = pathname.includes('/tools') ? 'tools' : 'templates';

  return (
    <Tabs defaultValue={currentTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="templates">Templates</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
        <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
      </TabsList>
      <TabsContent value="templates">
        <div className="flex gap-6 mt-6">
          <ResourceSidebar 
            items={templateItems.map(item => ({
              title: item.title,
              href: `/resources/templates/${item.href.split('/').pop()}`
            }))}
            currentPath={pathname}
            title="Templates"
          />
        </div>
      </TabsContent>
      <TabsContent value="tools">
        <div className="flex gap-6 mt-6">
          <ResourceSidebar 
            items={toolItems.map(item => ({
              title: item.title,
              href: `/resources/tools/${item.href.split('/').pop()}`
            }))}
            currentPath={pathname}
            title="Tools"
          />
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