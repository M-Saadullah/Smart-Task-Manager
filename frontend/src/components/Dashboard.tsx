import React from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle2, Target, TrendingUp } from 'lucide-react';
import { useTaskContext } from '@/contexts/TaskContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const Dashboard: React.FC = () => {
  const { tasks, getUpcomingTasks, getOverdueTasks, getTasksByCategory } = useTaskContext();

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const upcomingTasks = getUpcomingTasks();
  const overdueTasks = getOverdueTasks();

  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  const workTasks = getTasksByCategory('Work');
  const personalTasks = getTasksByCategory('Personal');
  const learningTasks = getTasksByCategory('Learning');

  const highPriorityTasks = tasks.filter(task => task.priority === 'High' && !task.completed);

  const stats = [
    {
      title: 'Total Tasks',
      value: tasks.length,
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Completed',
      value: completedTasks.length,
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Pending',
      value: pendingTasks.length,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Overdue',
      value: overdueTasks.length,
      icon: AlertTriangle,
      color: 'text-priority-high',
      bgColor: 'bg-priority-high/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Completion Rate</span>
                  <span>{Math.round(completionRate)}%</span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-success">{completedTasks.length}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">{pendingTasks.length}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{tasks.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="bg-work text-white">Work</Badge>
                  <span className="text-sm">{workTasks.length} tasks</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {workTasks.filter(t => t.completed).length} completed
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="bg-personal text-white">Personal</Badge>
                  <span className="text-sm">{personalTasks.length} tasks</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {personalTasks.filter(t => t.completed).length} completed
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="bg-learning text-white">Learning</Badge>
                  <span className="text-sm">{learningTasks.length} tasks</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {learningTasks.filter(t => t.completed).length} completed
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(overdueTasks.length > 0 || upcomingTasks.length > 0 || highPriorityTasks.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {overdueTasks.length > 0 && (
            <Card className="border-priority-high">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-priority-high">
                  <AlertTriangle className="h-4 w-4" />
                  Overdue Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-priority-high">{overdueTasks.length}</p>
                <p className="text-xs text-muted-foreground">Need immediate attention</p>
              </CardContent>
            </Card>
          )}

          {upcomingTasks.length > 0 && (
            <Card className="border-warning">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-warning">
                  <Calendar className="h-4 w-4" />
                  Due Soon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-warning">{upcomingTasks.length}</p>
                <p className="text-xs text-muted-foreground">Due in next 3 days</p>
              </CardContent>
            </Card>
          )}

          {highPriorityTasks.length > 0 && (
            <Card className="border-info">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-info">
                  <Target className="h-4 w-4" />
                  High Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-info">{highPriorityTasks.length}</p>
                <p className="text-xs text-muted-foreground">Important tasks pending</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};