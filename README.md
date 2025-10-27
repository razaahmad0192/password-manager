# 🔐 Password Manager (PassOp)

A secure full-stack password manager built using **Node.js**, **Express**, and **React (Vite)**.  
It allows users to safely store, view, and manage their passwords in one place with a clean interface and strong encryption.

---

## 🚀 Features
- User Signup & Login (JWT authentication)
- React frontend with responsive design
- Node.js + Express backend API
- Secure environment variables using `.env`
- RESTful API integration between frontend and backend
- Password encryption and local storage options

---

## 📁 Project Structure

```
password-manager/
│
├── backend/           # Express server (API)
├── public/            # Static frontend assets
├── src/               # React frontend source code
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/razaahmad0192/password-manager.git
cd password-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d       
DB_NAME= "Your Database Name"
```

Then run the backend server:
```bash
npm start
```
The backend will start on: `http://localhost:5000`

---

### 3. Frontend Setup
Open a new terminal:
```bash
cd ../
npm install
npm run dev
```

Frontend will start on: `http://localhost:5173`

---

## 🧩 Environment Variables
Make sure your `.env` file (in backend) includes:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d       
DB_NAME= "Your Database Name"
```

> ⚠️ **Do not commit `.env` to GitHub** (it’s already in `.gitignore`).

---

## 🧠 Tech Stack
**Frontend:** React, Vite, TailwindCSS  
**Backend:** Node.js, Express  
**Database:** MongoDB  
**Auth:** JSON web tokens  
**Hashing:** Bcrypt  

---



## 🧱 Future Improvements
- 🔑 2FA (Two-Factor Authentication)
- 🧩 Browser extension integration
- 🧠 Password generator feature

---

## 🧑‍💻 Author
**Ahmed Raza**  


---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
