# Task Manager Frontend

React-based frontend for task management with Redux state management and Material UI components.
Web page url: <https://d3g0ezs4umiwx9.cloudfront.net/>

## Features

- 👤 User authentication (login/register)
- 📋 Task management (CRUD operations)
- 📊 Task statistics visualization
- 🔒 Protected routes
- 🎨 Material UI components
- 📱 Responsive design
- 🧪 Comprehensive testing
- 🔄 Redux state management
- � Docker ready

## Tech Stack

| Category       | Technologies                          |
|----------------|---------------------------------------|
| Framework      | React 19                              |
| State Management | Redux Toolkit, React-Redux           |
| UI Library     | Material UI (MUI)                     |
| Routing        | React Router DOM v7                   |
| HTTP Client    | Axios                                 |
| Charts         | Recharts                              |
| Testing        | Jest, React Testing Library          |

## Project Structure
```
task-manager-frontend/
├── src/
│ ├── api/ # API configuration
│ ├── components/ # Reusable components
│ │ └── tests/ # Component tests
│ ├── pages/ # Page components
│ ├── redux/ # Redux store and slices
│ │ └── slices/ # Redux state slices
│ │ └── tests/ # Redux tests
│ ├── routes/ # Route components
│ ├── App.js # Main app component
│ └── index.js # Entry point
├── .env.development # Dev environment vars
├── .env.production # Prod environment vars
└── config files # Build/config files
```

## Key Components

| Component       | Description                          |
|-----------------|--------------------------------------|
| `TaskList`     | Displays list of tasks               |
| `TaskCard`     | Individual task card                 |
| `TaskForm`     | Form for creating/editing tasks      |
| `TaskChart`    | Visualizes task statistics           |
| `ProtectedRoute`| Auth-protected route wrapper         |
| `authSlice`    | Redux slice for auth state           |
| `tasksSlice`   | Redux slice for tasks state          |

## Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Backend API running (see backend README)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/task-manager-frontend.git
cd task-manager-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment files:
- .env.development:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```
- .env.production:
```env
REACT_APP_API_URL=https://j5s3m0dla9.execute-api.us-east-1.amazonaws.com/dev
REACT_APP_ENV=production
```

## Available Scripts

| Script	| Description |
|-------|----------------|
| start | Runs app in development mode |
| build | Builds for production |
| serve | Serves production build locally |
| test | Runs tests |
| eject | Ejects from create-react-app |

## Running the App
### Development
```bash
npm start
```
Open http://localhost:3000 in your browser.

### Development with production API
```bash
npm run serve
```

#### With Docker
```bash
docker-compose up --build
```

### Testing
Run all tests:
```bash
npm test
```

Run specific test:
```bash
npm test src/components/__tests__/TaskList.test.js
```

### Environment Variables
| Variable	Required	Description |
|-------|----------------|
| REACT_APP_API_URL | Yes | Backend API base URL |
| REACT_APP_ENV | No | Environment (dev/prod) |

### Connecting to Backend (local development)
Ensure your backend is running and update REACT_APP_API_URL in your environment files to match your backend URL.

### Project Structure
```
task-manager-frontend/
├── src/
│ ├── api/ # API configuration
│ ├── components/ # Reusable components
│ │ └── tests/ # Component tests
│ ├── pages/ # Page components
│ ├── redux/ # Redux store and slices
│ │ └── slices/ # Redux state slices
│ │ └── tests/ # Redux tests
│ ├── routes/ # Route components
│ ├── App.js # Main app component
│ └── index.js # Entry point
├── .env.development # Dev environment vars
├── .env.production # Prod environment vars
└── config files # Build/config files
```
