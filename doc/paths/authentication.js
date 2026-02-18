/**
 * @openapi
 * /users/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign up
 *     description: Register a new user. Returns JWT token.
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
 *                 token: { type: string, description: JWT token }
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

/**
 * @openapi
 * /users/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Logout
 *     description: Logout current user by clearing JWT cookie.
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 */

/**
 * @openapi
 * /users/forgotPassword:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Forgot password
 *     description: Request password reset token. Token will be sent to email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email, example: john@example.com }
 *     responses:
 *       200:
 *         description: Password reset token sent to email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 message: { type: string, example: Token sent to email }
 *       400:
 *         description: Email is required
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       404:
 *         description: No user found with that email
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       500:
 *         description: Error sending email
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */

/**
 * @openapi
 * /users/resetPassword/{token}:
 *   patch:
 *     tags:
 *       - Authentication
 *     summary: Reset password
 *     description: Reset password using token from email. User will be logged in after successful reset.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token from email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password, confirmPassword]
 *             properties:
 *               password: { type: string, minLength: 8, example: newpassword123 }
 *               confirmPassword: { type: string, example: newpassword123 }
 *     responses:
 *       200:
 *         description: Password reset successfully and user logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 token: { type: string, description: JWT token }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */
module.exports = {};
