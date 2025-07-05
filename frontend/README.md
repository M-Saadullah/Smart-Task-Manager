# Smart Task Manager

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS. This prototype demonstrates core productivity features including task creation, categorization, deadline management, and progress tracking.

## Features

### Core Functionality ✅
- **Task Management**: Create, edit, delete, and complete tasks
- **Categories**: Organize tasks by Work, Personal, and Learning
- **Priority Levels**: Set High, Medium, or Low priority for tasks
- **Deadline Tracking**: Set deadlines with visual indicators for overdue/upcoming tasks
- **Smart Filtering**: Filter by category, status, priority, and search terms
- **Progress Dashboard**: Visual analytics and task completion insights

### Advanced Features ⭐
- **Responsive Design**: Optimized for desktop and mobile devices
- **Local Storage**: Data persistence across browser sessions
- **Smart Sorting**: Automatic task ordering by priority and deadlines
- **Visual Indicators**: Color-coded categories and priority levels
- **Toast Notifications**: User feedback for all actions
- **Professional UI**: Modern interface using shadcn/ui components

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context API
- **Data Persistence**: localStorage (easily upgradeable to REST API)
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Build Tool**: Vite

## Architecture

### Component Structure
```
src/
├── components/
│   ├── Dashboard.tsx      # Analytics and overview
│   ├── TaskCard.tsx       # Individual task display
│   ├── TaskForm.tsx       # Create/edit task modal
│   ├── TaskFilters.tsx    # Search and filter controls
│   └── TaskList.tsx       # Task list with sorting
├── contexts/
│   └── TaskContext.tsx    # Global state management
├── types/
│   └── task.ts           # TypeScript interfaces
└── pages/
    └── Index.tsx         # Main application layout
```

### Data Schema
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  category: 'Work' | 'Personal' | 'Learning';
  priority: 'High' | 'Medium' | 'Low';
  deadline: Date | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## How to Run

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd smart-task-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production
```bash
npm run build
```

## Usage Guide

1. **Dashboard View**: See task statistics, completion rates, and alerts
2. **Tasks View**: Manage your task list with full CRUD operations
3. **Create Task**: Click "Add Task" to open the task creation form
4. **Filter Tasks**: Use the search bar and dropdown filters to find specific tasks
5. **Complete Tasks**: Click the checkbox to mark tasks as complete
6. **Edit Tasks**: Click the edit icon on any task to modify it
7. **Delete Tasks**: Click the trash icon to remove tasks

## Design Decisions

### Why This Tech Stack?
- **React + TypeScript**: Provides type safety and excellent developer experience
- **Tailwind CSS**: Rapid UI development with consistent styling
- **localStorage**: Simple persistence without backend complexity
- **Context API**: Sufficient state management for this scope
- **shadcn/ui**: Professional, accessible components out of the box

### Database Schema (Conceptual)
For future backend integration:
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category task_category NOT NULL,
  priority task_priority NOT NULL,
  deadline TIMESTAMP,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Future Enhancements

### Immediate Improvements (Next Sprint)
- **User Authentication**: Login/logout with JWT tokens
- **Backend API**: Replace localStorage with REST API
- **Real-time Sync**: WebSocket integration for multi-device sync
- **Notifications**: Browser notifications for deadline reminders
- **Drag & Drop**: Reorder tasks and change priorities
- **Tags System**: Additional task organization beyond categories

### Advanced Features (Future Versions)
- **Team Collaboration**: Share tasks and projects
- **Time Tracking**: Pomodoro timer integration
- **Recurring Tasks**: Automated task creation
- **Calendar Integration**: Google Calendar sync
- **Export/Import**: JSON and CSV support
- **Dark Mode**: Theme switching
- **Offline Support**: PWA capabilities

## Testing Strategy

### Unit Tests (Recommended)
- Task CRUD operations
- Filter and search functionality
- Date calculations and formatting
- Component rendering

### Integration Tests
- End-to-end task management workflow
- Data persistence verification
- Form validation

### Performance Testing
- Large task list rendering
- Filter performance with many tasks
- localStorage limitations

## Assumptions Made

1. **Single User**: No multi-user authentication required initially
2. **Browser Storage**: localStorage sufficient for MVP
3. **Category Limitation**: Three categories sufficient for initial version
4. **Deadline Granularity**: Date-only deadlines (no time component)
5. **No Task Dependencies**: Tasks are independent entities

## Code Quality Features

- **TypeScript**: Full type safety throughout the application
- **Component Modularity**: Small, focused, reusable components
- **Consistent Styling**: Design system with semantic color tokens
- **Error Handling**: Graceful error handling with user feedback
- **Accessibility**: Semantic HTML and ARIA attributes
- **Performance**: Optimized rendering and efficient state updates

## Deployment

The application is optimized for deployment on:
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting option

## Contributing

1. Follow the existing code style
2. Add TypeScript types for all new features
3. Update README for significant changes
4. Test across different browsers and devices

## License

MIT License - see LICENSE file for details

---

**Built with ❤️ for productivity enthusiasts**