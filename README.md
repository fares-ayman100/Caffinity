# ☕ Caffinity API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.19-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-9.1-brightgreen.svg)
![License](https://img.shields.io/badge/License-ISC-yellow.svg)

**A robust RESTful API for Caffinity - Coffee & Beverage E-commerce Platform**

</div>

---

## 🎯 About

**Caffinity API** is a production-ready RESTful API built with Node.js and Express.js, designed to power an e-commerce platform for coffee and beverage products. The API provides comprehensive functionality for product management, user authentication, order processing with Stripe integration, and review systems.

### 🌐 Live Demo

- [📋 API DOC ](https://caffinity-api.vercel.app/api-docs/)
---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Password reset via email
- ✅ Role-based access control (User, Admin)
- ✅ Protected routes middleware
- ✅ Secure password hashing with bcrypt

### 🛍️ Product Management
- ✅ CRUD operations for products
- ✅ Advanced filtering and sorting
- ✅ Product categories (Hot Drinks, Cold Drinks, Fresh Juices, Smoothies, etc.)
- ✅ Product ratings and reviews
- ✅ Product availability management
- ✅ Image support

### 👥 User Management
- ✅ User profile management
- ✅ Update user information
- ✅ Soft delete (deactivate account)
- ✅ Admin user management

### 💳 Order Processing
- ✅ Stripe payment integration
- ✅ Checkout session creation
- ✅ Order management (Admin)
- ✅ Order history for users
- ✅ Webhook handling for payment confirmation
- ✅ Order status tracking

### ⭐ Reviews System
- ✅ Create reviews on products
- ✅ Get all reviews
- ✅ Get reviews by product
- ✅ Update and delete reviews
- ✅ Automatic rating calculation

### 🛡️ Security
- ✅ Helmet.js for HTTP security headers
- ✅ Rate limiting (100 requests/hour)
- ✅ Data sanitization against NoSQL injection
- ✅ XSS protection
- ✅ CORS enabled
- ✅ Parameter pollution prevention
- ✅ Secure cookies (httpOnly, secure in production)

---

## 🛠️ Tech Stack

### Core
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM

### Authentication & Security
- **JWT**: jsonwebtoken
- **Password Hashing**: bcryptjs
- **Security**: helmet, express-mongo-sanitize, hpp

### Payment Processing
- **Payment Gateway**: Stripe

### Email Service
- **Email**: Nodemailer, Resend

### Documentation
- **API Docs**: Swagger UI, swagger-jsdoc

### Development Tools
- **Process Manager**: Nodemon
- **Environment Variables**: dotenv
- **Logging**: Morgan

### Other Utilities
- **Validation**: validator
- **Slug Generation**: slugify
- **Template Engine**: Pug

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Optional but Recommended
- **Postman** or **Insomnia** for API testing
- **MongoDB Compass** for database management

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/caffinity.git
cd caffinity
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and fill in your configuration (see the **Environment Variables** section below).

### Step 4: Start the Server

#### Development Mode
```bash
npm start
```

#### Production Mode
```bash
npm run start:prod
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

---

## 3. Environment Variables

```env
NODE_ENV=development
PORT=3000

DATABASE=<your MongoDB connection string>
DATABASE_PASSWORD=<db password>

JWT_SECRET=<your jwt secret>
JWT_EXPIRED_IN=90d
JWT_EXPIRED_TOKEN=90

EMAIL_HOST=<smtp host>          # e.g., smtp.mailtrap.io or smtp.gmail.com
EMAIL_PORT=<smtp port>          # e.g., 2525 for Mailtrap, 587 for TLS Gmail
EMAIL_USERNAME=<email username>
EMAIL_PASSWORD=<email password>
EMAIL_FROM="Caffinity <no-reply@caffinity.com>"

STRIPE_SECRET_KEY=<stripe secret key>
STRIPE_WEBHOOK_SIGNATURE=<stripe webhook secret>

FRONTEND_URL=https://your-frontend-url.com
```

## 🧭 Project Structure (short)

```
Caffinity/
├─ Controllers/
├─ Models/
├─ Routes/
├─ Utils/
├─ doc/
├─ views/
├─ app.js
├─ server.js
└─ README.md
```

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**Fares Ayman**

- GitHub: [Fares Ayman](https://github.com/fares-ayman100)
- Email: fareshe73@gmail.com

---

## 🙏 Acknowledgments

- Express.js community
- MongoDB team
- Stripe for payment processing
- All open-source contributors

---

<div align="center">

**Made with ❤️ and ☕**

⭐ Star this repo if you find it helpful!

</div>


