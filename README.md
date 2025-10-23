

# 🎓 Student Management System

### (React + Node.js + Express + PostgreSQL)

> A complete **Student Management System** where **Teachers** and **Students** can register, log in, and interact — all within one web portal.
> Built using **React (Frontend)**, **Node.js + Express (Backend)**, and **PostgreSQL (Database)**.

---

## 🗂️ Project Overview

### 💻 Frontend

* Built with **React.js**
* Handles **Signup**, **Login**, **OTP Verification**, and **Dashboards**
* Communicates with backend API using **fetch/axios**

### ⚙️ Backend

* **Node.js + Express** server
* Connected to **PostgreSQL** database
* Secured credentials using `.env`

### 🧩 Database

* PostgreSQL database containing 3 relational tables:

  * 🧍‍♀️ `students`
  * 👨‍🏫 `teachers`
  * 🔗 `student_teachers` (link table for relations)

---

## ⚙️ Installation Steps

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MianAli66/Student-Management-System.git
cd "Student Management System/portal"
```

---

## 🖥️ Frontend Setup (React)

```bash
npm install
npm start
```

🌐 Runs on: [http://localhost:3001](http://localhost:3001)

---

## 🧠 Backend Setup (Node.js + Express)

```bash
cd backend
npm install
nodemon backend.js
```

🔗 Runs on: [http://localhost:5000](http://localhost:5000)

---

## 🗄️ Database Setup (PostgreSQL)

### 🔸 Step 1: Create Database

```sql
CREATE DATABASE students_data;
```

### 🔸 Step 2: Create Tables

#### 🧍‍♀️ students

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  father VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);
```

#### 👨‍🏫 teachers

```sql
CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  subject VARCHAR(100),
  qualification VARCHAR(100)
);
```

#### 🔗 student_teachers

```sql
CREATE TABLE student_teachers (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  teacher_id INT REFERENCES teachers(id)
);
```

---

## 🌐 Environment Variables (.env)

📁 Inside `backend/` folder, create a file named `.env`:

```
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=students_data
PG_PASSWORD=a22L=alit
PG_PORT=5432
```

### Example Database Connection (backend.js)

```js
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();
```

---

## 🧾 Folder Structure

```
portal/
│
├── backend/
│   ├── backend.js
│   ├── .env
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   └── teacherRoutes.js
│
├── src/
│   ├── components/
│   ├── styling/
│   ├── App.js
│   └── index.js
│
├── public/
├── package.json
├── .gitignore
└── README.md
```

📝 Note:

* Create one `.env` file inside **backend/** for database connection.
* And another `.env` file in **portal/** for frontend port (3001).

---

## 🚀 Run Both Servers

In two separate terminals:

```bash
# Frontend
cd portal
npm start

# Backend
cd backend
nodemon backend.js
```

---

## 👨‍💻 Developer Info

**Mian Ali**
📍 Full Stack Developer
🔗 [GitHub Profile](https://github.com/MianAli66)

---

## 🌟 Key Highlights

✅ PostgreSQL Database Integration
✅ Node + Express REST APIs
✅ React Frontend with OTP + Authentication
✅ .env Configuration for Security
✅ Clean and Modular Folder Structure




