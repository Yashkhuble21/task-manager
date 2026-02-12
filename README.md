🗂️ Task Manager – MERN Stack

A full-stack Task Manager application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) that allows users to create, manage, update, and delete tasks securely.

🚀 Features

✅ User Authentication (JWT-based login & register)

✅ Create new tasks

✅ View all tasks

✅ Update tasks

✅ Delete tasks

✅ Protected routes

✅ Responsive UI

✅ RESTful API

🛠️ Tech Stack
Frontend

React.js

Axios

React Router

CSS / Tailwind

Backend

Node.js

Express.js

MongoDB

Mongoose

JSON Web Token (JWT)

bcrypt.js

📁 Project Structure
task-manager/
│
├── client/              # React frontend
│   ├── src/
│   └── package.json
│
├── server/              # Node/Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── server.js
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/task-manager.git
cd task-manager

2️⃣ Setup Backend
cd server
npm install


Create a .env file inside server/ folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run backend:

npm run dev

3️⃣ Setup Frontend
cd client
npm install
npm start


Frontend will run on:

http://localhost:3000


Backend runs on:

http://localhost:5000

🔐 Authentication Flow

User registers

Password is hashed using bcrypt

JWT token is generated

Token is stored (localStorage or cookies)

Protected routes verify JWT before access
