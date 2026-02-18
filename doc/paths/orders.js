/**
 * @openapi
 * /orders/checkout-session:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create checkout session
 *     description: Create Stripe checkout session for order. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productId, quantity]
 *                   properties:
 *                     productId: { type: string, description: Product MongoDB ObjectId }
 *                     quantity: { type: number, minimum: 1 }
 *     responses:
 *       200:
 *         description: Checkout session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 session: { type: object, description: Stripe checkout session object }
 *       400:
 *         description: Invalid cart items or no available products
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @openapi
 * /orders/my-orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get my orders
 *     description: Get all orders for the currently logged-in user. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 results: { type: integer, example: 5 }
 *                 data: { type: array, items: { $ref: '#/components/schemas/Order' } }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @openapi
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     description: Get all orders in the system. Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: -createdAt
 *         description: Sort by field(s)
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 results: { type: integer }
 *                 data: { type: array, items: { $ref: '#/components/schemas/Order' } }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get order by ID
 *     description: Get a single order by ID. Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 data: { $ref: '#/components/schemas/Order' }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @openapi
 * /orders/{id}:
 *   patch:
 *     tags:
 *       - Orders
 *     summary: Update order by ID
 *     description: Update an order by ID. Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order MongoDB ObjectId
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus: { type: string, enum: [processing, completed, cancelled] }
 *               paymentStatus: { type: string, enum: [pending, paid, failed] }
 *     responses:
 *       200:
 *         description: Order updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 data: { type: object, properties: { data: { $ref: '#/components/schemas/Order' } } }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @openapi
 * /orders/{id}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Delete order by ID
 *     description: Delete an order by ID. Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order MongoDB ObjectId
 *     responses:
 *       204:
 *         description: Order deleted (no content)
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
module.exports = {};
