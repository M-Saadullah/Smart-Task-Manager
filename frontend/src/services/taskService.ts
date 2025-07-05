// src/services/taskService.ts
import { api }    from '@/lib/api';
import type { Task, TaskCategory, TaskPriority } from '@/types/task';
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;  // current page
  size: number;
}

// Remap your client enums into the UPPERCASE versions your API uses:
export type RequestCategory = Uppercase<TaskCategory>;   // 'WORK' | 'PERSONAL' | 'LEARNING'
export type RequestPriority = Uppercase<TaskPriority>;   // 'HIGH' | 'MEDIUM'  | 'LOW'

export interface TaskRequest {
  title:       string;
  description: string;
  category:    RequestCategory;
  priority:    RequestPriority;
  deadline:    string | null;    // ISO-8601 date string
  completed:   boolean;
}

export const listTasks = (params = {}) =>
  api.get<Page<Task>>('/tasks', { params }).then(r => r.data);

export const getTask = (id: string) =>
  api.get<Task>(`/tasks/${id}`).then(r => r.data);

export const createTask = (payload: TaskRequest) =>
  api.post<Task>('/tasks', payload).then(r => r.data);

export const updateTask = (id: string, payload: TaskRequest) =>
  api.put<Task>(`/tasks/${id}`, payload).then(r => r.data);

export const deleteTask = (id: string) =>
  api.delete(`/tasks/${id}`);
