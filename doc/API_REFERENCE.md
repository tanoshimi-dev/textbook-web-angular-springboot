# API Reference

Base URL: `http://localhost:8080/api`

## Menu Items API

### Get All Menu Items

```http
GET /api/menu-items
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Espresso",
    "description": "Rich and bold Italian coffee",
    "price": 3.50,
    "category": "Coffee",
    "imageUrl": null,
    "available": true,
    "preparationTime": 3
  }
]
```

### Get Available Menu Items

```http
GET /api/menu-items/available
```

Returns only items where `available = true`.

### Get Menu Items by Category

```http
GET /api/menu-items/category/{category}
```

**Path Parameters:**
- `category` (string): Category name (e.g., "Coffee", "Pastry", "Sandwich", "Salad")

**Example:**
```http
GET /api/menu-items/category/Coffee
```

### Get Menu Item by ID

```http
GET /api/menu-items/{id}
```

**Path Parameters:**
- `id` (number): Menu item ID

**Response:**
```json
{
  "id": 1,
  "name": "Espresso",
  "description": "Rich and bold Italian coffee",
  "price": 3.50,
  "category": "Coffee",
  "imageUrl": null,
  "available": true,
  "preparationTime": 3
}
```

**Error Response (404):**
```json
{
  "message": "Menu item not found with id: 999"
}
```

### Create Menu Item

```http
POST /api/menu-items
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Iced Latte",
  "description": "Cold espresso with milk over ice",
  "price": 5.25,
  "category": "Coffee",
  "available": true,
  "preparationTime": 5
}
```

**Validation Rules:**
- `name`: Required, not blank
- `price`: Required, must be positive
- `category`: Required, not blank
- `available`: Optional, defaults to true

**Response (201 Created):**
```json
{
  "id": 17,
  "name": "Iced Latte",
  "description": "Cold espresso with milk over ice",
  "price": 5.25,
  "category": "Coffee",
  "imageUrl": null,
  "available": true,
  "preparationTime": 5
}
```

### Update Menu Item

```http
PUT /api/menu-items/{id}
Content-Type: application/json
```

**Path Parameters:**
- `id` (number): Menu item ID

**Request Body:**
```json
{
  "name": "Iced Latte",
  "description": "Refreshing cold espresso with milk",
  "price": 5.50,
  "category": "Coffee",
  "available": true,
  "preparationTime": 6
}
```

**Response (200 OK):**
```json
{
  "id": 17,
  "name": "Iced Latte",
  "description": "Refreshing cold espresso with milk",
  "price": 5.50,
  "category": "Coffee",
  "imageUrl": null,
  "available": true,
  "preparationTime": 6
}
```

### Delete Menu Item

```http
DELETE /api/menu-items/{id}
```

**Path Parameters:**
- `id` (number): Menu item ID

**Response (204 No Content)**

---

## Orders API

### Get All Orders

```http
GET /api/orders
```

**Response:**
```json
[
  {
    "id": 1,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "555-1234",
    "tableNumber": "5",
    "orderType": "DINE_IN",
    "status": "PENDING",
    "items": [
      {
        "id": 1,
        "menuItemId": 1,
        "menuItemName": "Espresso",
        "quantity": 2,
        "price": 3.50,
        "specialInstructions": null,
        "subtotal": 7.00
      }
    ],
    "totalAmount": 7.00,
    "notes": null,
    "createdAt": "2025-12-09T10:30:00",
    "updatedAt": "2025-12-09T10:30:00"
  }
]
```

### Get Orders by Status

```http
GET /api/orders/status/{status}
```

**Path Parameters:**
- `status` (enum): Order status
  - `PENDING`
  - `CONFIRMED`
  - `PREPARING`
  - `READY`
  - `SERVED`
  - `COMPLETED`
  - `CANCELLED`

**Example:**
```http
GET /api/orders/status/PENDING
```

### Get Order by ID

```http
GET /api/orders/{id}
```

**Path Parameters:**
- `id` (number): Order ID

**Response:**
```json
{
  "id": 1,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "555-1234",
  "tableNumber": "5",
  "orderType": "DINE_IN",
  "status": "PENDING",
  "items": [
    {
      "id": 1,
      "menuItemId": 1,
      "menuItemName": "Espresso",
      "quantity": 2,
      "price": 3.50,
      "specialInstructions": "Extra hot",
      "subtotal": 7.00
    }
  ],
  "totalAmount": 7.00,
  "notes": "Please bring extra napkins",
  "createdAt": "2025-12-09T10:30:00",
  "updatedAt": "2025-12-09T10:30:00"
}
```

