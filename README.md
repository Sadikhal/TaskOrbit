
# TaskOrbit — Scalable Task Management Web App

TaskOrbit is a fully responsive, secure, and scalable **MERN Stack** application designed to demonstrate complete frontend–backend integration with authentication, protected routes, CRUD operations, filtering, search, and a modern dashboard UI.

This project was built as part of a **Frontend Developer Internship Assignment** with a strong focus on real-world architecture, code quality, and performance.

---

## 🚀 Live Demo

### 🌍 **Frontend**
🔗 https://taskorbit-d49w.onrender.com

### 🛠 **Backend API**
🔗 https://taskorbits.onrender.com/api

### 📦 **GitHub Repository**
🔗 https://github.com/Sadikhal/TaskOrbit

---

## 🔐 Quick Login (For Evaluators)

Use the following **sample test credentials** to instantly access the dashboard:

```

Email: sadikhalikvr@gmail.com
Password: Sadikh@123

```

No need to register manually — login and explore instantly.

---

# ⭐ Features

### 🔐 **Authentication**
- Register & Login with validation  
- JWT Authentication stored in HTTP-only cookies  
- Auto session restore  
- Protected routes (dashboard, tasks, profile)  

### 🎯 **Dashboard**
- Total tasks overview  
- Completed / Pending / In-Progress stats  
- Recent tasks section  
- Responsive and clean UI  

### 📝 **Task Management**
- Create, update, delete tasks  
- Backend-powered search  
- Filtering by status  
- Sorting (newest/oldest)  
- Pagination (URL-sync with React Router searchParams)  
- Beautiful UI with modal forms  

### 👤 **User Profile**
- Update name, phone number, age  
- Email is read-only  
- Avatar generated from user initials  

### 🧰 **Backend APIs**
- Auth (login, register, logout, get user)  
- Profile Update API  
- Full CRUD on tasks  
- Pagination, search, filter, sort  

### 🛡 **Security**
- Encrypted passwords (bcrypt)  
- JWT authentication  
- HTTP-only cookies  
- CORS protection  
- Error handling middleware  

---

# 🛠 Tech Stack

### **Frontend**
- React.js  
- Redux Toolkit  
- React Hook Form + Zod  
- TailwindCSS  
- Axios  
- React Router  
- React Hot Toast  

### **Backend**
- Node.js + Express  
- MongoDB + Mongoose  
- JWT Authentication  
- Bcrypt  
- Cookie-parser  
- CORS  
- Express middlewares  

Deployment:
- **Render (Backend + Frontend)**

---

# 📁 Folder Structure

```

TaskOrbit/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   ├── hooks/
│   │   │   ├── api/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── lib/
│   └── server.js / app.js
│
└── README.md

```

---

# 🧪 API Endpoints

## **Auth APIs**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| GET | `/auth/user` | Get logged-in user |
| PUT | `/auth/user/update` | Update profile |
| POST | `/auth/logout` | Logout user |

---

## **Task APIs**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get tasks (search/filter/sort/pagination) |
| POST | `/tasks` | Create task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

### 🔍 **Query Parameters**
```

/tasks?search=&status=&sort=&page=1&limit=2

````

---

# ⚙️ How to Run Locally

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/Sadikhal/TaskOrbit
cd TaskOrbit
````

---

## ▶️ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URL=your_uri
JWT_SECRET=your_secret
ORIGIN =http://localhost:5173
PORT = 3002
```

Run:

```
node app.js
```

---

## 💻 Frontend Setup
Create `.env` file:

```
VITE_BASE_URL = http://localhost:3002/api
```

```
cd frontend
npm install
npm run dev
```

Then open:
👉 [http://localhost:5173](http://localhost:5173)

---

# 🖼 Screenshot Previews

![Dashboard Screenshot](https://res.cloudinary.com/dftleqqgr/image/upload/v1763674732/Screenshot_282_ikl5gm.png)
![Tasks Page](https://res.cloudinary.com/dftleqqgr/image/upload/v1763674733/Screenshot_283_dak7g3.png)
![Profile Page](https://res.cloudinary.com/dftleqqgr/image/upload/v1763674734/Screenshot_285_ecsdqj.png)
![Login Page](https://res.cloudinary.com/dftleqqgr/image/upload/v1763674733/Screenshot_281_wqifue.png)
![Register Page](https://res.cloudinary.com/dftleqqgr/image/upload/v1763674733/Screenshot_280_ohy1r2.png)

---

# 📈 Scalability Notes

TaskOrbit is structured for real-world scalability:

### ⚡ Frontend Scalability

* Redux Toolkit slices for clean state management
* Modular folder structure
* Reusable components & hooks
* URL-based pagination, sort, filter → works for large datasets
* Optimized axios instance
* Clean separation of UI & state logic

### ⚡ Backend Scalability

* MVC architecture (controllers, routes, models)
* JWT authentication middleware
* MongoDB with indexed queries
* Pagination, searching, filtering & sorting controlled server-side
* Structured error handling for predictable API responses

### ⚡ Deployment Scalability

* Render auto-scaling
* Stateless JWT auth
* MongoDB Atlas handles large traffic

---

# 👨‍💻 Developer

**Sadikhal P V**
Full Stack Developer (MERN, Next.js, Node.js)
Calicut, Kerala

---

# 🎉 Conclusion

TaskOrbit demonstrates a clean, scalable, and production-ready MERN stack application with authentication, dashboard, CRUD operations, and complete API integration.

If you found this project helpful, feel free to ⭐ the repo!
