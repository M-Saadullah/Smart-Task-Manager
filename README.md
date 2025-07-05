# Smart Task Manager

A full-stack task management application with a **React + TypeScript + Tailwind** frontend and a **Spring Boot (Java 17)** backend using SQLite.\
Features include task CRUD, categories, priorities, deadlines, smart filtering, pagination, and progress analytics.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
5. [Configuration](#configuration)
   - [Backend (](#backend-applicationyml)[`application.yml`](#backend-applicationyml)[)](#backend-applicationyml)
   - [Frontend (](#frontend-env--vite-envdts)[`.env`](#frontend-env--vite-envdts)[ & ](#frontend-env--vite-envdts)[`vite-env.d.ts`](#frontend-env--vite-envdts)[)](#frontend-env--vite-envdts)
6. [API Reference](#api-reference)
7. [Usage](#usage)
8. [Future Enhancements](#future-enhancements)

---

## Features

- **Task Management**: Create, edit, delete, complete tasks
- **Categories**: Work / Personal / Learning
- **Priorities**: High / Medium / Low
- **Deadlines**: Date-only deadlines with overdue/upcoming indicators
- **Filtering & Search**: By category, status, priority, and keywords
- **Pagination & Sorting**: Server-side paging, sorting by priority & deadline
- **Responsive UI**: Mobile & desktop friendly
- **Notifications**: Toast feedback on all actions
- **Persistence**: SQLite on backend, React Context + API on frontend

---

## Tech Stack

- **Frontend**

  - React 18 + TypeScript
  - Vite, Tailwind CSS, shadcn/ui
  - React Context API for state
  - Axios for HTTP

- **Backend**

  - Spring Boot 3.5.3 (Java 17)
  - Spring Data JPA + Hibernate (SQLite dialect)
  - Spring Web / REST
  - Spring Security (CORS open on `/api/**`)

---

## Project Structure

```
/
├── backend/                  # Spring Boot service
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/example/taskmanager/
│       │   │   ├── config/SecurityConfig.java
│       │   │   ├── controller/TaskController.java
│       │   │   ├── dto/TaskRequest.java, TaskResponse.java
│       │   │   ├── exception/
│       │   │   ├── model/Task.java, Category.java, Priority.java, LocalDateAttributeConverter.java
│       │   │   ├── repository/TaskRepository.java
│       │   │   ├── service/TaskService.java, impl/TaskServiceImpl.java
│       │   │   └── spec/TaskSpecification.java
│       │   └── resources/application.yml
│       └── test/…
└── frontend/                 # React + Vite UI
    ├── package.json
    ├── vite.config.ts
    ├── .env
    ├── vite-env.d.ts
    └── src/
        ├── App.tsx
        ├── index.tsx
        ├── lib/api.ts
        ├── services/taskService.ts
        ├── types/task.ts
        ├── contexts/TaskContext.tsx
        └── components/
            ├── TaskList.tsx
            ├── TaskCard.tsx
            ├── TaskForm.tsx
            ├── TaskFilters.tsx
            └── Dashboard.tsx
```

---

## Getting Started

### Prerequisites

- **Java 17**
- **Maven 3.9+** (or use the Maven Wrapper after generating it)
- **Node.js 16+ & npm / yarn**

---

### Backend Setup

1. **Create **``** folder** (for SQLite database file):

   ```bash
   mkdir backend/data
   ```

2. **Configure** `backend/src/main/resources/application.yml` (default port 8082, SQLite at `./data/taskmanager.db`).

3. **Build & Run**:

   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

   The API will be available at `http://localhost:8082/api/tasks`.

---

### Frontend Setup

1. **Install deps**

   ```bash
   cd frontend
   npm install
   ```

2. **Create **`` at project root:

   ```ini
   VITE_API_URL=http://localhost:8082
   ```

3. **Create **`` at project root:

   ```ts
   /// <reference types="vite/client" />
   interface ImportMetaEnv { readonly VITE_API_URL: string }
   interface ImportMeta { readonly env: ImportMetaEnv }
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser.

---

## Configuration

### Backend (`application.yml`)

```yaml
server:
  port: 8082
spring:
  datasource:
    url: jdbc:sqlite:./data/taskmanager.db
    driver-class-name: org.sqlite.JDBC
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.community.dialect.SQLiteDialect
        format_sql: true
    show-sql: true
logging:
  level:
    org.hibernate.SQL: debug
```

### Frontend (`.env` & `vite-env.d.ts`)

```ini
# .env
VITE_API_URL=http://localhost:8082
```

```ts
// vite-env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv { readonly VITE_API_URL: string }
interface ImportMeta { readonly env: ImportMetaEnv }
```

---

## API Reference

| Method | Path              | Description                     |
| ------ | ----------------- | ------------------------------- |
| POST   | `/api/tasks`      | Create task (body: TaskRequest) |
| GET    | `/api/tasks`      | List/filter/paginate tasks      |
| GET    | `/api/tasks/{id}` | Get a single task               |
| PUT    | `/api/tasks/{id}` | Update task (body: TaskRequest) |
| DELETE | `/api/tasks/{id}` | Delete task                     |

**Example**:

```bash
curl http://localhost:8082/api/tasks?page=0&size=10&sort=deadline,asc
```

---

## Usage

1. **Add Task** via the “+ Add Task” button.
2. **Filter & Search** tasks in the sidebar.
3. **Edit / Delete** using the icons on each card.
4. **Toggle Completion** by clicking the checkbox.
5. **View Stats** on the Dashboard page.

---

## Future Enhancements

- User authentication (JWT) & per-user tasks
- Recurring tasks & calendar integration
- Drag-and-drop reordering
- Dark mode & theming
- Export/import CSV or JSON
- WebSocket for real-time updates

---


