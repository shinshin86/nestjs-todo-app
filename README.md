# NestJS Todo App with React Frontend

This project is a full-stack Todo application built with NestJS for the backend and React for the frontend. It demonstrates basic CRUD operations, error handling, and includes unit and E2E tests.

## Project Structure

```
nestjs-todo-app/
├── backend/     # NestJS backend
├── frontend/    # React frontend
└── README.md    # This file
```

## Features

- Create, Read, Update, and Delete Todo items
- SQLite database integration using Prisma ORM
- Error handling with neverthrow
- Unit and E2E tests for backend
- React-based frontend with TypeScript
- Proxy setup for local development

## Prerequisites

- Node.js (v18 or later)
- npm (v10 or later)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/shinshin86/nestjs-todo-app.git
cd nestjs-todo-app
```

2. Install root dependencies:

```bash
npm install
```

3. Set up the backend:

```bash
cd backend
npm install
npm run db:migrate
npm run db:seed  # Optional: Seed the database
```

4. Set up the frontend:

```bash
cd ../frontend
npm install
```

5. Start both servers from the root directory:

```bash
cd ..
npm run dev
```

This will start the backend server on http://localhost:3001 and the frontend server on http://localhost:3000.

## Development

- Backend code is in the `backend/` directory. Refer to `backend/README.md` for more details.
- Frontend code is in the `frontend/` directory. Refer to `frontend/README.md` for more details.
- The frontend uses a proxy to communicate with the backend during development. This is configured in `frontend/src/setupProxy.js`.

## Testing

### Backend

```bash
cd backend
npm test          # Run unit tests
npm run test:e2e  # Run E2E tests
```

### Frontend

```bash
cd frontend
npm test
```

## Building for Production

### Backend

```bash
cd backend
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```

## Continuous Integration

This project uses GitHub Actions for CI. The workflow is defined in `.github/workflows/ci.yml`.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.