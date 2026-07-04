/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registra um novo profissional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro interno
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Autentica um profissional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna token JWT
 *       500:
 *         description: Credenciais inválidas ou usuário não verificado
 */

/**
 * @openapi
 * /auth/google:
 *   get:
 *     tags: [Auth]
 *     summary: Redireciona para autenticação Google OAuth
 *     responses:
 *       302:
 *         description: Redirecionamento para o Google
 */

/**
 * @openapi
 * /auth/google/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Callback do Google OAuth após autenticação
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Código de autorização retornado pelo Google
 *     responses:
 *       200:
 *         description: Token do Google salvo com sucesso
 *       500:
 *         description: Erro ao processar callback
 */

/**
 * @openapi
 * /auth/verify/{token}:
 *   get:
 *     tags: [Auth]
 *     summary: Verifica o email do profissional com o token recebido
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de verificação enviado por email
 *     responses:
 *       200:
 *         description: Email verificado com sucesso, retorna token JWT
 *       500:
 *         description: Token inválido ou expirado
 */

/**
 * @openapi
 * /auth/resend-verification:
 *   post:
 *     tags: [Auth]
 *     summary: Reenvia o código de verificação por email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Código reenviado com sucesso
 *       500:
 *         description: Email não encontrado ou conta já verificada
 */
