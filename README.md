# service-scheduling-api

Backend do sistema de agendamento de serviços para profissionais autônomos.

## Tecnologias

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT + bcrypt (autenticação)
- Joi (validação)
- Nodemailer (notificações por email)
- Gemini API (bot de agendamento com arquitetura em camadas)
- Google Calendar API (criação de eventos)
- WhatsApp Business API — Meta (canal de mensagens)

## Instalação

```bash
npm install
```

Copie o `.env.example` para `.env` e preencha as variáveis:

```
PORT=<porta>
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<database>
JWT_SECRET=<string_longa_e_aleatoria>
EMAIL_USER=<email_gmail>
EMAIL_PASS=<senha_de_app_gmail>
GEMINI_API_KEY=<chave_gemini>
GOOGLE_CLIENT_ID=<client_id_google_cloud>
GOOGLE_CLIENT_SECRET=<client_secret_google_cloud>
GOOGLE_CALLBACK_URL=http://localhost:<porta>/auth/google/callback
WHATSAPP_VERIFY_TOKEN=<token_de_verificacao_do_webhook>
WHATSAPP_TOKEN=<token_permanente_meta_business>
WHATSAPP_PHONE_NUMBER_ID=<id_do_numero_whatsapp_no_meta>
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=http://localhost:5173
MONGODB_URI_TEST=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<database_test>
NODE_ENV=development
```

## Executando

```bash
# desenvolvimento
npm run dev

# produção
npm start
```

## Endpoints

### Autenticação
| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/register` | Cadastro do profissional |
| POST | `/auth/login` | Login — retorna token JWT |
| GET | `/auth/google` | Inicia fluxo OAuth com Google Calendar |
| GET | `/auth/google/callback` | Callback OAuth — salva refresh token |

### Agendamentos
> Todas as rotas exigem header `Authorization: Bearer <token>`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/appointments` | Lista todos os agendamentos |
| GET | `/appointments/:id` | Busca agendamento por ID |
| POST | `/appointments` | Cria novo agendamento |
| PUT | `/appointments/:id` | Atualiza agendamento |
| DELETE | `/appointments/:id` | Remove agendamento |

### Chat
| Método | Rota | Descrição |
|---|---|---|
| POST | `/chat` | Envia mensagem ao bot de agendamento (uso interno / Postman) |

### Clientes
> Exige header `Authorization: Bearer <token>`

| Método | Rota | Descrição |
|---|---|---|
| POST | `/customers` | Cria novo cliente |

### WhatsApp
| Método | Rota | Descrição |
|---|---|---|
| GET | `/whatsapp` | Verificação do webhook pelo Meta |
| POST | `/whatsapp` | Recebe mensagens do WhatsApp e responde via bot |

### Seed (apenas `NODE_ENV=test`)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/seed/professional` | Cria profissional de teste |
| DELETE | `/seed/reset` | Limpa todos os dados do banco de testes |

#### Body `/chat`
```json
{
  "history": [],
  "message": "Olá"
}
```

O campo `history` acumula o histórico da conversa no formato do Gemini. Ao final da conversa, o bot cria o cliente e o agendamento automaticamente no banco e um evento no Google Calendar do profissional.

## Documentação

Com o servidor rodando, acesse o Swagger em `http://localhost:3000/docs`.

Em produção: `https://service-scheduling-api.onrender.com/docs`

## Deploy

Hospedado no [Render](https://render.com).

- **Produção:** `https://service-scheduling-api.onrender.com`
- **Staging:** `https://service-scheduling-api-dev.onrender.com` (`NODE_ENV=test`)

## Estrutura

```
src/
├── config/       # banco, email, OAuth Google
├── controllers/  # recebe req/res, chama services
├── middlewares/  # autenticação JWT, validação de body, error handler
├── models/       # schemas Mongoose (Customer, Appointment, Professional)
├── routes/       # definição das rotas
├── services/     # lógica de negócio e acesso ao banco
└── validators/   # schemas Joi
```
