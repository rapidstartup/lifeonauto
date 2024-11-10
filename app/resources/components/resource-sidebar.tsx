import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  href: string;
}

interface ResourceSidebarProps {
  items: SidebarItem[];
  currentPath: string;
  title: string;
}

export default function ResourceSidebar({ items, currentPath, title }: ResourceSidebarProps) {
  return (
    <div className="w-64 h-full bg-white shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block px-4 py-2 rounded-md hover:bg-gray-100 transition-colors",
              currentPath === item.href && "bg-primary text-white hover:bg-primary/90"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
} 