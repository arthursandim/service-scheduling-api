import supertest from 'supertest';
import app from '../../src/app.js';
import mongoose from 'mongoose';
import { afterAll, beforeAll, afterEach, describe, it, expect } from '@jest/globals';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterEach(async () => {
    await mongoose.connection.collection('professionals').deleteMany({});
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('POST /auth/register', () => {

    it('registro de usuário com sucesso', async () => {
        const response = await supertest(app).post('/auth/register').send({ name: 'teste', email: 'test@test.com', password: '12345678' });
        //console.log(response.body);
        expect(response.status).toBe(201);
    });

    it('registro com email duplicado', async () => {
        await supertest(app).post('/auth/register').send({ name: 'teste', email: 'test@test.com', password: '12345678' });
        const response = await supertest(app).post('/auth/register').send({ name: 'teste', email: 'test@test.com', password: '12345678' });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Este email já está em uso.');
    });

    it('registro sem nome', async () => {
        const response = await supertest(app).post('/auth/register').send({ email: 'test@test.com', password: '12345678' });

        expect(response.status).toBe(500);
    });

});

describe('POST /auth/login', () => {

    it('credenciais válidas', async () => {
        await supertest(app).post('/auth/register').send({ name: 'teste', email: 'test@test.com', password: '12345678' });

        await mongoose.connection.collection('professionals').updateOne(
            { email: 'test@test.com' },
            { $set: { verified: true } }
        );

        const response = await supertest(app).post('/auth/login').send({ email: 'test@test.com', password: '12345678' });

        expect(response.status).toBe(200);

    });

    it('credenciais inválidas', async () => {
        await supertest(app).post('/auth/register').send({ name: 'teste', email: 'test@test.com', password: '12345678' });

        const response = await supertest(app).post('/auth/login').send({ email: 'test@test.com', password: '' });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Email ou senha inválidos');
    });

    it('usuário não verificado', async () => {
        await supertest(app).post('/auth/register').send({ name: 'teste', email: 'test@test.com', password: '12345678' });

        const response = await supertest(app).post('/auth/login').send({ email: 'test@test.com', password: '12345678' });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Usuário não verificado');

    });

});

describe('GET /auth/verify/:token', () => {

    it('token inválido', async () => {
        const response = await supertest(app).get('/auth/verify/token-invalido');
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Código de verificação inválido ou expirado');
    });

});
