# 🛒 ShopZone — Full-Stack eCommerce App

A complete MERN stack eCommerce application built as part of SkillifyZone internship task.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Bootstrap 5, React Router v6 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Vercel (Frontend) + Render (Backend) |

## ✨ Features

- 🏠 **Home Page** — Hero section + Featured products + Categories
- 📦 **Product Listing** — Grid view with search & category filter + Pagination
- 🔍 **Product Details** — Full product info with quantity selector
- 🛒 **Cart** — Add/remove items, quantity control, order summary, localStorage persist
- 🔐 **Authentication** — Register/Login with JWT, protected routes
- 👨‍💼 **Admin Panel** — Full CRUD for products (add/edit/delete), dashboard stats
- 📱 **Responsive** — Works on mobile and desktop

## ⚡ Quick Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- Git

### Step 1 — Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

### Step 2 — Setup Backend
```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

### Step 3 — Seed Database (Sample Data)
```bash
cd server
node seed.js
```
This creates:
- 12 sample products
- Admin: `admin@ecommerce.com` / `admin123`
- User: `user@ecommerce.com` / `user123`

### Step 4 — Setup Frontend
```bash
cd client
npm install
```

### Step 5 — Run Both Together
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm start
```

App runs at: **http://localhost:3000**
API runs at: **http://localhost:5000**

## 📁 Folder Structure

```
ecommerce-fullstack-design/
├── client/                 # React Frontend
│   └── src/
│       ├── components/     # Navbar, Footer, ProductCard, PrivateRoute
│       ├── context/        # AuthContext, CartContext
│       ├── pages/          # Home, ProductListing, ProductDetails, Cart, Login, Register, Admin
│       └── utils/          # Axios API instance
│
├── server/                 # Express Backend
│   ├── config/             # MongoDB connection
│   ├── middleware/         # JWT auth middleware
│   ├── models/             # Product, User mongoose models
│   ├── routes/             # Auth routes, Product routes
│   ├── seed.js             # Database seeder
│   └── index.js            # Main server entry
│
└── README.md
```

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user (Protected) |

### Products
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/products | Get all products (search, filter, paginate) | Public |
| GET | /api/products/featured | Get featured products | Public |
| GET | /api/products/:id | Get single product | Public |
| POST | /api/products | Create product | Admin |
| PUT | /api/products/:id | Update product | Admin |
| DELETE | /api/products/:id | Delete product | Admin |

## 🌐 Deployment

### Backend → Render
1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect repo → Build: `cd server && npm install` → Start: `cd server && node index.js`
4. Add Environment Variables (MONGO_URI, JWT_SECRET, etc.)

### Frontend → Vercel
1. Go to vercel.com → Import project
2. Root dir: `client`
3. Add env: `REACT_APP_API_URL=https://your-render-url.onrender.com`

## 👨‍💻 Developer

**Muhammad Hassan**
- Email: ahsanhome212@gmail.com
- LinkedIn: linkedin.com/in/muhammad-hassan-125433249
- Portfolio: muhammadhassan123portfolio.netlify.app
