# Restaurant & Café Management System

A full-stack web application for managing restaurant and café operations, built with **Java Spring Boot** and **Angular** as a learning project for production-level software development.

## Features

- **Menu Management**: Browse and manage menu items with categories
- **Order Management**: Create, track, and update customer orders
- **Real-time Updates**: Hot reload enabled for both frontend and backend development
- **RESTful API**: Clean API design with proper HTTP methods
- **Responsive UI**: Modern Angular frontend with responsive design
- **Database**: PostgreSQL for persistent data storage

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA** for database operations
- **PostgreSQL** database
- **Maven** for dependency management
- **Lombok** for reducing boilerplate code
- **Spring Boot DevTools** for hot reload

### Frontend
- **Angular 17**
- **TypeScript**
- **RxJS** for reactive programming
- **Standalone Components** (latest Angular pattern)
- **HttpClient** for API communication

### DevOps
- **Docker** and **Docker Compose** for containerization
- **Hot Reload** enabled for both frontend and backend
- Volume mounting for live code changes

## Project Structure

```
textbook-web-angular-springboot/
├── backend/                    # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/learning/restaurant/
│   │   │   │   ├── controller/     # REST controllers
│   │   │   │   ├── service/        # Business logic
│   │   │   │   ├── repository/     # Data access layer
│   │   │   │   ├── model/          # Entity classes
│   │   │   │   ├── dto/            # Data transfer objects
│   │   │   │   └── config/         # Configuration classes
│   │   │   └── resources/
│   │   │       ├── application.yml # Configuration
│   │   │       └── data.sql        # Sample data
│   │   └── test/                   # Test classes
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                   # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/         # UI components
│   │   │   ├── services/           # API services
│   │   │   ├── models/             # TypeScript interfaces
│   │   │   └── app.routes.ts       # Routing configuration
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── Dockerfile
│   ├── package.json
│   └── angular.json
├── doc/                        # Documentation
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- **Docker** (version 20.x or higher)
- **Docker Compose** (version 2.x or higher)

That's it! No need to install Java, Node.js, or PostgreSQL separately.

### Running the Application

1. **Clone or navigate to the project directory:**
   ```bash
   cd xxx\learning\textbook-web-angular-springboot
   ```

2. **Start all services with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build and start the PostgreSQL database
   - Build and start the Spring Boot backend (http://localhost:8080)
   - Build and start the Angular frontend (http://localhost:4200)
   - Set up hot reload for both frontend and backend

3. **Access the application:**
   - **Frontend**: Open http://localhost:4200 in your browser
   - **Backend API**: http://localhost:8080/api
   - **Database**: localhost:5432 (user: restaurant_user, password: restaurant_pass)

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Hot Reload Development

The project is configured with hot reload for efficient development:

**Backend (Spring Boot):**
- Changes to Java files in `backend/src/` will automatically trigger a restart
- Powered by Spring Boot DevTools
- No need to rebuild Docker container during development

**Frontend (Angular):**
- Changes to TypeScript/HTML/CSS files in `frontend/src/` will automatically reload the browser
- Powered by Angular CLI dev server with polling
- Instant feedback on code changes

### First Time Setup

When you first run the application:
1. Docker will download the necessary images (PostgreSQL, Node, Maven)
2. Backend will download Maven dependencies (first run may take a few minutes)
3. Frontend will install npm packages
4. Database will be initialized with sample menu items

## API Endpoints

### Menu Items
- `GET /api/menu-items` - Get all menu items
- `GET /api/menu-items/available` - Get available menu items
- `GET /api/menu-items/category/{category}` - Get items by category
- `GET /api/menu-items/{id}` - Get menu item by ID
- `POST /api/menu-items` - Create new menu item
- `PUT /api/menu-items/{id}` - Update menu item
- `DELETE /api/menu-items/{id}` - Delete menu item

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/status/{status}` - Get orders by status
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/{id}/status?status={status}` - Update order status
- `DELETE /api/orders/{id}` - Delete order

## Learning Objectives

This project covers:

### Backend Concepts
- **Spring Boot application structure**
- **RESTful API design** with proper HTTP methods
- **JPA/Hibernate** for ORM
- **Repository pattern** for data access
- **Service layer** for business logic
- **DTOs** for data transfer
- **Entity relationships** (One-to-Many, Many-to-One)
- **Bean Validation** with Jakarta Validation
- **CORS configuration** for cross-origin requests
- **Application configuration** with YAML

### Frontend Concepts
- **Angular standalone components** (modern approach)
- **Routing** with Angular Router
- **HTTP client** for API calls
- **RxJS Observables** for async operations
- **TypeScript interfaces** for type safety
- **Two-way data binding** with ngModel
- **Component communication**
- **Service injection** and dependency injection

### DevOps Concepts
- **Dockerization** of multi-tier applications
- **Docker Compose** for orchestrating services
- **Volume mounting** for development
- **Container networking**
- **Health checks** for services
- **Environment variables** for configuration

## Common Operations

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Rebuild After Major Changes
```bash
docker-compose down
docker-compose up --build
```

### Clean Everything (including database)
```bash
docker-compose down -v
```

### Access Database
```bash
docker exec -it restaurant-postgres psql -U restaurant_user -d restaurant_db
```

## Modifying and Extending

### Adding a New Entity

1. **Create the entity class** in `backend/src/.../model/`
2. **Create the repository** in `backend/src/.../repository/`
3. **Create the service** in `backend/src/.../service/`
4. **Create the controller** in `backend/src/.../controller/`
5. **Create DTOs** in `backend/src/.../dto/`
6. **Create the TypeScript model** in `frontend/src/app/models/`
7. **Create the Angular service** in `frontend/src/app/services/`
8. **Create components** in `frontend/src/app/components/`

### Adding Sample Data

Edit `backend/src/main/resources/data.sql` and restart the backend container.

## Troubleshooting

### Backend not starting
- Check if port 8080 is available
- Ensure PostgreSQL is healthy: `docker-compose ps`
- Check backend logs: `docker-compose logs backend`

### Frontend not starting
- Check if port 4200 is available
- Check frontend logs: `docker-compose logs frontend`
- Verify npm dependencies: `docker-compose exec frontend npm list`

### Database connection issues
- Ensure PostgreSQL container is running
- Check database logs: `docker-compose logs postgres`
- Verify credentials in `application.yml`

### Hot reload not working
- Ensure volume mounts are correct in `docker-compose.yml`
- On Windows, Docker Desktop should have proper file sharing enabled
- Try restarting Docker Desktop

## Next Steps for Learning

1. **Add authentication and authorization** (Spring Security + JWT)
2. **Implement pagination and sorting** for large datasets
3. **Add unit and integration tests** (JUnit, Mockito, Jasmine, Karma)
4. **Implement search functionality** with filters
5. **Add WebSocket support** for real-time order updates
6. **Create admin dashboard** for analytics
7. **Add file upload** for menu item images
8. **Implement caching** with Redis
9. **Add API documentation** with Swagger/OpenAPI
10. **Deploy to cloud** (AWS, Azure, or GCP)

## Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## License

This is a learning project and is free to use for educational purposes.
