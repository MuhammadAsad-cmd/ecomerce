# E-commerce Website (MERN Stack)

## Overview

This project is a fully functional e-commerce website built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It provides users with a seamless shopping experience, allowing them to browse products, add items to the cart, and make purchases securely. The website includes both user and admin dashboards for managing orders, products, and users.

## Features

### User Features:
- **User Authentication**: Secure login and signup with email and password.
- **Product Browsing**: Browse and search through available products by categories and filters.
- **Product Details**: View detailed information about each product, including images, description, price, vendor, and tags.
- **Shopping Cart**: Add products to the cart, update quantities, and remove items.
- **Order Management**: Place orders with local pickup or free shipping options. Order summary includes shipping costs.
- **User Dashboard**: Manage personal information, view order history, and track the status of current orders.

### Admin Features:
- **Admin Dashboard**: Manage the entire website, including product listings, categories, orders, and users.
- **Product Management**: Add, edit, and delete products. Each product has a name, description, price, vendor, status, and tags.
- **Category Management**: Manage product categories, including parent and child categories, and their hierarchy.
- **Order Management**: View and manage all customer orders.
- **User Management**: View registered users, manage their roles, and handle user-related actions.

### Additional Features:
- **Responsive Design**: The website is fully responsive and works seamlessly across different devices.
- **Pagination**: Products are paginated on the front-end, and users can navigate between pages.
- **Redux Toolkit**: State management for user authentication, products, cart, and orders is done using Redux Toolkit.
- **Persist State**: User authentication and cart state are persisted across sessions using Redux Persist.
- **API Integration**: The website is integrated with a backend API for all data operations, including user authentication, product fetching, and order handling.
  
## Tech Stack

### Frontend:
- **React.js**: Used for building the user interface and managing client-side routing.
- **Redux Toolkit**: Used for managing global state for products, cart, user authentication, and admin operations.
- **Tailwind CSS**: Used for styling the application and creating a responsive layout.
- **Swiper.js**: Used for creating carousels in the product and category display sections.

### Backend:
- **Node.js**: The runtime environment for building the server-side application.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database used for storing product, user, order, and category data.
- **Mongoose**: ODM library for MongoDB, used for managing the database schema and data interactions.

### Authentication:
- **JWT (JSON Web Tokens)**: Used for secure authentication of users and admin.
- **Bcrypt.js**: Used for hashing user passwords.

## Setup Instructions

### Prerequisites:
- Node.js installed on your system.
- MongoDB running locally or via MongoDB Atlas.

### Installation:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ecommerce-mern.git
   cd ecommerce-mern

2. **Install dependencies for both frontend and backend: **
 # For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install

3. **Environment variables: Create a .env file in the backend directory with the following content:**
   PORT=5000
MONGO_URI=your-mongo-uri
JWT_SECRET=your-jwt-secret

4. **Run the server: **
5. cd backend
npm run dev

5. **Run the client:**
   cd ../frontend
npm start

6. **Access the application:**
   Frontend: Open http://localhost:3000 in your browser.
Backend API: Accessible at http://localhost:5000.

