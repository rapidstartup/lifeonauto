import { useState } from 'react';
import {
  Wand2,
  Save,
  Copy,
  Star,
  FolderPlus,
  Tags,
  History,
  MessageCircle,
  Settings,
  RefreshCw
} from 'lucide-react';

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrompt: string;
  variables: string[];
  example: string;
  tags: string[];
}

interface PromptCategory {
  id: string;
  name: string;
  description: string;
}

const defaultCategories: PromptCategory[] = [
  {
    id: 'content-creation',
    name: 'Content Creation',
    description: 'Prompts for generating various types of content'
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Prompts for analyzing and processing data'
  },
  {
    id: 'code-generation',
    name: 'Code Generation',
    description: 'Prompts for generating and modifying code'
  },
  {
    id: 'automation',
    name: 'Automation Workflows',
    description: 'Prompts for creating automation sequences'
  }
];

const defaultTemplates: PromptTemplate[] = [
  {
    id: 'content-1',
    name: 'Blog Post Generator',
    description: 'Creates structured blog posts with SEO optimization',
    category: 'content-creation',
    basePrompt: 'Write a blog post about {topic} that is {wordCount} words long. Include {numHeadings} main sections and focus on {keyword}. Tone should be {tone}.',
    variables: ['topic', 'wordCount', 'numHeadings', 'keyword', 'tone'],
    example: 'Write a blog post about artificial intelligence that is 1000 words long. Include 4 main sections and focus on machine learning. Tone should be informative but approachable.',
    tags: ['blog', 'content', 'seo']
  },
  {
    id: 'automation-1',
    name: 'Workflow Generator',
    description: 'Creates step-by-step automation workflows',
    category: 'automation',
    basePrompt: 'Create a detailed automation workflow for {process} using {tools}. Include {requirements} and consider {constraints}.',
    variables: ['process', 'tools', 'requirements', 'constraints'],
    example: 'Create a detailed automation workflow for customer onboarding using Zapier and Gmail. Include email notifications and consider GDPR requirements.',
    tags: ['automation', 'workflow', 'process']
  }
];

export default function AIPromptBuilder() {
  const [categories] = useState<PromptCategory[]>(defaultCategories);
  const [templates, setTemplates] = useState<PromptTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('content-creation');
  const [promptVariables, setPromptVariables] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);

  const generatePrompt = () => {
    if (!selectedTemplate) return;

    let prompt = selectedTemplate.basePrompt;
    Object.entries(promptVariables).forEach(([key, value]) => {
      prompt = prompt.replace(`{${key}}`, value);
    });
    setGeneratedPrompt(prompt);
    setRecentPrompts([prompt, ...recentPrompts.slice(0, 4)]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Prompt Builder</h1>
        <div className="space-x-2">
          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded">
            <History className="w-5 h-5" />
          </button>
          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded">
            <Star className="w-5 h-5" />
          </button>
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Save className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Categories & Templates Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Categories */}
          <div className="space-y-2">
            <h2 className="font-medium">Categories</h2>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full p-3 text-left rounded-lg hover:bg-gray-50 ${
                  activeCategory === category.id ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Templates */}
          <div className="space-y-2">
            <h2 className="font-medium">Templates</h2>
            {templates
              .filter(template => template.category === activeCategory)
              .map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full p-4 text-left border rounded-lg hover:bg-gray-50 ${
                    selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{template.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(template.id);
                      }}
                      className={`p-1 rounded ${
                        favorites.includes(template.id)
                          ? 'text-yellow-500'
                          : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* Prompt Builder */}
        <div className="col-span-3 space-y-6">
          {selectedTemplate ? (
            <>
              {/* Template Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
                <p className="text-gray-600">{selectedTemplate.description}</p>
                
                {/* Variables */}
                <div className="space-y-4">
                  <h3 className="font-medium">Variables</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedTemplate.variables.map(variable => (
                      <div key={variable}>
                        <label className="block text-sm font-medium text-gray-700">
                          {variable.charAt(0).toUpperCase() + variable.slice(1)}
                        </label>
                        <input
                          type="text"
                          value={promptVariables[variable] || ''}
                          onChange={(e) => setPromptVariables({
                            ...promptVariables,
                            [variable]: e.target.value
                          })}
                          className="mt-1 w-full p-2 border rounded-md"
                          placeholder={`Enter ${variable}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generated Prompt */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Generated Prompt</h3>
                    <button
                      onClick={generatePrompt}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <Wand2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="relative">
                    <textarea
                      value={generatedPrompt}
                      readOnly
                      className="w-full h-32 p-4 border rounded-lg bg-gray-50"
                    />
                    <button
                      onClick={() => copyToClipboard(generatedPrompt)}
                      className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Example */}
                <div className="space-y-2">
                  <h3 className="font-medium">Example</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">{selectedTemplate.example}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">Select a template to get started</p>
            </div>
          )}

          {/* Recent Prompts */}
          {recentPrompts.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Recent Prompts</h3>
              <div className="space-y-2">
                {recentPrompts.map((prompt, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => copyToClipboard(prompt)}
                  >
                    <p className="text-gray-600 line-clamp-2">{prompt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
