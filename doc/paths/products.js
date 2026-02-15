/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     description: Returns a list of products with optional filtering, sorting.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Hot Drinks, Cold Drinks, Fresh Juices, Smoothies, Milkshakes, Specialty Drinks, Energy Drinks]
 *         description: Filter by category
 *       - in: query
 *         name: price[gte]
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: price[lte]
 *         schema:
 *           type: number
 *         description: Maximum price
 *       - in: query
 *         name: ratingsAverage[gte]
 *         schema:
 *           type: number
 *         description: Minimum average rating (1-5)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: -createdAt,price,-ratingsAverage
 *         description: Sort by field(s), prefix with - for descending
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 results: { type: integer, example: 10 }
 *                 data: { type: array, items: { $ref: '#/components/schemas/Product' } }
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */

/**
 * @openapi
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a product
 *     description: Create a new product. Admin only.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price, category]
 *             properties:
 *               name: { type: string, example: Espresso }
 *               description: { type: string, minLength: 10, example: Rich and bold espresso shot }
 *               price: { type: number, example: 3.5 }
 *               currency: { type: string, default: USD }
 *               category: { type: string, enum: [Hot Drinks, Cold Drinks, Fresh Juices, Smoothies, Milkshakes, Specialty Drinks, Energy Drinks] }
 *               image: { type: string, default: default.jpg }
 *               isAvailable: { type: boolean, default: true }
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 data: { $ref: '#/components/schemas/Product' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by ID
 *     description: Returns a single product by ID with populated reviews.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Product with reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 data: { $ref: '#/components/schemas/Product' }
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @openapi
 * /products/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Update a product
 *     description: Update a product by ID. Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               currency: { type: string }
 *               category: { type: string, enum: [Hot Drinks, Cold Drinks, Fresh Juices, Smoothies, Milkshakes, Specialty Drinks, Energy Drinks] }
 *               image: { type: string }
 *               isAvailable: { type: boolean }
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 data: { type: object, properties: { data: { $ref: '#/components/schemas/Product' } } }
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
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product
 *     description: Delete a product by ID. Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted (no content)
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
module.exports = {};
