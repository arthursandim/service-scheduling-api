# service-scheduling-api

Backend do sistema de agendamento de serviços para profissionais autônomos.

## Tecnologias

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT + bcrypt (autenticação)
- Joi (validação)
- Nodemailer, Gemini API, Google Calendar API (em desenvolvimento)

## Instalação

```bash
npm install
```

Copie o `.env.example` para `.env` e preencha as variáveis:

```
PORT=<porta>
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<database>
JWT_SECRET=<string_longa_e_aleatoria>
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

### Agendamentos
| Método | Rota | Descrição |
|---|---|---|
| GET | `/appointments` | Lista todos os agendamentos |
| GET | `/appointments/:id` | Busca agendamento por ID |
| POST | `/appointments` | Cria novo agendamento |
| PUT | `/appointments/:id` | Atualiza agendamento |
| DELETE | `/appointments/:id` | Remove agendamento |

## Estrutura

```
src/
├── config/       # conexão com o banco
├── controllers/  # recebe req/res, chama services
├── middlewares/  # validação de body, error handler
├── models/       # schemas Mongoose (Customer, Appointment, Professional)
├── routes/       # definição das rotas
├── services/     # lógica de negócio e acesso ao banco
└── validators/   # schemas Joi
```
