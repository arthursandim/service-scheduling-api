/**
 * @openapi
 * /whatsapp:
 *   get:
 *     tags: [WhatsApp]
 *     summary: Verificação do webhook do WhatsApp (Meta)
 *     parameters:
 *       - in: query
 *         name: hub.verify_token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de verificação enviado pelo Meta
 *       - in: query
 *         name: hub.challenge
 *         required: true
 *         schema:
 *           type: string
 *         description: Desafio a ser retornado ao Meta
 *     responses:
 *       200:
 *         description: Token válido, desafio retornado
 *       403:
 *         description: Token inválido
 */

/**
 * @openapi
 * /whatsapp:
 *   post:
 *     tags: [WhatsApp]
 *     summary: Recebe mensagens do webhook do WhatsApp (Meta)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Payload enviado pelo Meta via webhook
 *     responses:
 *       200:
 *         description: Mensagem recebida e processada
 */
