# MarketHub Admin — Full-Stack Marketplace Management System

A full-stack marketplace administration dashboard built with **React.js, Node.js, Express.js, and MongoDB**. This project demonstrates RESTful API development, database management, authentication, CRUD operations, and API testing through Postman.

> **Project Type:** Technical Test / Portfolio Project  
> **Role:** Full-Stack Developer  
> **Status:** In Development

---

## Overview

MarketHub Admin is a marketplace management application designed to simplify the administration of users, products, product categories, and orders through a centralized dashboard.

The application combines a React-based admin interface with an Express.js REST API and a MongoDB database. It follows a modular backend structure to keep models, controllers, routes, and middleware organized and maintainable.

The project focuses on practical full-stack development principles, including data validation, password hashing, token-based authentication, and API integration.

## Key Features

- **Admin Authentication** — Login and logout functionality with JSON Web Tokens (JWT).
- **User Management** — Create, read, update, and delete user records.
- **Product Management** — Manage product information, codes, prices, and category references.
- **Category Management** — Organize marketplace products into categories.
- **Order Management** — Manage order records and product quantities.
- **Dummy Data Generation** — Populate collections through dedicated Express.js endpoints.
- **RESTful API** — Structured endpoints for CRUD operations across four resources.
- **MongoDB Integration** — Persist marketplace data using MongoDB and Mongoose.
- **Postman API Testing** — Test authentication, CRUD endpoints, and API responses.
- **JSON Data Export** — Export database collections into JSON files.
- **Responsive Admin Dashboard** — Sidebar navigation, summary cards, data tables, and management forms.

## Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Admin dashboard and user interface |
| Vite | Frontend development and build tooling |
| Node.js | JavaScript runtime |
| Express.js | REST API and backend routing |
| MongoDB | NoSQL database |
| Mongoose | Database schemas, models, and validation |
| JWT | Token-based authentication |
| bcryptjs | Password hashing |
| Axios | Frontend-to-backend API communication |
| Postman | API testing and documentation |
| Git & GitHub | Version control and project hosting |

## Application Architecture

```text
React.js Admin Dashboard
          |
          | HTTP / JSON
          v
    Express.js REST API
          |
          +-- Authentication Middleware
          |
          +-- Controllers
          |
          +-- Mongoose Models
          |
          v
      MongoDB Database
          |
          v
   JSON Export Files
```

The application separates frontend responsibilities from backend business logic. The React frontend communicates with the Express API, while Mongoose handles database operations.

## Database Design

The application uses four primary MongoDB collections.

### 1. Users

Stores marketplace user information.

| Field | Description |
|---|---|
| `us_id` | Unique user identifier |
| `us_name` | User's name |
| `us_password` | Hashed user password |
| `us_email` | User's email address |
| `us_phone_number` | User's phone number |
| `us_address` | User's address |
| `us_created_at` | Record creation timestamp |
| `us_updated_at` | Last update timestamp |

### 2. Products

Stores product information and category references.

| Field | Description |
|---|---|
| `pd_id` | Unique product identifier |
| `pd_code` | Product code |
| `pd_ct_id` | Reference to a category |
| `pd_name` | Product name |
| `pd_price` | Product price |
| `pd_created_at` | Record creation timestamp |
| `pd_updated_at` | Last update timestamp |

### 3. Categories

Stores product category information.

| Field | Description |
|---|---|
| `ct_id` | Unique category identifier |
| `ct_code` | Category code |
| `ct_name` | Category name |
| `ct_created_at` | Record creation timestamp |
| `ct_updated_at` | Last update timestamp |

### 4. Orders

Stores product order information.

| Field | Description |
|---|---|
| `or_id` | Unique order identifier |
| `or_pd_id` | Reference to a product |
| `or_amount` | Ordered quantity |
| `or_created_at` | Record creation timestamp |
| `or_updated_at` | Last update timestamp |

**Data relationship:** Products reference Categories through `pd_ct_id`, and Orders reference Products through `or_pd_id`.

## Project Structure

```text
markethub-admin/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── dataDummy.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── postman/
├── exports/
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- Node.js and npm
- MongoDB Community Server or a MongoDB Atlas account
- Git
- Postman (recommended for API testing)

### 1. Clone the Repository

```bash
git clone https://github.com/AsmanRudi/markethub-admin.git
cd markethub-admin
```

Replace the repository URL if your GitHub repository uses a different name.

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/markethub
JWT_SECRET=replace_with_a_long_random_secret
ADMIN_EMAIL=admin@markethub.local
ADMIN_PASSWORD=replace_with_a_strong_password
```

Update `MONGODB_URI` if you use MongoDB Atlas instead of a local database.

### 3. Start the Backend

```bash
npm run dev
```

The API should be available at:

`http://localhost:5000`

Check the root endpoint:

`GET http://localhost:5000/`

### 4. Configure the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start the Frontend

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

Use the administrator credentials configured in the backend environment variables to sign in.

## REST API Reference

Base URL:

`http://localhost:5000/api`

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Authenticate administrator |
| POST | `/auth/logout` | End the frontend session |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | Retrieve all users |
| GET | `/users/:id` | Retrieve a user |
| POST | `/users` | Create a user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Retrieve all products |
| GET | `/products/:id` | Retrieve a product |
| POST | `/products` | Create a product |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | Retrieve all categories |
| GET | `/categories/:id` | Retrieve a category |
| POST | `/categories` | Create a category |
| PUT | `/categories/:id` | Update a category |
| DELETE | `/categories/:id` | Delete a category |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| GET | `/orders` | Retrieve all orders |
| GET | `/orders/:id` | Retrieve an order |
| POST | `/orders` | Create an order |
| PUT | `/orders/:id` | Update an order |
| DELETE | `/orders/:id` | Delete an order |

### Dummy Data Endpoints

All dummy endpoints require administrator authentication.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/dummy/addUsers` | Populate user data |
| POST | `/dummy/addProducts` | Populate product data |
| POST | `/dummy/addCategories` | Populate category data |
| POST | `/dummy/addOrders` | Populate order data |

### Authentication Example

Send a `POST` request to `/auth/login`:

```json
{
 
