# 🎟️ Event Ticketing System API

A robust Node.js REST API for managing events, bookings, and users, built with Express and MongoDB.  
Supports user authentication, admin controls, QR code ticketing and email confirmations.

---
## 🌐 Deployment

- **Root project URL**: https://sokly-inf653-final.onrender.com/
- **REST API root URL**: https://sokly-inf653-final.onrender.com/api/events

---

## 🚀 Features

- **User Registration & Login** (JWT authentication)
- **Role-based Access:** User & Admin
- **Event Management:** Create, update, delete, and view events (admin only for create/update/delete)
- **Event Filtering:** By category and date
- **Booking System:** Book tickets, seat capacity enforcement
- **QR Code Generation:** Unique QR for each booking
- **Email Confirmation:** Booking summary with QR code (via nodemailer)
- **Ticket Validation:** Validate tickets by QR code
- **Admin Dashboard:** View all events and bookings
- **404 Handler:** HTML or JSON based on request type

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SoklyHour/Sokly_INF653_Final.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

## 📄 CREATE YOUR OWN `.env`

- Fill in your values:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5001
  EMAIL_USER=your_gmail_address
  EMAIL_PASS=your_gmail_app_password
  ```

### 4. Start the Server

```bash
npm start
```
The API will run at [http://localhost:5001/](http://localhost:5001/)

---

## 📚 API Reference

### Authentication

- **POST `/api/auth/register`**  
  Register a new user  
  **Body:**  
  ```json
  { "name": "User Name", "email": "user@example.com", "password": "YourPassword" }
  ```

- **POST `/api/auth/login`**  
  Login and receive JWT  
  **Body:**  
  ```json
  { "email": "user@example.com", "password": "YourPassword" }
  ```

---

### Events

- **GET `/api/events`**  
  Get all events (supports `?category=` and `?date=` filters)

- **GET `/api/events/:id`**  
  Get event details by ID

- **POST `/api/events`**  
  Create event (admin only)  
  **Headers:** `Authorization: Bearer <token>`

- **PUT `/api/events/:id`**  
  Update event (admin only)  
  **Headers:** `Authorization: Bearer <token>`

- **DELETE `/api/events/:id`**  
  Delete event (admin only)  
  **Headers:** `Authorization: Bearer <token>`

- **GET `/api/events/admin/dashboard`**  
  Admin dashboard: all events with bookings  
  **Headers:** `Authorization: Bearer <token>`

---

### Bookings

- **POST `/api/bookings`**  
  Book tickets for an event  
  **Headers:** `Authorization: Bearer <token>`  
  **Body:**  
  ```json
  { "event": "<event_id>", "quantity": 1 }
  ```

- **GET `/api/bookings`**  
  Get all bookings for the logged-in user  
  **Headers:** `Authorization: Bearer <token>`

- **GET `/api/bookings/:id`**  
  Get a specific booking by ID  
  **Headers:** `Authorization: Bearer <token>`

- **GET `/api/bookings/validate/:qr`**  
  Validate a ticket by QR code (URL-encoded string)

---

### Users (Admin Only / Testing)

- **POST `/api/users`**  
  Create a user

- **GET `/api/users`**  
  Get all users

---

## 🧪 Testing

- All endpoints tested with Postman/Thunder Client.
- Use valid JWT tokens for protected routes.
- Test booking, event creation, and QR code validation.

---

## 🛡️ Error Handling

- **404 HTML page** for browser requests
- **JSON error:** `{ "error": "404 Not Found" }` for API requests
- Handles invalid inputs, missing data, duplicate actions, and unauthorized access.

---

## 📝 Reflection

- **What I learned:**  
  Building a full-stack REST API with authentication, role-based access, and third-party integrations (QR code, email) using Node.js and MongoDB.
- **Most challenging part:**  
  Ensuring secure authentication, handling edge cases in booking logic, and integrating email/QR code features.

---

## 👨‍💻 Author

Sokly Hour