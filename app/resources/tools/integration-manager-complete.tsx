import { useState, useEffect } from 'react';
import {
  Shield,
  Key,
  Activity,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Plus,
  Settings,
  Clock,
  Power,
  Link,
  FileKey,
  Eye,
  EyeOff,
  Search,
  X
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  provider: string;
  type: 'api' | 'oauth' | 'webhook';
  status: 'active' | 'inactive' | 'error' | 'pending';
  credentials: {
    apiKey?: string;
    clientId?: string;
    clientSecret?: string;
    webhook?: string;
  };
  lastChecked: string;
  healthScore: number;
  usageCount: number;
  errorCount: number;
  configuration: Record<string, any>;
  tags: string[];
}

const defaultIntegrations: Integration[] = [
  {
    id: 'openai-1',
    name: 'OpenAI GPT-4',
    provider: 'OpenAI',
    type: 'api',
    status: 'active',
    credentials: {
      apiKey: 'sk-....'
    },
    lastChecked: new Date().toISOString(),
    healthScore: 98,
    usageCount: 1250,
    errorCount: 2,
    configuration: {
      model: 'gpt-4',
      maxTokens: 2000
    },
    tags: ['ai', 'text-generation']
  },
  {
    id: 'github-1',
    name: 'GitHub Integration',
    provider: 'GitHub',
    type: 'oauth',
    status: 'active',
    credentials: {
      clientId: 'client-id',
      clientSecret: 'client-secret'
    },
    lastChecked: new Date().toISOString(),
    healthScore: 100,
    usageCount: 450,
    errorCount: 0,
    configuration: {
      repository: 'main-repo',
      branch: 'master'
    },
    tags: ['code', 'version-control']
  }
];

export default function IntegrationManager() {
  const [integrations, setIntegrations] = useState<Integration[]>(defaultIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'error'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'inactive':
        return 'text-gray-500';
      case 'error':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const toggleSecret = (integrationId: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [integrationId]: !prev[integrationId]
    }));
  };

  const testConnection = async (integration: Integration) => {
    // Implement connection testing logic
    console.log('Testing connection for:', integration.name);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Integration Manager</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Integration</span>
          </button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex space-x-4">
        {['all', 'active', 'inactive', 'error'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as typeof filter)}
            className={`px-4 py-2 rounded-lg ${
              filter === status 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations
          .filter(integration => 
            filter === 'all' || integration.status === filter)
          .filter(integration =>
            integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            integration.provider.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(integration => (
            <div
              key={integration.id}
              className="border rounded-lg p-6 space-y-4 hover:bg-gray-50"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{integration.name}</h3>
                  <p className="text-sm text-gray-500">{integration.provider}</p>
                </div>
                <div className={`${getStatusColor(integration.status)}`}>
                  {integration.status === 'active' && <CheckCircle className="w-5 h-5" />}
                  {integration.status === 'error' && <AlertCircle className="w-5 h-5" />}
                  {integration.status === 'inactive' && <Power className="w-5 h-5" />}
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-2">
                {integration.credentials.apiKey && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Key</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {showSecrets[integration.id] 
                          ? integration.credentials.apiKey 
                          : '••••••••••••••••'}
                      </code>
                      <button
                        onClick={() => toggleSecret(integration.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {showSecrets[integration.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-2">
                <div>
                  <p className="text-sm text-gray-500">Health</p>
                  <p className={`font-medium ${getHealthColor(integration.healthScore)}`}>
                    {integration.healthScore}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Usage</p>
                  <p className="font-medium">{integration.usageCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Errors</p>
                  <p className="font-medium text-red-500">{integration.errorCount}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => testConnection(integration)}
                  className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded"
                >
                  Test Connection
                </button>
                <button
                  onClick={() => setSelectedIntegration(integration)}
                  className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded"
                >
                  Configure
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Configuration Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Configure Integration</h2>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Basic Settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={selectedIntegration.name}
                    className="mt-1 w-full p-2 border rounded"
                  />
                </div>

                {/* Credentials */}
                <div className="space-y-2">
                  <h3 className="font-medium">Credentials</h3>
                  {selectedIntegration.type === 'api' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">API Key</label>
                      <div className="mt-1 flex space-x-2">
                        <input
                          type={showSecrets[selectedIntegration.id] ? 'text' : 'password'}
                          value={selectedIntegration.credentials.apiKey}
                          className="flex-1 p-2 border rounded"
                        />
                        <button
                          onClick={() => toggleSecret(selectedIntegration.id)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          {showSecrets[selectedIntegration.id] ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Configuration */}
                <div className="space-y-2">
                  <h3 className="font-medium">Configuration</h3>
                  {Object.entries(selectedIntegration.configuration).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        type="text"
                        value={value}
                        className="mt-1 w-full p-2 border rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    onClick={() => setSelectedIntegration(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Save changes
                      setSelectedIntegration(null);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
