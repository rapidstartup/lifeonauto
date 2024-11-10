import { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  Repeat,
  Link,
  ArrowRight,
  Settings,
  List,
  X
} from 'lucide-react';

interface Task {
  id: string;
  name: string;
  description: string;
  schedule: {
    type: 'once' | 'daily' | 'weekly' | 'monthly' | 'custom';
    cronExpression?: string;
    nextRun: string;
    lastRun?: string;
  };
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  dependencies: string[];
  workflow: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
}

const defaultTasks: Task[] = [
  {
    id: 'task-1',
    name: 'Daily Data Sync',
    description: 'Synchronize customer data across platforms',
    schedule: {
      type: 'daily',
      nextRun: '2024-02-21T03:00:00',
      lastRun: '2024-02-20T03:00:00'
    },
    status: 'scheduled',
    dependencies: ['task-2'],
    workflow: 'data-sync',
    tags: ['data', 'sync', 'daily'],
    priority: 'high'
  },
  {
    id: 'task-2',
    name: 'Weekly Report Generation',
    description: 'Generate and send weekly performance reports',
    schedule: {
      type: 'weekly',
      nextRun: '2024-02-25T09:00:00',
      lastRun: '2024-02-18T09:00:00'
    },
    status: 'completed',
    dependencies: [],
    workflow: 'reporting',
    tags: ['report', 'weekly'],
    priority: 'medium'
  }
];

export default function TaskScheduler() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'running' | 'completed' | 'failed'>('all');

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-500 bg-blue-50';
      case 'running':
        return 'text-yellow-500 bg-yellow-50';
      case 'completed':
        return 'text-green-500 bg-green-50';
      case 'failed':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'running':
        return <ArrowRight className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 border-red-200';
      case 'medium':
        return 'text-yellow-500 border-yellow-200';
      case 'low':
        return 'text-green-500 border-green-200';
      default:
        return 'text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Task Scheduler</h1>
        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg border">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 ${view === 'calendar' ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 ${view === 'list' ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {['all', 'scheduled', 'running', 'completed', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-4 py-2 rounded-lg ${
                filter === status ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="text-blue-500 hover:text-blue-600"
          >
            Today
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() - 1);
                setCurrentDate(newDate);
              }}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">
              {currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() + 1);
                setCurrentDate(newDate);
              }}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 p-4 text-center font-medium">
              {day}
            </div>
          ))}
          
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - currentDate.getDay() + 1);
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();
            
            const dayTasks = tasks.filter(task => {
              const taskDate = new Date(task.schedule.nextRun);
              return taskDate.toDateString() === date.toDateString();
            });

            return (
              <div
                key={i}
                className={`bg-white p-2 min-h-[120px] ${
                  !isCurrentMonth ? 'text-gray-400' : ''
                } ${isToday ? 'bg-blue-50' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>
                    {date.getDate()}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      {dayTasks.length}
                    </span>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  {dayTasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="w-full text-left text-xs p-1 rounded truncate"
                    >
                      <div className={`px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                        {task.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="space-y-4">
          {tasks
            .filter(task => filter === 'all' || task.status === filter)
            .map(task => (
              <div
                key={task.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
                onClick={() => setSelectedTask(task)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{task.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        <span>{task.status}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Task Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{selectedTask.name}</h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-gray-600">{selectedTask.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Schedule Type</label>
                    <p className="mt-1 text-gray-600">{selectedTask.schedule.type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <p className="mt-1 text-gray-600">{selectedTask.priority}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
