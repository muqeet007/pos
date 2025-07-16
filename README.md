
# POS Backend – API Documentation

This is the REST API for a Point of Sale (POS) system built using Node.js, Express, and MongoDB. It supports user authentication, role-based access (admin/staff), inventory management, order processing, and dashboard stats.

---

## Authentication Routes

### 1. Register User

**POST** `/api/auth/register`  
**Access:** Public

**Example 1: Admin Registration**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

**Example 2: Staff Registration**
```json
{
  "name": "Staff One",
  "email": "staff@example.com",
  "password": "staff123",
  "role": "staff"
}
```

---

### 2. Login User

**POST** `/api/auth/login`  
**Access:** Public

**Example:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

---

## Product Routes

### 1. Create Product

**POST** `/api/products`  
**Access:** Admin only

**Example 1:**
```json
{
  "name": "Pepsi",
  "category": "Drinks",
  "price": 50,
  "stock": 100,
  "barcode": "1234567890123"
}
```

**Example 2:**
```json
{
  "name": "Chips",
  "category": "Snacks",
  "price": 30,
  "stock": 200,
  "barcode": "9876543210987"
}
```

---

### 2. Get All Products

**GET** `/api/products`  
**Access:** Admin and Staff

---

### 3. Get Single Product by ID

**GET** `/api/products/:id`  
**Access:** Admin and Staff

---

### 4. Update Product

**PUT** `/api/products/:id`  
**Access:** Admin only

**Example:**
```json
{
  "price": 60,
  "stock": 80
}
```

---

### 5. Delete Product

**DELETE** `/api/products/:id`  
**Access:** Admin only

---

## Order Routes

### 1. Create Order

**POST** `/api/orders`  
**Access:** Staff and Admin

**Example 1:**
```json
{
  "customerName": "Ali Khan",
  "items": [
    {
      "product": "PRODUCT_ID_HERE",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID_HERE",
      "quantity": 1
    }
  ]
}
```

**Example 2:**
```json
{
  "customerName": "Sara Ahmed",
  "items": [
    {
      "product": "PRODUCT_ID_HERE",
      "quantity": 5
    }
  ]
}
```

---

### 2. Get All Orders

**GET** `/api/orders`  
**Access:** Admin only

---

### 3. Get Orders Created by Logged-in User

**GET** `/api/orders/my`  
**Access:** Staff/Admin

---

### 4. Get Single Order

**GET** `/api/orders/:id`  
**Access:** Staff/Admin

---

### 5. Update Order Status

**PUT** `/api/orders/:id`  
**Access:** Admin

**Example:**
```json
{
  "status": "paid"
}
```

---

### 6. Delete Order

**DELETE** `/api/orders/:id`  
**Access:** Admin

---

## Dashboard Routes

### 1. Get Admin Dashboard Stats

**GET** `/api/dashboard/stats`  
**Access:** Admin only

**Example Response:**
```json
{
  "totalOrders": 12,
  "totalRevenue": 7400,
  "totalProducts": 8,
  "totalStaff": 4
}
```

---



## Notes

- All protected routes require a valid JWT token (sent via cookie).
- Admin has full access to all routes.
- Staff can only:
  - View and create orders
  - View product catalog
  - View their own orders (`/api/orders/my`)
- Order creation automatically deducts stock from products.
- Only admin can access dashboard stats and delete/update products or orders.
