/**
 * @openapi
 * /chat:
 *   post:
 *     tags: [Bot]
 *     summary: Envia uma mensagem para o chatbot de IA
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Mensagem do usuário para o bot
 *     responses:
 *       200:
 *         description: Resposta do bot retornada com sucesso
 *       500:
 *         description: Erro ao processar a mensagem
 */
