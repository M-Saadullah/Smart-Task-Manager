import React from 'react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { Calendar, Clock, AlertTriangle, Check, Trash2 } from 'lucide-react';
import { Task, TaskCategory, TaskPriority } from '@/types/task';
import { useTaskContext } from '@/contexts/TaskContext';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const categoryColors: Record<TaskCategory, string> = {
  Work: 'bg-work text-white',
  Personal: 'bg-personal text-white',
  Learning: 'bg-learning text-white',
};

const priorityColors: Record<TaskPriority, string> = {
  High: 'bg-priority-high text-white',
  Medium: 'bg-priority-medium text-white',
  Low: 'bg-priority-low text-white',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();

  const isOverdue = task.deadline && isPast(task.deadline) && !task.completed;
  const isDueToday = task.deadline && isToday(task.deadline);
  const isDueTomorrow = task.deadline && isTomorrow(task.deadline);

  const getDeadlineText = () => {
    if (!task.deadline) return null;
    
    if (isOverdue) return 'Overdue';
    if (isDueToday) return 'Due today';
    if (isDueTomorrow) return 'Due tomorrow';
    return `Due ${format(task.deadline, 'MMM d, yyyy')}`;
  };

  const getDeadlineColor = () => {
    if (isOverdue) return 'text-priority-high';
    if (isDueToday) return 'text-priority-medium';
    if (isDueTomorrow) return 'text-info';
    return 'text-muted-foreground';
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      task.completed && "opacity-60",
      isOverdue && !task.completed && "border-priority-high border-l-4"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(task.id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold text-base leading-tight",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              {task.description && (
                <p className={cn(
                  "text-sm mt-1 text-muted-foreground",
                  task.completed && "line-through"
                )}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Edit task</span>
              ✏️
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTask(task.id)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete task</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={categoryColors[task.category]} variant="secondary">
            {task.category}
          </Badge>
          <Badge className={priorityColors[task.priority]} variant="outline">
            {task.priority}
          </Badge>
          
          {task.deadline && (
            <div className={cn("flex items-center gap-1 text-xs", getDeadlineColor())}>
              {isOverdue && <AlertTriangle className="h-3 w-3" />}
              <Calendar className="h-3 w-3" />
              <span>{getDeadlineText()}</span>
            </div>
          )}
          
          {task.completed && (
            <div className="flex items-center gap-1 text-xs text-success">
              <Check className="h-3 w-3" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};