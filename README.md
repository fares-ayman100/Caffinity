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

- 🌍 Website: https://ecommerce-depi.vercel.app/
- 📋 API Documentation: https://caffinity-api.vercel.app/api-docs/
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

### 📩 Email (notifications)
- ✅ Welcome Email when a new user signs up
- ✅ Password Reset Email when a user requests to reset their password
- ✅ Order Confirmation Email after a successful purchase

### 🛡️ Security
- ✅ Helmet.js for HTTP security headers
- ✅ Rate limiting (100 requests/hour)
- ✅ Data sanitization against NoSQL injection
- ✅ XSS protection
- ✅ CORS enabled
- ✅ Parameter pollution prevention
- ✅ Secure cookies (httpOnly, secure in production)

---
## 🛠 Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, Stripe API, Pug (templating)
**Dev Tools:** nodemon, Morgan
**Email Service:** Resend , nodemailer
**Documentation:** Swagger UI
**Other Utilities** validator ,slugify , Pug


---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/fares-ayman100/caffinity.git
cd caffinity
```

### 2. Install Dependencies

```bash
npm install
```

## 3. Environment Variables

```env
NODE_ENV=development
PORT=3000

DATABASE=<your MongoDB connection string>

JWT_SECRET=<your jwt secret>
JWT_EXPIRED_IN=90d
JWT_EXPIRED_TOKEN=90

EMAIL_HOST=<smtp host>          # e.g., smtp.mailtrap.io or smtp.gmail.com
EMAIL_PORT=<smtp port>          # e.g., 2525 for Mailtrap, 587 for TLS Gmail
EMAIL_USERNAME=<email username>
EMAIL_PASSWORD=<email password>
EMAIL_FROM="Caffinity <no-reply@caffinity.com>"

RESEND_API_KEY=<API KEY>

STRIPE_SECRET_KEY=<stripe secret key>
STRIPE_WEBHOOK_SIGNATURE=<stripe webhook secret>

```

### 4. Run (development)

```bash
npm start
```

### 5. Production Mode
```bash
npm run start:prod
```
---



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




