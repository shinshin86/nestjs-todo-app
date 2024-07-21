# NestJS Todo App

[![CI](https://github.com/shinshin86/nestjs-todo-app/actions/workflows/ci.yml/badge.svg)](https://github.com/shinshin86/nestjs-todo-app/actions/workflows/ci.yml)

This project is a simple Todo application built with NestJS, Prisma ORM, and SQLite. It demonstrates basic CRUD operations, error handling using the neverthrow library, and includes unit and E2E tests.

## Features

- Create, Read, Update, and Delete Todo items
- SQLite database integration using Prisma ORM
- Error handling with neverthrow
- Unit and E2E tests
- Code formatting with Prettier

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Setup

1. Clone the repository:

```
git clone https://github.com/shinshin86/nestjs-todo-app.git
cd nestjs-todo-app
```

2. Install dependencies:

```
npm install
```

3. Set up the database:

```
npm run db:migrate
```

4. (Optional) Seed the database:

```
npm run db:seed
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev
# or
npm run dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## API Endpoints

- `GET /todos`: Get all todos
- `GET /todos/:id`: Get a specific todo
- `POST /todos`: Create a new todo
- `PUT /todos/:id`: Update a todo
- `DELETE /todos/:id`: Delete a todo

## Development

- The main application logic is in the `src/todo` directory.
- Database schema is defined in `prisma/schema.prisma`.
- API endpoints are defined in `src/todo/todo.controller.ts`.
- Business logic is implemented in `src/todo/todo.service.ts`.


## Continuous Integration
This project uses GitHub Actions for continuous integration. The CI pipeline runs on every push to the `main` branch and on every pull request. It performs the following checks:

- Installs dependencies
- Builds the project
- Runs linting
- Generates Prisma client
- Runs Prisma migrations
- Executes unit tests
- Runs E2E tests

The CI is configured to run on Node.js versions 18.x and 20.x. You can see the details of the CI configuration in the `.github/workflows/ci.yml` file.

## Code Formatting with Prettier

This project uses Prettier for code formatting. To format your code, run:

```
npm run format
```

## Linting with ESLint
To automatically fix linting issues where possible:

```
npm run lint
```

## License

This project is MIT licensed.