# Location Platform - Peer-to-Peer Property Rental

A full-stack web application for direct property rentals between owners and tenants without intermediaries.

## Features

- **User Management**:
  - Different user roles: Admin, Owner, and Tenant
  - JWT-based authentication
  - User profile management
  - Identity verification using document uploads (AWS S3)

- **Property Listings**:
  - Owners can create, edit, and manage property listings
  - Admin approval workflow for listings
  - Rich property details including photos, location, and pricing
  - Search and filter properties by various criteria

- **Rental Requests**:
  - Tenants can create and manage rental requests
  - Owners can view and respond to rental requests
  - Admin can oversee and moderate requests

- **Real-time Messaging**:
  - Direct communication between owners and tenants
  - WebSocket-based real-time chat
  - Message history and conversation management

- **Dashboard**:
  - Role-specific dashboards for users
  - Admin dashboard for platform management

## Technology Stack

### Backend
- **Language**: Go (Golang)
- **Web Framework**: Gin
- **Database**: PostgreSQL
- **ORM**: GORM
- **API Documentation**: Swagger
- **Real-time Communication**: WebSockets (Gorilla)
- **Authentication**: JWT
- **Storage**: AWS S3

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Yup
- **API Client**: Axios
- **State Management**: React Context API
- **Routing**: React Router

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for frontend development)
- Go (for backend development)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd location-platform
   ```

2. Setup environment variables:
   ```bash
   cp backend/.env.example backend/.env
   # Edit the .env file with your database and AWS credentials
   ```

3. Run the application using Docker Compose:
   ```bash
   docker-compose up
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - API: http://localhost:8080
   - API Documentation: http://localhost:8080/swagger/index.html

### Development Setup

#### Backend
```bash
cd backend
go mod download
go run main.go
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## API Documentation

The API is documented using Swagger and can be accessed at `/swagger/index.html` when the backend is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 