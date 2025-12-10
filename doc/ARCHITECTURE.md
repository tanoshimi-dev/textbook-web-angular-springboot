# Architecture Documentation

## System Architecture

This Restaurant & Café Management System follows a **three-tier architecture** pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│                     (Angular Frontend)                        │
│                    http://localhost:4200                      │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         │
┌────────────────────────▼────────────────────────────────────┐
│                     Application Layer                        │
│                   (Spring Boot Backend)                       │
│                    http://localhost:8080                      │
└────────────────────────┬────────────────────────────────────┘
                         │ JDBC
                         │
┌────────────────────────▼────────────────────────────────────┐
│                       Data Layer                             │
│                  (PostgreSQL Database)                        │
│                     localhost:5432                            │
└─────────────────────────────────────────────────────────────┘
```

## Backend Architecture (Spring Boot)

### Layered Architecture

```
Controller Layer (REST API)
        ↓
Service Layer (Business Logic)
        ↓
Repository Layer (Data Access)
        ↓
Entity Layer (Database Models)
```

### Package Structure

- **controller**: REST endpoints, HTTP request/response handling
- **service**: Business logic, transaction management
- **repository**: Database queries using Spring Data JPA
- **model**: JPA entities representing database tables
- **dto**: Data Transfer Objects for API contracts
- **config**: Application configuration classes

### Key Design Patterns

1. **Repository Pattern**: Abstracts data access logic
2. **Service Pattern**: Encapsulates business logic
3. **DTO Pattern**: Separates internal models from API contracts
4. **Dependency Injection**: Spring manages object lifecycle
5. **Builder Pattern**: Lombok's @Data generates builders

## Frontend Architecture (Angular)

### Component-Based Architecture

```
AppComponent (Root)
    ├── MenuListComponent
    ├── OrderListComponent
    └── CreateOrderComponent
```

### Folder Structure

- **components**: UI components with templates and logic
- **services**: HTTP client services for API calls
- **models**: TypeScript interfaces for type safety
- **app.routes.ts**: Route configuration

### Key Concepts

1. **Standalone Components**: Modern Angular pattern (no NgModules)
2. **Lazy Loading**: Routes load components on demand
3. **Reactive Programming**: RxJS Observables for async operations
4. **Dependency Injection**: Services injected into components
5. **Two-way Binding**: ngModel for form inputs

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐         ┌──────────────────┐
│   MenuItem      │         │      Order       │
├─────────────────┤         ├──────────────────┤
│ id (PK)         │         │ id (PK)          │
│ name            │         │ customerName     │
│ description     │    ┌────┤ customerEmail    │
│ price           │    │    │ customerPhone    │
│ category        │    │    │ tableNumber      │
│ imageUrl        │    │    │ orderType        │
│ available       │    │    │ status           │
│ preparationTime │    │    │ totalAmount      │
│ createdAt       │    │    │ notes            │
│ updatedAt       │    │    │ createdAt        │
└─────────────────┘    │    │ updatedAt        │
                       │    └──────────────────┘
                       │              │
                       │              │ 1:N
                       │              ▼
                       │    ┌──────────────────┐
                       │    │   OrderItem      │
                       │    ├──────────────────┤
                       │    │ id (PK)          │
                       │    │ orderId (FK)     │
                       └────┤ menuItemId (FK)  │
                            │ quantity         │
                            │ price            │
                            │ specialInst...   │
                            └──────────────────┘
```

### Relationships

- **Order → OrderItem**: One-to-Many (cascade operations)
- **MenuItem → OrderItem**: Many-to-One (eager loading)

## API Design

### RESTful Principles

- **Resources**: `/api/menu-items`, `/api/orders`
- **HTTP Methods**: GET (read), POST (create), PUT (update), PATCH (partial update), DELETE (delete)
- **Status Codes**: 200 (OK), 201 (Created), 204 (No Content), 404 (Not Found)
- **JSON**: Request/response body format

### CORS Configuration

- Frontend origin: `http://localhost:4200`
- Allowed methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
- Credentials: Enabled

## Docker Architecture

### Multi-Container Setup

```
┌──────────────────────────────────────────────────────────┐
│                    Docker Host                            │
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │  Frontend   │  │  Backend    │  │  PostgreSQL │      │
│  │  Container  │  │  Container  │  │  Container  │      │
│  │  (Angular)  │  │ (Spring Boot)│  │  (Database) │      │
│  │  :4200      │  │  :8080      │  │  :5432      │      │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘      │
│         │                │                │             │
│         └────────────────┴────────────────┘             │
│              restaurant-network (bridge)                 │
└──────────────────────────────────────────────────────────┘
```

### Volume Mounts

**Backend:**
- Source code: `./backend/src` → `/app/src`
- Maven cache: `maven_cache` → `/root/.m2`

