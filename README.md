# service-scheduling-api

Backend do sistema de agendamento de serviços para profissionais autônomos.

## Tecnologias

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT + bcrypt (autenticação)
- Joi (validação)
- Nodemailer (notificações por email)
- Gemini API (bot de agendamento)
- Google Calendar API (criação de eventos)

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
| POST | `/chat` | Envia mensagem ao bot de agendamento |

#### Body `/chat`
```json
{
  "history": [],
  "message": "Olá"
}
```

O campo `history` acumula o histórico da conversa no formato do Gemini. Ao final da conversa, o bot cria o cliente e o agendamento automaticamente no banco e um evento no Google Calendar do profissional.

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
