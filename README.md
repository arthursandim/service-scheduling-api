# service-scheduling-api

Backend do sistema de agendamento de serviços para profissionais autônomos.

## Tecnologias

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT, Joi, Nodemailer, Gemini API

## Instalação

```bash
npm install
```

Copie o `.env.example` para `.env` e preencha as variáveis.

## Executando

```bash
# desenvolvimento
npm run dev

# produção
npm start
```

## Estrutura

```
src/
├── config/       # conexão com o banco
├── controllers/  # recebe req/res
├── middlewares/  # auth, error handler
├── models/       # schemas Mongoose
├── routes/       # definição das rotas
└── services/     # lógica de negócio
```
