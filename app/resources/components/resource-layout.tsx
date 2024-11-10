"use client";

import { Navigation } from "@/components/ui/navigation";
import ResourceSidebar from './resource-sidebar';
import { templateItems, toolItems } from '../data';
import { usePathname } from 'next/navigation';

interface ResourceLayoutProps {
  children: React.ReactNode;
  type: 'templates' | 'tools';
}

export function ResourceLayout({ children, type }: ResourceLayoutProps) {
  const pathname = usePathname();
  const items = type === 'templates' ? templateItems : toolItems;

  const sidebarItems = items.map(item => {
    if (type === 'templates') {
      return {
        title: item.title,
        href: `/resources/templates/${item.href.split('/').pop()}`
      };
    } else {
      return {
        title: item.title,
        href: `/resources/tools/${(item as typeof toolItems[0]).href}`
      };
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 pt-24">
        <div className="flex gap-6">
          <ResourceSidebar 
            items={sidebarItems}
            currentPath={pathname}
            title={type === 'templates' ? 'Templates' : 'Tools'}
          />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 