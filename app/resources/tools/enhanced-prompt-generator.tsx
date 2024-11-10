import { useState, useEffect } from 'react';
import { 
  Wand2, 
  Save, 
  Copy, 
  Plus,
  Star,
  Key,
  RefreshCw,
  Filter,
  Search,
  Settings,
  AlertCircle,
  CheckCircle,
  BookMarked
} from 'lucide-react';

interface Variable {
  name: string;
  description: string;
  defaultValue: string;
  type: 'text' | 'number' | 'select' | 'multiline';
  options?: string[];
}

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: Variable[];
  category: string;
  subcategory: string;
  tags: string[];
  useCount: number;
  aiEnhanceable: boolean;
  example: string;
}

interface AIConfig {
  enabled: boolean;
  provider: string;
  apiKey?: string;
  enhanceOnly: boolean;
}

// Sample templates - you can expand these
const defaultTemplates: PromptTemplate[] = [
  {
    id: 'email-1',
    name: 'Professional Email Response',
    description: 'Generate a professional email response',
    template: 'Write a {tone} email response to {context}. The response should be {length} and include {requirements}.',
    variables: [
      { name: 'tone', description: 'Tone of the email', defaultValue: 'professional', type: 'select', options: ['professional', 'friendly', 'formal', 'casual'] },
      { name: 'context', description: 'Original email or situation', defaultValue: '', type: 'multiline' },
      { name: 'length', description: 'Response length', defaultValue: 'concise', type: 'select', options: ['concise', 'detailed', 'brief'] },
      { name: 'requirements', description: 'Specific points to include', defaultValue: '', type: 'text' }
    ],
    category: 'Business',
    subcategory: 'Email',
    tags: ['email', 'professional', 'communication'],
    useCount: 0,
    aiEnhanceable: true,
    example: 'Write a professional email response to a client asking about project delays. The response should be concise and include timeline updates and next steps.'
  },
  {
    id: 'blog-1',
    name: 'Blog Post Outline',
    description: 'Create a structured blog post outline',
    template: 'Create a {type} blog post outline about {topic}. Include {sections} main sections focusing on {keyword}. The tone should be {tone} and target {audience}.',
    variables: [
      { name: 'type', description: 'Type of blog post', defaultValue: 'how-to', type: 'select', options: ['how-to', 'listicle', 'guide', 'review'] },
      { name: 'topic', description: 'Main topic', defaultValue: '', type: 'text' },
      { name: 'sections', description: 'Number of sections', defaultValue: '5', type: 'number' },
      { name: 'keyword', description: 'Target keyword', defaultValue: '', type: 'text' },
      { name: 'tone', description: 'Writing tone', defaultValue: 'professional', type: 'select', options: ['professional', 'casual', 'technical'] },
      { name: 'audience', description: 'Target audience', defaultValue: '', type: 'text' }
    ],
    category: 'Content',
    subcategory: 'Blog',
    tags: ['blog', 'content', 'writing'],
    useCount: 0,
    aiEnhanceable: true,
    example: 'Create a how-to blog post outline about productivity tools. Include 5 main sections focusing on task automation.'
  }
];

export default function EnhancedPromptGenerator() {
  const [templates, setTemplates] = useState<PromptTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [aiConfig, setAIConfig] = useState<AIConfig>({
    enabled: false,
    provider: 'openai',
    enhanceOnly: true
  });

  const generatePrompt = () => {
    if (!selectedTemplate) return;

    let prompt = selectedTemplate.template;
    Object.entries(variables).forEach(([key, value]) => {
      prompt = prompt.replace(`{${key}}`, value);
    });
    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here if desired
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Enhanced Prompt Generator</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Categories */}
          <div className="space-y-2">
            <h2 className="font-medium">Categories</h2>
            <div className="space-y-1">
              {['all', 'Business', 'Content', 'Technical', 'Creative'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full px-4 py-2 text-left rounded ${
                    selectedCategory === category ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* AI Configuration */}
          <div className="p-4 border rounded-lg space-y-4">
            <h2 className="font-medium">AI Enhancement</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={aiConfig.enabled}
                  onChange={(e) => setAIConfig({ ...aiConfig, enabled: e.target.checked })}
                  className="rounded"
                />
                <span>Enable AI</span>
              </label>
              {aiConfig.enabled && (
                <>
                  <input
                    type="password"
                    placeholder="API Key"
                    value={aiConfig.apiKey || ''}
                    onChange={(e) => setAIConfig({ ...aiConfig, apiKey: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={aiConfig.enhanceOnly}
                      onChange={(e) => setAIConfig({ ...aiConfig, enhanceOnly: e.target.checked })}
                      className="rounded"
                    />
                    <span>Enhance Only</span>
                  </label>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-3 space-y-6">
          {/* Template Selection */}
          <div className="grid grid-cols-2 gap-4">
            {templates
              .filter(template => 
                selectedCategory === 'all' || template.category === selectedCategory)
              .filter(template =>
                template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.description.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-4 text-left border rounded-lg hover:bg-gray-50 ${
                    selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
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

          {/* Template Editor */}
          {selectedTemplate && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{selectedTemplate.name}</h2>
              
              {/* Variables */}
              <div className="space-y-4">
                {selectedTemplate.variables.map(variable => (
                  <div key={variable.name} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {variable.name}
                      <span className="ml-1 text-sm text-gray-500">
                        ({variable.description})
                      </span>
                    </label>
                    {variable.type === 'multiline' ? (
                      <textarea
                        value={variables[variable.name] || ''}
                        onChange={(e) => setVariables({
                          ...variables,
                          [variable.name]: e.target.value
                        })}
                        className="w-full p-2 border rounded"
                        rows={3}
                        placeholder={variable.defaultValue}
                      />
                    ) : variable.type === 'select' ? (
                      <select
                        value={variables[variable.name] || ''}
                        onChange={(e) => setVariables({
                          ...variables,
                          [variable.name]: e.target.value
                        })}
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select {variable.name}</option>
                        {variable.options?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={variable.type === 'number' ? 'number' : 'text'}
                        value={variables[variable.name] || ''}
                        onChange={(e) => setVariables({
                          ...variables,
                          [variable.name]: e.target.value
                        })}
                        className="w-full p-2 border rounded"
                        placeholder={variable.defaultValue}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Generated Prompt */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Generated Prompt</h3>
                  <div className="space-x-2">
                    <button
                      onClick={() => copyToClipboard(generatedPrompt)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={generatePrompt}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-2"
                    >
                      <Wand2 className="w-5 h-5" />
                      <span>Generate</span>
                    </button>
                  </div>
                </div>
                <textarea
                  value={generatedPrompt}
                  readOnly
                  className="w-full h-32 p-4 border rounded-lg bg-gray-50"
                  placeholder="Click Generate to create your prompt"
                />
              </div>

              {/* Example */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Example</h3>
                <p className="text-gray-600">{selectedTemplate.example}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
