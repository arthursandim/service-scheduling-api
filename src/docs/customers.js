/**
 * @openapi
 * /customers:
 *   post:
 *     tags: [Customers]
 *     summary: Cria um novo cliente
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               phone:
 *                 type: string
 *                 example: '11999990000'
 *               address:
 *                 type: string
 *                 example: Rua das Flores, 123
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */
