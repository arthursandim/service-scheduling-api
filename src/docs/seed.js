/**
 * @openapi
 * /seed/professional:
 *   post:
 *     tags: [Seed]
 *     summary: Cria um profissional de teste (apenas NODE_ENV=test)
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Seed User
 *               email:
 *                 type: string
 *                 example: seed@test.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Profissional criado ou já existente
 *       404:
 *         description: Endpoint indisponível fora do ambiente de teste
 */

/**
 * @openapi
 * /seed/reset:
 *   delete:
 *     tags: [Seed]
 *     summary: Limpa todos os dados do banco de testes (apenas NODE_ENV=test)
 *     responses:
 *       200:
 *         description: Banco de testes limpo com sucesso
 *       404:
 *         description: Endpoint indisponível fora do ambiente de teste
 */