**Frontend:**
- Source code: `./frontend/src` → `/app/src`
- Node modules: Anonymous volume for `/app/node_modules`

**Database:**
- Data persistence: `postgres_data` → `/var/lib/postgresql/data`

### Hot Reload Mechanism

**Spring Boot:**
1. File changes detected in mounted volume
2. Spring Boot DevTools triggers automatic restart
3. Only changed classes are reloaded (fast restart)

**Angular:**
1. Angular CLI watches for file changes (with polling)
2. Webpack recompiles changed modules
3. Browser auto-reloads via WebSocket

## Data Flow

### Creating an Order

```
1. User fills order form (CreateOrderComponent)
        ↓
2. Component calls OrderService.createOrder()
        ↓
3. HTTP POST to /api/orders
        ↓
4. OrderController receives request
        ↓
5. OrderService processes business logic
   - Validates menu items exist
   - Creates OrderItem entities
   - Calculates total
        ↓
6. OrderRepository saves to database
        ↓
7. Response DTO sent back to frontend
        ↓
8. Navigate to orders list
```

### Viewing Menu Items

```
1. MenuListComponent initialized
        ↓
2. ngOnInit() calls MenuItemService.getAvailableMenuItems()
        ↓
3. HTTP GET to /api/menu-items/available
        ↓
4. MenuItemController receives request
        ↓
5. MenuItemService fetches from repository
        ↓
6. Repository queries database
        ↓
7. Entities converted to DTOs
        ↓
8. JSON response sent to frontend
        ↓
9. Observable updates component data
        ↓
10. Angular renders menu items
```

## Security Considerations

### Current Implementation (Development)

- No authentication (for learning simplicity)
- CORS enabled for development
- Database credentials in configuration files

### Production Recommendations

1. **Authentication**: Implement Spring Security with JWT
2. **Authorization**: Role-based access control (ROLE_ADMIN, ROLE_USER)
3. **HTTPS**: Use SSL/TLS for encrypted communication
4. **Environment Variables**: Externalize sensitive configuration
5. **Input Validation**: Already implemented with Jakarta Validation
6. **SQL Injection**: Protected by JPA/Hibernate
7. **CSRF Protection**: Enable for state-changing operations
8. **Rate Limiting**: Prevent API abuse

## Performance Considerations

### Current Implementation

- **Eager Loading**: MenuItem in OrderItem (N+1 avoided)
- **Lazy Loading**: Order in OrderItem
- **Connection Pooling**: HikariCP (default in Spring Boot)

### Optimization Opportunities

1. **Caching**: Redis for frequently accessed data
2. **Pagination**: Implement for large datasets
3. **Indexing**: Add database indexes for common queries
4. **CDN**: Serve static assets from CDN
5. **Compression**: Enable GZIP for API responses
6. **Query Optimization**: Use JPQL or native queries for complex operations

## Scalability

### Horizontal Scaling

```
Load Balancer
    ├── Backend Instance 1
    ├── Backend Instance 2
    └── Backend Instance 3
            ↓
    Database (with replication)
```

### Stateless Design

- No session state in backend
- JWT tokens for authentication (future)
- Allows multiple backend instances

## Monitoring & Logging

### Current Logging

- Spring Boot logs to console
- Hibernate SQL queries logged (DEBUG level)
- Angular logs to browser console

### Production Monitoring

1. **Application Monitoring**: Spring Boot Actuator
2. **Metrics**: Prometheus + Grafana
3. **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
4. **Tracing**: Zipkin or Jaeger
5. **Error Tracking**: Sentry

## Testing Strategy

### Backend Testing

- **Unit Tests**: Service layer with Mockito
- **Integration Tests**: Repository with @DataJpaTest
- **API Tests**: Controllers with @WebMvcTest
- **E2E Tests**: Full application with @SpringBootTest

### Frontend Testing

- **Unit Tests**: Components and services with Jasmine
- **Integration Tests**: Component interactions
- **E2E Tests**: User flows with Protractor or Cypress

## Deployment Architecture (Future)

```
┌────────────────────────────────────────────┐
│              Cloud Provider                 │
│  ┌──────────────────────────────────────┐  │
│  │  Container Orchestration (K8s/ECS)   │  │
│  │  ┌────────┐ ┌────────┐ ┌──────────┐ │  │
│  │  │Frontend│ │Backend │ │ Database │ │  │
│  │  │  Pod   │ │  Pod   │ │ (RDS)    │ │  │
│  │  └────────┘ └────────┘ └──────────┘ │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

### Cloud Services Integration

- **Compute**: AWS ECS, Google Cloud Run, Azure Container Instances
- **Database**: AWS RDS, Google Cloud SQL, Azure Database
- **Storage**: AWS S3 for images
- **CDN**: CloudFront, Cloud CDN
- **Secrets**: AWS Secrets Manager, Azure Key Vault
