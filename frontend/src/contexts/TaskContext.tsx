import { 
  listTasks as apiListTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask
} from '@/services/taskService';
import type { Task as TaskDTO } from '@/types/task';
import type { TaskRequest } from '@/services/taskService'; 
import { TaskPriority } from '@/types/task';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task, TaskCategory, TaskFilters } from '@/types/task';
import { toast } from '@/hooks/use-toast';

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filters: TaskFilters;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  setFilters: (filters: TaskFilters) => void;
  clearFilters: () => void;
  getTasksByCategory: (category: TaskCategory) => Task[];
  getUpcomingTasks: () => Task[];
  getOverdueTasks: () => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFiltersState] = useState<TaskFilters>({});

  // Load tasks from API on mount
  useEffect(() => {
    (async () => {
      try {
        const page = await apiListTasks();
        const parsed = page.content.map((dto: TaskDTO) => ({
          ...dto,
          createdAt: new Date(dto.createdAt),
          updatedAt: new Date(dto.updatedAt),
          deadline: dto.deadline ? new Date(dto.deadline) : null,
        }));
        setTasks(parsed);
      } catch (err: any) {
        console.error('Failed to load tasks:', err);
        toast({ title: 'Error loading tasks', description: err.message || 'Could not load tasks.', variant: 'destructive' });
      }
    })();
  }, []);

  // Create Task
const addTask = async (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
  const payload: TaskRequest = {
    title:       data.title,
    description: data.description,
    // uppercase to match backend enum
    category:    data.category.toUpperCase() as Uppercase<TaskCategory>,
    priority:    data.priority.toUpperCase() as Uppercase<TaskPriority>,
    // make sure it's a string
    deadline:    data.deadline ? data.deadline.toISOString() : null,
    completed:   data.completed,
  };

  try {
    const created = await apiCreateTask(payload);
    const newTask: Task = {
      ...created,
      createdAt: new Date(created.createdAt),
      updatedAt: new Date(created.updatedAt),
      deadline: created.deadline ? new Date(created.deadline) : null,
    };
    setTasks(prev => [newTask, ...prev]);
    toast({ title: 'Task created', description: `"${newTask.title}" added.` });
  } catch (err: any) {
    console.error('Create error payload:', JSON.stringify(payload, null, 2));
    console.error('Server response:', err.response?.status, err.response?.data);
    toast({
      title: 'Error creating task',
      description: err.response?.data?.message || err.message,
      variant: 'destructive',
    });
  }
};

// Update Task
const updateTask = async (id: string, updates: Partial<Task>) => {
  const existing = tasks.find(t => t.id === id);
  if (!existing) return;

  // merge into a full request
  const payload: TaskRequest = {
    title:       updates.title       ?? existing.title,
    description: updates.description ?? existing.description,
    category:    (updates.category
                    ? updates.category.toUpperCase()
                    : existing.category.toUpperCase()
                 ) as Uppercase<TaskCategory>,
    priority:    (updates.priority
                    ? updates.priority.toUpperCase()
                    : existing.priority.toUpperCase()
                 ) as Uppercase<TaskPriority>,
    deadline:    updates.deadline !== undefined
                    ? (updates.deadline
                        ? updates.deadline.toISOString()
                        : null)
                    : existing.deadline?.toISOString() ?? null,
    completed:   updates.completed   ?? existing.completed,
  };

  try {
    const updated = await apiUpdateTask(id, payload);
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...updated,
              createdAt: new Date(updated.createdAt),
              updatedAt: new Date(updated.updatedAt),
              deadline: updated.deadline ? new Date(updated.deadline) : null,
            }
          : t
      )
    );
    toast({ title: 'Task updated', description: `"${updated.title}" saved.` });
  } catch (err: any) {
    console.error('Update error payload:', JSON.stringify(payload, null, 2));
    console.error('Server response:', err.response?.status, err.response?.data);
    toast({
      title: 'Error updating task',
      description: err.response?.data?.message || err.message,
      variant: 'destructive',
    });
  }
};

  // Delete Task
  const deleteTask = async (id: string) => {
    try {
      await apiDeleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      toast({ title: 'Task deleted', description: 'Task removed.' });
    } catch (err: any) {
      console.error('Delete error:', err);
      toast({ title: 'Error deleting task', description: err.message || 'Could not delete task.', variant: 'destructive' });
    }
  };

  // Toggle Completion
  const toggleTaskCompletion = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    updateTask(id, { completed: !task.completed });
  };

  // Filter & Derived
  const getTasksByCategory = (category: TaskCategory) => tasks.filter(t => t.category === category);
  const getUpcomingTasks = () => {
    const now = new Date();
    const in3 = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return tasks.filter(t => t.deadline && t.deadline > now && t.deadline <= in3 && !t.completed);
  };
  const getOverdueTasks = () => tasks.filter(t => t.deadline && t.deadline < new Date() && !t.completed);

  const filteredTasks = tasks.filter(task => {
    if (filters.category) {
    if (task.category.toLowerCase() !== filters.category.toLowerCase())
      return false;
  }
  if (filters.priority) {
    if (task.priority.toLowerCase() !== filters.priority.toLowerCase())
      return false;
  }
    if (filters.status) {
      if (filters.status === 'completed' && !task.completed) return false;
      if (filters.status === 'pending' && task.completed) return false;
    }
    
    if (filters.search) {
      const s = filters.search.toLowerCase();
      return task.title.toLowerCase().includes(s) || task.description.toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filters,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        setFilters: setFiltersState,
        clearFilters: () => setFiltersState({}),
        getTasksByCategory,
        getUpcomingTasks,
        getOverdueTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
