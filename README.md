# Chat AI Web Application

A web application that allows users to interact with an AI chat interface. Built with React for the frontend and Node.js/Express for the backend.

## Features

- Modern, responsive UI built with Material-UI
- Real-time chat interface
- Backend API for handling chat requests
- Easy to integrate with various AI services

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=5000
```

## Running the Application

1. Start the backend server:
```bash
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
npm run client
```

3. Open your browser and navigate to `http://localhost:3000`

## Development

- Backend server runs on `http://localhost:5000`
- Frontend development server runs on `http://localhost:3000`
- API endpoint for chat: `POST http://localhost:5000/api/chat`

## Project Structure

```
.
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── App.js         # Main React component
│       └── index.js       # React entry point
├── server.js              # Express backend server
├── package.json           # Backend dependencies
└── README.md             # Project documentation
```

## Adding AI Integration

To integrate with an AI service:

1. Modify the `/api/chat` endpoint in `server.js`
2. Add your AI service API key to the `.env` file
3. Implement the chat logic in the server

## License

MIT
