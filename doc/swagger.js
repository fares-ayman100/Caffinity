const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Caffinity API',
      version: '1.0.0',
      description:
        'API documentation for Caffinity - Coffee & Beverage products and reviews',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development',
      },
      {
        url: 'https://caffinity.vercel.app/api/v1',
        description: 'Production',
      },
    ],
    tags: [
      { name: 'Authentication', description: 'Sign up and sign in' },
      { name: 'Products', description: 'Product catalog operations' },
      {
        name: 'Users',
        description: 'User management (profile, admin CRUD)',
      },
      {
        name: 'Reviews',
        description:
          'Get all reviews, get all reviews on product (by product ID), get review by ID, create review on product, delete review by ID',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'JWT token from signin/signup. Use "Bearer &lt;token&gt;" in Authorization header.',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            currency: { type: 'string', default: 'USD' },
            ratingsAverage: { type: 'number' },
            ratingsQuantity: { type: 'integer' },
            category: {
              type: 'string',
              enum: [
                'Hot Drinks',
                'Cold Drinks',
                'Fresh Juices',
                'Smoothies',
                'Milkshakes',
                'Specialty Drinks',
                'Energy Drinks',
              ],
            },
            image: { type: 'string' },
            isAvailable: { type: 'boolean' },
            slug: { type: 'string' },
            reviews: {
              type: 'array',
              description: 'Populated when fetching single product',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['user', 'admin'] },
          },
        },
        Review: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            review: { type: 'string' },
            rating: { type: 'number', minimum: 1, maximum: 5 },
            product: { type: 'string', description: 'Product ID' },
            user: {
              type: 'object',
              description: 'Populated user (firstName, lastName)',
            },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'fail' },
            message: { type: 'string', example: 'Error message' },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'fail' },
            message: {
              type: 'string',
              example: 'Invalid input data.',
            },
          },
        },
      },
      responses: {
        Unauthorized: {
          description: 'Not logged in or invalid token',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: {
                status: 'fail',
                message:
                  'your are not logged in! Please login to get access',
              },
            },
          },
        },
        Forbidden: {
          description: 'Insufficient permissions',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: {
                status: 'fail',
                message:
                  'You do not have permission to do this action.',
              },
            },
          },
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: {
                status: 'fail',
                message: 'No document found with that ID.',
              },
            },
          },
        },
        BadRequest: {
          description: 'Bad request / validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, 'paths', 'authentication.js'),
    path.join(__dirname, 'paths', 'products.js'),
    path.join(__dirname, 'paths', 'users.js'),
    path.join(__dirname, 'paths', 'reviews.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
