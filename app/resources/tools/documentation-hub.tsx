import { useState } from 'react';
import {
  Search,
  Book,
  FileText,
  FolderOpen,
  Star,
  Clock,
  Tag,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface DocItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  author: string;
  starred: boolean;
  type: 'guide' | 'template' | 'reference';
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const defaultCategories: Category[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Basic guides and introductions',
    icon: 'rocket'
  },
  {
    id: 'workflows',
    name: 'Workflows',
    description: 'Automation workflow documentation',
    icon: 'flow'
  },
  {
    id: 'templates',
    name: 'Templates',
    description: 'Reusable documentation templates',
    icon: 'template'
  },
  {
    id: 'integrations',
    name: 'Integrations',
    description: 'Tool integration guides',
    icon: 'puzzle'
  }
];

const defaultDocs: DocItem[] = [
  {
    id: 'doc-1',
    title: 'Getting Started with Automation',
    description: 'A complete guide to setting up your first automation',
    content: '# Getting Started\n\nThis guide will help you...',
    category: 'getting-started',
    tags: ['beginner', 'setup', 'introduction'],
    lastUpdated: '2024-02-20T10:00:00',
    author: 'Admin',
    starred: false,
    type: 'guide'
  },
  {
    id: 'doc-2',
    title: 'Workflow Documentation Template',
    description: 'Standard template for documenting automation workflows',
    content: '# Workflow Documentation\n\n## Overview\n\n...',
    category: 'templates',
    tags: ['template', 'workflow', 'documentation'],
    lastUpdated: '2024-02-19T15:30:00',
    author: 'Admin',
    starred: true,
    type: 'template'
  }
];

export default function DocumentationHub() {
  const [docs, setDocs] = useState<DocItem[]>(defaultDocs);
  const [categories] = useState<Category[]>(defaultCategories);
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Documentation Hub</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Document</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Categories */}
          <div className="space-y-2">
            <h2 className="font-medium">Categories</h2>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full px-4 py-2 text-left rounded-lg ${
                selectedCategory === 'all' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              All Documents
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full px-4 py-2 text-left rounded-lg ${
                  selectedCategory === category.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Quick Filters */}
          <div className="space-y-2">
            <h2 className="font-medium">Quick Filters</h2>
            <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Starred</span>
            </button>
            <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Recent</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-4 space-y-6">
          {/* Document Grid */}
          <div className="grid grid-cols-2 gap-4">
            {docs
              .filter(doc => 
                (selectedCategory === 'all' || doc.category === selectedCategory) &&
                (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .map(doc => (
                <div
                  key={doc.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedDoc(doc)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDocs(docs.map(d => 
                          d.id === doc.id ? { ...d, starred: !d.starred } : d
                        ));
                      }}
                      className={`p-1 rounded-full ${
                        doc.starred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Star className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {doc.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
                    <span>Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                    <span>{doc.author}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedDoc.title}</h2>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="prose max-w-none">
                {selectedDoc.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
