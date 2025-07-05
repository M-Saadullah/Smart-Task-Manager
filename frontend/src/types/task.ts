export type TaskCategory = 'Work' | 'Personal' | 'Learning';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  deadline: Date | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFilters {
  category?: TaskCategory;
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
}