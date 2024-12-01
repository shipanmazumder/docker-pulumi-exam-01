# Full-Stack Todo Application

A modern, containerized Todo application built with Next.js, NestJS, and managed with Pulumi infrastructure as code.

## Tech Stack

### Frontend
- Next.js with TypeScript
- Tailwind CSS for styling
- Redux for state management
- Shadcn UI components

### Backend
- NestJS framework
- TypeScript
- REST API architecture
- Health checks and exception handling

### Infrastructure & DevOps
- Docker for containerization
- Pulumi for infrastructure as code
- Docker Compose for local development
- Make for build automation

## Project Structure

```
.
├── frontend/               # Next.js frontend application
├── backend/               # NestJS backend API
│   └── apps/todo/         # Todo microservice
├── infra/                 # Pulumi infrastructure code
└── docker-compose.yaml    # Local development setup
```

## Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- Pulumi CLI
- Make

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd docker-pulumi-exam-01
```

2. Install dependencies:
```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install

# Infrastructure dependencies
cd ../infra
npm install
```

3. Start the development environment:
```bash
make dev
```

This will start both frontend and backend services in development mode.

## Development

### Frontend Development
- Frontend runs on `http://localhost:3000`
- Uses Next.js 13+ with app router
- Implements modern React patterns and hooks
- Includes pre-configured UI components

### Backend Development
- API runs on `http://localhost:3001`
- Built with NestJS modular architecture
- Includes health checks and exception handling
- Follows REST API best practices

### Infrastructure
- Uses Pulumi for infrastructure as code
- Manages cloud resources and deployments
- Configuration in `infra/` directory

## Available Make Commands

```bash
make dev          # Start development environment
make build        # Build all containers
make down         # Stop all containers
```

## API Documentation

The backend API provides the following endpoints:

- `GET /api/todos` - List all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `GET /health` - Health check endpoint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
