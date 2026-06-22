# ShopZone - Full Stack eCommerce App

A fully functional eCommerce web application built using the MERN stack (MongoDB, Express, React, Node.js), based on an eCommerce Web Design Figma template. The project covers both desktop and responsive (mobile) views with full backend integration, user authentication, cart management, and an admin panel.

## Features

- 🏠 Home page with featured products
- 🛍️ Product listing page with dynamic grid layout
- 🔍 Search bar to filter products by name or category
- 📄 Product details page with full product info
- 🛒 Cart page — add, remove, and update products
- 👤 User authentication (signup/login) using JWT
- 🔐 Protected admin routes for product management
- ⚙️ Admin panel for Create/Read/Update/Delete (CRUD) operations on products
- 📱 Fully responsive design for desktop and mobile (CSS Grid / Flexbox / Tailwind)

## Tech Stack

**Frontend:**
- React.js
- React Router
- Axios
- TailwindCSS / Bootstrap (for responsive layout)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose) for product and user data

**Authentication:**
- JWT (JSON Web Token)

**Deployment:**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```
ecommerce-fullstack-design/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductListing.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Cart.jsx
│   │   └── App.js
│   └── package.json
├── server/                  # Express backend
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/           # Auth / protected routes
│   ├── server.js
│   └── package.json
├── .env                      # Environment variables (not committed)
└── README.md
```

## Database Schema (Products Collection)

| Field        | Type    | Description                  |
|--------------|---------|-------------------------------|
| id           | String  | Unique product identifier     |
| name         | String  | Product name                  |
| price        | Number  | Product price                 |
| image        | String  | Product image URL             |
| description  | String  | Product description           |
| category     | String  | Product category              |
| stock        | Number  | Available stock quantity      |

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/HassanAli212/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

### 2. Install backend dependencies
```bash
cd server
npm install
```

### 3. Install frontend dependencies
```bash
cd ../client
npm install
```

### 4. Set up environment variables
Create a `.env` file inside the `server` folder:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 5. Run the backend
```bash
cd server
npm start
```

### 6. Run the frontend
```bash
cd client
npm start
```

### 7. Open in browser
```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint              | Description                  | Protected |
|--------|------------------------|-------------------------------|-----------|
| GET    | /api/products           | Get all products             | No        |
| GET    | /api/products/:id        | Get a single product         | No        |
| POST   | /api/products            | Add a new product             | Yes (admin) |
| PUT    | /api/products/:id         | Update a product              | Yes (admin) |
| DELETE | /api/products/:id         | Delete a product              | Yes (admin) |
| POST   | /api/auth/signup          | Register a new user           | No        |
| POST   | /api/auth/login            | Login user                     | No        |

*(Update endpoint names if your actual routes differ.)*

## Project Milestones

- **Week 1:** Project setup + static responsive frontend (Home, Product Listing, Product Details, Cart)
- **Week 2:** Backend setup with MongoDB + dynamic data integration + search functionality
- **Week 3:** JWT authentication, cart persistence, admin panel, responsive testing, and deployment

## Live Demo

- Frontend: [Add your Vercel link here]
- Backend API: [Add your Render link here]

## Future Improvements

- Payment gateway integration
- Product reviews and ratings
- Wishlist feature
- Order history for users

## License

This project was built as part of an internship full-stack development task and is available for educational and personal use.