/**
 * @openapi
 * /appointments:
 *   get:
 *     tags: [Appointments]
 *     summary: Lista todos os agendamentos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos retornada com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */

/**
 * @openapi
 * /appointments/{id}:
 *   get:
 *     tags: [Appointments]
 *     summary: Busca um agendamento pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *       500:
 *         description: Agendamento não encontrado
 */

/**
 * @openapi
 * /appointments:
 *   post:
 *     tags: [Appointments]
 *     summary: Cria um novo agendamento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *                 description: ID do cliente
 *               date:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [scheduled, completed, cancelled]
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *       500:
 *         description: Erro de validação ou interno
 */

/**
 * @openapi
 * /appointments/{id}:
 *   put:
 *     tags: [Appointments]
 *     summary: Atualiza um agendamento pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [scheduled, completed, cancelled]
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *       500:
 *         description: Agendamento não encontrado
 */

/**
 * @openapi
 * /appointments/{id}:
 *   delete:
 *     tags: [Appointments]
 *     summary: Remove um agendamento pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento removido com sucesso
 *       500:
 *         description: Agendamento não encontrado
 */
