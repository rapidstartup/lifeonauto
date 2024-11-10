"use client";

import { usePathname } from 'next/navigation';
import ResourceSidebar from './resource-sidebar';

interface ResourceLayoutWrapperProps {
  children: React.ReactNode;
  sidebarItems: Array<{ title: string; href: string }>;
  title: string;
}

export function ResourceLayoutWrapper({ children, sidebarItems, title }: ResourceLayoutWrapperProps) {
  const pathname = usePathname();

  return (
    <div className="flex gap-6">
      <ResourceSidebar 
        items={sidebarItems}
        currentPath={pathname}
        title={title}
      />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
} 