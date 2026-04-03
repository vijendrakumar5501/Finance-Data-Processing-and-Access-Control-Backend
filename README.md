
 # 💰 Finance Dashboard Backend

A scalable and secure backend system for managing financial records, user roles, and dashboard analytics using **Node.js, Express.js, and MongoDB**.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Password hashing using bcrypt
* Role-Based Access Control 
* Active/Inactive user management

---

### 👥 User Management

* Create users
* Assign roles (`viewer`, `analyst`, `admin`)
* Update user details
* Delete users
* Restrict access based on roles

---

### 💸 Financial Records Management

* Create financial records
* View records with filters
* Update records
* Delete records

#### Fields:

* Amount
* Type (income / expense)
* Category
* Date
* Notes

#### Filters:

* By type
* By category
* By date range

---

### 📊 Dashboard APIs

* Total Income
* Total Expenses
* Net Balance
* Aggregated data using MongoDB

---

### 🛡️ Access Control

| Role    | Permissions                          |
| ------- | ------------------------------------ |
| Viewer  | View dashboard only                  |
| Analyst | View records + dashboard             |
| Admin   | Full access (CRUD + user management) |

---

## 📁 Folder Structure

```
finance-dashboard-backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── validations/
│   └── app.js
│
├── .env
├── server.js
├── package.json
```

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt
* Joi (Validation)

---

## 🔧 Setup Instructions

### 1️⃣ Clone Repository

```
git clone 
cd finance-dashboard-backend
```

---

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` file:

```
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/finance-dashboard
JWT_SECRET=secret_key
```

---

### 4️⃣ Run Server

```
npm run dev
```

Server will run on:

```
http://localhost:8000
```

---

## 📌 API Endpoints

### 🔐 Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

---

### 👥 Users (Admin only)

* `GET /api/users`
* `GET /api/users/:id`
* `PUT /api/users/:id`
* `DELETE /api/users/:id`

---

### 💰 Records

* `POST /api/records` (Admin)
* `GET /api/records` (Analyst/Admin)
* `PUT /api/records/:id` (Admin)
* `DELETE /api/records/:id` (Admin)

---

### 📊 Dashboard

* `GET /api/dashboard`

http://localhost:8000/api/dashboard

```
{
    "totalIncome": 25000,
    "totalExpense": 4500,
    "balance": 20500,
    "categoryBreakdown": [
        {
            "_id": "food",
            "total": 4500
        },
        {
            "_id": "it",
            "total": 25000
        }
    ],
    "monthlyTrends": [
        {
            "_id": 4,
            "total": 29500
        }
    ]
}



```

"monthlyTrends": [
  { "_id": 4, "total": 29500 }
]

_id: 4 = April (month number)

---

## 🔑 Authentication

Use JWT Token in headers:

```
Authorization: <your_token>
```

---

## 🧪 Testing (Postman Flow)

1. Register user
2. Login → get token
3. Use token in headers
4. Access APIs

## GET
http://localhost:8000/api/users/

```

    [
  {
    "_id": "69cf4fa316a75eaa3bcccc32",
    "name": "Vijendra Kumar",
    "email": "vijendra@gmail.com",
    "role": "admin",
    "isActive": true,
    "createdAt": "2026-04-03T05:26:59.548Z"
  },
  {
    "_id": "69cf5648e613adab4e300d59",
    "name": "Rahul Kumar",
    "email": "rahul@gmail.com",
    "role": "viewer",
    "isActive": true,
    "createdAt": "2026-04-03T05:55:20.864Z"
  }
]
```

---

## ⚠️ Error Handling

* 400 → Bad Request
* 401 → Unauthorized
* 403 → Forbidden
* 500 → Server Error

---


