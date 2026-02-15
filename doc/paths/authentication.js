/**
 * @openapi
 * /users/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign up
 *     description: Register a new user. Returns JWT token and user data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password, confirmPassword]
 *             properties:
 *               firstName: { type: string, example: John }
 *               lastName: { type: string, example: Doe }
 *               email: { type: string, format: email, example: john@example.com }
 *               password: { type: string, minLength: 8, example: password123 }
 *               confirmPassword: { type: string, example: password123 }
 *     responses:
 *       201:
 *         description: User created and logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 token: { type: string, description: JWT token }
 *                 data: { type: object, properties: { user: { $ref: '#/components/schemas/User' } } }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */

/**
 * @openapi
 * /users/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign in
 *     description: Authenticate with email and password. Returns JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 token: { type: string }
 *                 data: { type: object, properties: { user: { $ref: '#/components/schemas/User' } } }
 *       400:
 *         description: Missing email or password
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       401:
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */
module.exports = {};