### Create Order

```http
POST /api/orders
Content-Type: application/json
```

**Request Body:**
```json
{
  "customerName": "Jane Smith",
  "customerEmail": "jane@example.com",
  "customerPhone": "555-5678",
  "tableNumber": "3",
  "orderType": "DINE_IN",
  "items": [
    {
      "menuItemId": 1,
      "quantity": 2,
      "specialInstructions": "Extra hot"
    },
    {
      "menuItemId": 6,
      "quantity": 1,
      "specialInstructions": null
    }
  ],
  "notes": "Birthday celebration"
}
```

**Validation Rules:**
- `customerName`: Required, not blank
- `orderType`: Required (DINE_IN, TAKEAWAY, or DELIVERY)
- `items`: Must contain at least one item
- `items[].menuItemId`: Required, must exist in database
- `items[].quantity`: Required, must be positive

**Response (201 Created):**
```json
{
  "id": 2,
  "customerName": "Jane Smith",
  "customerEmail": "jane@example.com",
  "customerPhone": "555-5678",
  "tableNumber": "3",
  "orderType": "DINE_IN",
  "status": "PENDING",
  "items": [
    {
      "id": 2,
      "menuItemId": 1,
      "menuItemName": "Espresso",
      "quantity": 2,
      "price": 3.50,
      "specialInstructions": "Extra hot",
      "subtotal": 7.00
    },
    {
      "id": 3,
      "menuItemId": 6,
      "menuItemName": "Croissant",
      "quantity": 1,
      "price": 3.25,
      "specialInstructions": null,
      "subtotal": 3.25
    }
  ],
  "totalAmount": 10.25,
  "notes": "Birthday celebration",
  "createdAt": "2025-12-09T11:00:00",
  "updatedAt": "2025-12-09T11:00:00"
}
```

### Update Order Status

```http
PATCH /api/orders/{id}/status?status={status}
```

**Path Parameters:**
- `id` (number): Order ID

**Query Parameters:**
- `status` (enum): New order status
  - `PENDING`
  - `CONFIRMED`
  - `PREPARING`
  - `READY`
  - `SERVED`
  - `COMPLETED`
  - `CANCELLED`

**Example:**
```http
PATCH /api/orders/1/status?status=CONFIRMED
```

**Response (200 OK):**
```json
{
  "id": 1,
  "customerName": "John Doe",
  "status": "CONFIRMED",
  ...
}
```

### Delete Order

```http
DELETE /api/orders/{id}
```

**Path Parameters:**
- `id` (number): Order ID

**Response (204 No Content)**

---

## Data Models

### MenuItem

```typescript
{
  id?: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
  preparationTime?: number;
}
```

### Order

```typescript
{
  id?: number;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  tableNumber?: string;
  orderType: 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY';
  status?: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'SERVED' | 'COMPLETED' | 'CANCELLED';
  items: OrderItem[];
  totalAmount?: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### OrderItem

```typescript
{
  id?: number;
  menuItemId: number;
  menuItemName?: string;
  quantity: number;
  price?: number;
  specialInstructions?: string;
  subtotal?: number;
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "timestamp": "2025-12-09T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    },
    {
      "field": "price",
      "message": "Price must be positive"
    }
  ]
}
```

### 404 Not Found

```json
{
  "timestamp": "2025-12-09T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Menu item not found with id: 999"
}
```

### 500 Internal Server Error

```json
{
  "timestamp": "2025-12-09T10:30:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Testing with cURL

### Create a Menu Item

```bash
curl -X POST http://localhost:8080/api/menu-items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Iced Coffee",
    "description": "Cold brew coffee over ice",
    "price": 4.50,
    "category": "Coffee",
    "available": true,
    "preparationTime": 3
  }'
```

### Create an Order

```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Alice Johnson",
    "orderType": "TAKEAWAY",
    "items": [
      {
        "menuItemId": 1,
        "quantity": 2
      }
    ]
  }'
```

### Update Order Status

```bash
curl -X PATCH "http://localhost:8080/api/orders/1/status?status=CONFIRMED"
```

---

## Rate Limiting (Future)

Currently not implemented. Recommended limits for production:

- 100 requests per minute per IP
- 1000 requests per hour per IP

## Authentication (Future)

When implementing authentication, endpoints will require:

```http
Authorization: Bearer <jwt-token>
```

Role-based access:
- `ROLE_USER`: Can view menu, create orders
- `ROLE_ADMIN`: Can manage menu items, view all orders
