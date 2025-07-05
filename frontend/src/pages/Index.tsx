import { TaskProvider } from '@/contexts/TaskContext';
import { Dashboard } from '@/components/Dashboard';
import { TaskList } from '@/components/TaskList';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, CheckSquare } from 'lucide-react';

const Index = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'tasks'>('dashboard');

  return (
    <TaskProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
  <div className="container mx-auto px-4 py-4">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      
      {/* Branding - Centered on mobile */}
      <div className="w-full md:w-auto text-center md:text-left">
        <h1 className="text-2xl font-bold text-primary">Smart Task Manager</h1>
        <p className="text-sm text-muted-foreground">Stay productive, stay organized</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <Button
          variant={activeView === 'dashboard' ? 'default' : 'ghost'}
          onClick={() => setActiveView('dashboard')}
          className="gap-2 w-full sm:w-auto"
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant={activeView === 'tasks' ? 'default' : 'ghost'}
          onClick={() => setActiveView('tasks')}
          className="gap-2 w-full sm:w-auto"
        >
          <CheckSquare className="h-4 w-4" />
          Tasks
        </Button>
      </nav>
    </div>
  </div>
</header>


        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {activeView === 'dashboard' ? <Dashboard /> : <TaskList />}
        </main>
      </div>
    </TaskProvider>
  );
};

export default Index;
