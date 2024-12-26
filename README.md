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

# Infrastructure Diagram

This diagram represents the cloud infrastructure for the Todo application, set up using Pulumi, AWS, and Docker. The infrastructure includes VPC, Subnets, EC2 instances, Load Balancer, and other necessary resources.

## Architecture Overview

- **VPC**: A Virtual Private Cloud (VPC) is created to isolate the network infrastructure.
- **Subnets**: Two public subnets in different Availability Zones (AZs) for high availability.
- **Security Group**: A security group that allows inbound HTTP, HTTPS, and custom application ports (3000, 4000, 22).
- **Key Pair**: A key pair for SSH access to EC2 instances.
- **EC2 Instances**: Two EC2 instances in different subnets hosting the backend API and frontend.
- **Application Load Balancer (ALB)**: Distributes traffic between the EC2 instances for scalability and high availability.
- **Target Group**: An ALB target group that ensures health checks are performed on the EC2 instances.
- **User Data**: Scripts to configure the EC2 instances (e.g., install software, start services).

## Diagram

```plaintext
+---------------------------+
|       Internet Gateway     |
|          (IGW)             |
+------------+--------------+
             |
             |
         +---+---+
         |  VPC   |
         +---+---+
             |
   +---------+---------+
   |                   |
+--+--+             +--+--+
| Subnet 1           | Subnet 2 |
| (AZ A)             | (AZ B)   |
| 10.0.1.0/24        | 10.0.2.0/24 |
+--+--+             +--+--+
   |                   |
+--+---+             +--+---+
| EC2 1 |             | EC2 2  |
| 10.0.1.10           | 10.0.2.10  |
| Public IP: 54.1.2.3 | Public IP: 54.1.2.4  |
+-------+             +-------+
   |
   +-------------------+
   | Target Group      |
   +-------------------+
         |
         v
   +--------------------+
   | Application Load   |
   | Balancer (ALB)     |
   | Public IP: 54.1.2.5|
   +--------------------+
         |
         v
   +-------------------+
   | Public Internet   |
   +-------------------+

```

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
make test         # Run all tests
make test-frontend # Run frontend tests
make test-backend  # Run backend tests
```

## Testing

### Frontend Testing
- Uses Jest and React Testing Library
- Run tests with `make test-frontend`

### Backend Testing
- Uses Jest for unit and integration tests
- Run tests with `make test-backend`

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
