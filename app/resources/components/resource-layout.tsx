import { Navigation } from "@/components/ui/navigation";
import { templateItems, toolItems } from '../data';
import { ResourceLayoutWrapper } from './resource-layout-wrapper';

interface ResourceLayoutProps {
  children: React.ReactNode;
  type: 'templates' | 'tools';
}

export function ResourceLayout({ children, type }: ResourceLayoutProps) {
  const items = type === 'templates' ? templateItems : toolItems;

  const sidebarItems = items.map(item => ({
    title: item.title,
    href: `/resources/${type}/${item.href}`
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 pt-24">
        <ResourceLayoutWrapper 
          sidebarItems={sidebarItems}
          title={type === 'templates' ? 'Templates' : 'Tools'}
        >
          {children}
        </ResourceLayoutWrapper>
      </div>
    </div>
  );
} 