import { Navigation } from "@/components/ui/navigation";
import { templateItems, toolItems } from '../data';
import { ResourceLayoutWrapper } from './resource-layout-wrapper';

interface ResourceLayoutProps {
  children: React.ReactNode;
  type: 'templates' | 'tools';
}

export function ResourceLayout({ children, type }: ResourceLayoutProps) {
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