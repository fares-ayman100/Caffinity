# ☕ Caffinity API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.19-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-9.1-brightgreen.svg)
![License](https://img.shields.io/badge/License-ISC-yellow.svg)

**A robust RESTful API for Caffinity - Coffee & Beverage E-commerce Platform**

[Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Security Features](#-security-features)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🎯 About

**Caffinity API** is a production-ready RESTful API built with Node.js and Express.js, designed to power an e-commerce platform for coffee and beverage products. The API provides comprehensive functionality for product management, user authentication, order processing with Stripe integration, and review systems.

### 🌐 Live Demo

- **API Base URL**: `https://caffinity.vercel.app/api/v1`
- **API Documentation**: `https://caffinity.vercel.app/api-docs`
- **Health Check**: `https://caffinity.vercel.app/api/v1/health`

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

### 📚 Documentation
- ✅ Swagger/OpenAPI documentation
- ✅ Interactive API testing interface
- ✅ Complete endpoint documentation

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

Then edit `.env` and fill in your configuration (see [Environment Variables](#-environment-variables) section).

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

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
DATABASE=mongodb+srv://username:password@cluster.mongodb.net/caffinity?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRED_IN=90d
JWT_EXPIRED_TOKEN=90

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Email Configuration (Resend - Alternative)
RESEND_API_KEY=your-resend-api-key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SIGNATURE=whsec_your-webhook-signature

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

### 🔐 Security Notes

- **Never commit** your `.env` file to version control
- Use strong, random strings for `JWT_SECRET`
- Keep your Stripe keys secure
- Use different credentials for development and production

---

## 💻 Usage

### Health Check

Test if the API is running:

```bash
curl http://localhost:3000/api/v1/health
```

Response:
```json
{
  "status": "success",
  "message": "API is running"
}
```

### Authentication Example

#### 1. Sign Up

```bash
curl -X POST http://localhost:3000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

#### 2. Sign In

```bash
curl -X POST http://localhost:3000/api/v1/users/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Use Token in Protected Routes

```bash
curl http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Product Operations

#### Get All Products

```bash
curl http://localhost:3000/api/v1/products
```

#### Get Products with Filters

```bash
curl "http://localhost:3000/api/v1/products?category=Hot%20Drinks&price[gte]=3&sort=-price"
```

#### Create Product (Admin Only)

```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Espresso",
    "description": "Rich and bold espresso shot",
    "price": 3.5,
    "category": "Hot Drinks"
  }'
```

---

## 📖 API Documentation

### Interactive Documentation

Once the server is running, visit:

- **Development**: `http://localhost:3000/api-docs`
- **Production**: `https://caffinity.vercel.app/api-docs`

The Swagger UI provides:
- Complete API endpoint documentation
- Request/response schemas
- Try-it-out functionality
- Authentication testing

### API Endpoints Overview

#### Authentication (`/api/v1/users`)
- `POST /signup` - Register new user
- `POST /signin` - Login user
- `GET /logout` - Logout user
- `POST /forgotPassword` - Request password reset
- `PATCH /resetPassword/:token` - Reset password

#### Products (`/api/v1/products`)
- `GET /` - Get all products (with filtering, sorting, pagination)
- `POST /` - Create product (Admin only)
- `GET /:id` - Get single product
- `PATCH /:id` - Update product (Admin only)
- `DELETE /:id` - Delete product (Admin only)

#### Reviews (`/api/v1/reviews`)
- `GET /` - Get all reviews
- `GET /:id` - Get review by ID
- `POST /products/:productId/reviews` - Create review
- `PATCH /:id` - Update review
- `DELETE /:id` - Delete review

#### Orders (`/api/v1/orders`)
- `POST /checkout-session` - Create Stripe checkout session
- `GET /my-orders` - Get user's orders
- `GET /` - Get all orders (Admin only)
- `GET /:id` - Get order by ID (Admin only)
- `PATCH /:id` - Update order (Admin only)
- `DELETE /:id` - Delete order (Admin only)

#### Users (`/api/v1/users`)
- `GET /getMe` - Get current user
- `PATCH /updateMe` - Update current user
- `DELETE /deleteMe` - Deactivate account
- `GET /` - Get all users (Admin only)
- `GET /:id` - Get user by ID (Admin only)
- `PATCH /:id` - Update user (Admin only)
- `DELETE /:id` - Delete user (Admin only)

### Base URL

- **Development**: `http://localhost:3000/api/v1`
- **Production**: `https://caffinity.vercel.app/api/v1`

---

## 📁 Project Structure

```
caffinity/
├── api/
│   └── index.js              # Vercel serverless function
├── config/
│   ├── database.js           # MongoDB connection
│   └── apiConfig.js          # API configuration
├── Controllers/
│   ├── authController.js     # Authentication logic
│   ├── errorController.js    # Error handling
│   ├── ordersController.js   # Order management
│   ├── productsController.js # Product management
│   ├── usersController.js    # User management
│   └── handelrFactory.js     # Reusable CRUD handlers
├── doc/
│   ├── swagger.js            # Swagger configuration
│   └── paths/
│       ├── authentication.js  # Auth endpoints docs
│       ├── orders.js         # Order endpoints docs
│       ├── products.js       # Product endpoints docs
│       ├── reviews.js        # Review endpoints docs
│       └── users.js          # User endpoints docs
├── Models/
│   ├── ordersModel.js        # Order schema
│   ├── productsModel.js      # Product schema
│   ├── reviewsModel.js       # Review schema
│   └── userModel.js          # User schema
├── Routes/
│   ├── ordersRoutes.js       # Order routes
│   ├── productsRoutes.js     # Product routes
│   ├── reviewsRoutes.js      # Review routes
│   └── usersRoutes.js        # User routes
├── Utils/
│   ├── apiFeatures.js        # Query filtering/sorting
│   ├── appError.js           # Custom error class
│   ├── catchAsync.js         # Async error wrapper
│   ├── email.js              # Email service
│   └── httpStatus.js          # HTTP status constants
├── views/
│   └── email/                # Email templates (Pug)
├── .env                      # Environment variables (not in git)
├── .gitignore
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
├── package.json
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

---

## 🔒 Security Features

### Implemented Security Measures

1. **Helmet.js** - Sets various HTTP headers for security
2. **Rate Limiting** - 100 requests per hour per IP
3. **Data Sanitization** - Prevents NoSQL injection attacks
4. **XSS Protection** - Input sanitization
5. **CORS** - Cross-Origin Resource Sharing configured
6. **Parameter Pollution Prevention** - Using hpp middleware
7. **Secure Cookies** - httpOnly and secure flags
8. **Password Hashing** - bcrypt with salt rounds
9. **JWT Security** - Token expiration and validation
10. **Input Validation** - Request body validation

### Best Practices

- ✅ Environment variables for sensitive data
- ✅ Error handling without exposing sensitive information
- ✅ Input validation and sanitization
- ✅ Secure password reset flow
- ✅ Role-based access control

---

## 🚢 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Add all environment variables from your `.env` file

5. **Redeploy** after adding environment variables:
   ```bash
   vercel --prod
   ```

### Deploy to Other Platforms

The API can be deployed to any Node.js hosting platform:
- **Heroku**
- **Railway**
- **Render**
- **DigitalOcean**
- **AWS**
- **Google Cloud Platform**

Make sure to:
- Set all environment variables
- Configure MongoDB connection string
- Set `NODE_ENV=production`
- Update CORS settings if needed

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**Fares Ayman**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

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
