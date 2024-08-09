# Todo App Frontend

This is the frontend for the Todo App, built with React and TypeScript.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Development

This project uses a proxy setup for development to communicate with the backend API. The proxy is configured in `src/setupProxy.js` and forwards requests from `/api/*` to the backend server running on `http://localhost:3001`.

### Proxy Configuration

We use `http-proxy-middleware` for setting up the development proxy. This package is installed as a dev dependency:

```bash
npm install -D http-proxy-middleware
```

The proxy configuration in `src/setupProxy.js` looks like this:

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};
```

This setup allows you to make API calls to `/api/*` in your React components, which will be automatically proxied to the backend server during development.

## Building for Production

To create a production build:

```bash
npm run build
```

This will create a `build` directory with optimized production-ready files.

## Testing

Run the test suite:

```bash
npm test
```

## Additional Scripts

- `npm run eject`: Ejects the app from Create React App configuration (use with caution)

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).