import { useState } from 'react';
import {
  FileText,
  Plus,
  Save,
  Download,
  Copy,
  Trash2,
  Eye,
  Settings,
  Layout,
  Image
} from 'lucide-react';

interface DocumentSection {
  id: string;
  type: 'header' | 'text' | 'list' | 'code' | 'table' | 'template';
  content: any;
  template?: string;
}

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  sections: DocumentSection[];
}

const defaultTemplates: DocumentTemplate[] = [
  {
    id: 'process-doc',
    name: 'Process Documentation',
    description: 'Standard process documentation template',
    sections: [
      {
        id: 'header-1',
        type: 'header',
        content: {
          title: 'Process Name',
          owner: '',
          date: new Date().toISOString().split('T')[0]
        }
      },
      {
        id: 'overview',
        type: 'text',
        content: {
          text: 'Process Overview'
        }
      }
    ]
  },
  {
    id: 'user-guide',
    name: 'User Guide',
    description: 'End-user documentation template',
    sections: []
  },
  {
    id: 'technical-spec',
    name: 'Technical Specification',
    description: 'Technical documentation template',
    sections: []
  }
];

export default function DocumentGenerator() {
  const [templates, setTemplates] = useState<DocumentTemplate[]>(defaultTemplates);
  const [activeTemplate, setActiveTemplate] = useState<DocumentTemplate | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const addSection = (type: DocumentSection['type']) => {
    if (!activeTemplate) return;

    const newSection: DocumentSection = {
      id: `section-${Date.now()}`,
      type,
      content: type === 'header' ? {
        title: '',
        owner: '',
        date: new Date().toISOString().split('T')[0]
      } : type === 'table' ? {
        headers: ['Column 1', 'Column 2'],
        rows: [['', '']]
      } : {
        text: ''
      }
    };

    setActiveTemplate({
      ...activeTemplate,
      sections: [...activeTemplate.sections, newSection]
    });
  };

  const updateSection = (sectionId: string, updates: Partial<DocumentSection>) => {
    if (!activeTemplate) return;

    setActiveTemplate({
      ...activeTemplate,
      sections: activeTemplate.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    });
  };

  const deleteSection = (sectionId: string) => {
    if (!activeTemplate) return;

    setActiveTemplate({
      ...activeTemplate,
      sections: activeTemplate.sections.filter(section => section.id !== sectionId)
    });
  };

  const renderSection = (section: DocumentSection) => {
    switch (section.type) {
      case 'header':
        return (
          <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={section.content.title}
              onChange={(e) => updateSection(section.id, {
                content: { ...section.content, title: e.target.value }
              })}
              className="text-2xl font-bold w-full bg-transparent border-none focus:outline-none"
              placeholder="Document Title"
              disabled={previewMode}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={section.content.owner}
                onChange={(e) => updateSection(section.id, {
                  content: { ...section.content, owner: e.target.value }
                })}
                className="p-2 border rounded"
                placeholder="Owner"
                disabled={previewMode}
              />
              <input
                type="date"
                value={section.content.date}
                onChange={(e) => updateSection(section.id, {
                  content: { ...section.content, date: e.target.value }
                })}
                className="p-2 border rounded"
                disabled={previewMode}
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <textarea
            value={section.content.text}
            onChange={(e) => updateSection(section.id, {
              content: { text: e.target.value }
            })}
            className="w-full p-4 border rounded-lg min-h-[100px]"
            placeholder="Enter text..."
            disabled={previewMode}
          />
        );

      case 'table':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr>
                  {section.content.headers.map((header: string, index: number) => (
                    <th key={index} className="border p-2">
                      {!previewMode ? (
                        <input
                          type="text"
                          value={header}
                          onChange={(e) => {
                            const newHeaders = [...section.content.headers];
                            newHeaders[index] = e.target.value;
                            updateSection(section.id, {
                              content: { ...section.content, headers: newHeaders }
                            });
                          }}
                          className="w-full bg-transparent"
                        />
                      ) : (
                        header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.content.rows.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <td key={cellIndex} className="border p-2">
                        {!previewMode ? (
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) => {
                              const newRows = [...section.content.rows];
                              newRows[rowIndex][cellIndex] = e.target.value;
                              updateSection(section.id, {
                                content: { ...section.content, rows: newRows }
                              });
                            }}
                            className="w-full bg-transparent"
                          />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Document Generator</h1>
        <div className="space-x-2">
          <button 
            onClick={() => setPreviewMode(!previewMode)}
            className={`p-2 rounded ${
              previewMode ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-50'
            }`}
          >
            <Eye className="w-5 h-5" />
          </button>
          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Save className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Template Sidebar */}
        <div className="col-span-1 space-y-4">
          <h2 className="font-medium">Templates</h2>
          <div className="space-y-2">
            {templates.map(template => (
              <button
                key={template.id}
                onClick={() => setActiveTemplate(template)}
                className={`w-full p-4 text-left border rounded-lg hover:bg-gray-50 ${
                  activeTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
              >
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Document Editor */}
        <div className="col-span-3 space-y-6">
          {activeTemplate ? (
            <>
              {/* Section Tools */}
              {!previewMode && (
                <div className="flex space-x-2 pb-4 border-b">
                  <button
                    onClick={() => addSection('header')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Add Header"
                  >
                    <Layout className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => addSection('text')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Add Text"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => addSection('table')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Add Table"
                  >
                    <Table className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Sections */}
              <div className="space-y-6">
                {activeTemplate.sections.map(section => (
                  <div key={section.id} className="relative group">
                    {!previewMode && (
                      <div className="absolute -right-4 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {renderSection(section)}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">Select a template to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
