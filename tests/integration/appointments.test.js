import supertest from 'supertest';
import app from '../../src/app.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { beforeAll, afterEach, afterAll, describe, it, expect } from '@jest/globals';

let token;
let customerId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);

    const professional = await mongoose.connection.collection('professionals').insertOne({
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'hashed',
        verified: true,
    });

    token = jwt.sign({ id: professional.insertedId.toString() }, process.env.JWT_SECRET, { expiresIn: '1d' });
});

afterEach(async () => {
    await mongoose.connection.collection('appointments').deleteMany({});
    await mongoose.connection.collection('customers').deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.collection('professionals').deleteMany({});
    await mongoose.disconnect();
});

describe('GET /appointments', () => {

    it('deve retornar 401 sem token de autenticação', async () => {
        const response = await supertest(app).get('/appointments');
        expect(response.status).toBe(401);
    });

    it('deve listar agendamentos com autenticação', async () => {
        const response = await supertest(app)
            .get('/appointments')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

});

describe('GET /appointments/:id', () => {

    it('deve retornar um agendamento pelo ID', async () => {
        const customer = await mongoose.connection.collection('customers').insertOne({
            name: 'Cliente Teste',
            phone: '11999999999',
            address: 'Rua Teste, 123',
        });

        const appointment = await mongoose.connection.collection('appointments').insertOne({
            customer: customer.insertedId,
            dateTime: new Date('2026-08-01T09:00:00'),
            serviceType: 'Corte de grama',
            status: 'scheduled',
        });

        const response = await supertest(app)
            .get(`/appointments/${appointment.insertedId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(appointment.insertedId.toString());
    });

    it('deve retornar 401 sem token de autenticação', async () => {
        const response = await supertest(app).get('/appointments/qualquer-id');
        expect(response.status).toBe(401);
    });

});

describe('POST /appointments', () => {

    it('deve retornar 401 sem token de autenticação', async () => {
        const response = await supertest(app).post('/appointments').send({});
        expect(response.status).toBe(401);
    });

    it('deve retornar 400 com body inválido', async () => {
        const response = await supertest(app)
            .post('/appointments')
            .set('Authorization', `Bearer ${token}`)
            .send({});
        expect(response.status).toBe(400);
    });

    it('deve criar um agendamento com dados válidos', async () => {
        const customer = await mongoose.connection.collection('customers').insertOne({
            name: 'Cliente Teste',
            phone: '11999999999',
            address: 'Rua Teste, 123',
        });

        const response = await supertest(app)
            .post('/appointments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                customer: customer.insertedId.toString(),
                dateTime: '2026-08-01T09:00:00',
                serviceType: 'Corte de grama',
            });

        expect(response.status).toBe(201);
        expect(response.body.serviceType).toBe('Corte de grama');
    });

});

describe('PUT /appointments/:id', () => {

    it('deve atualizar o status de um agendamento', async () => {
        const appointment = await mongoose.connection.collection('appointments').insertOne({
            customer: new mongoose.Types.ObjectId(),
            dateTime: new Date('2026-08-01T09:00:00'),
            serviceType: 'Corte de grama',
            status: 'scheduled',
        });

        const response = await supertest(app)
            .put(`/appointments/${appointment.insertedId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'completed' });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('completed');
    });

    it('deve retornar 404 para ID inexistente', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const response = await supertest(app)
            .put(`/appointments/${fakeId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'completed' });

        expect(response.status).toBe(404);
    });

});

describe('DELETE /appointments/:id', () => {

    it('deve remover um agendamento pelo ID', async () => {
        const appointment = await mongoose.connection.collection('appointments').insertOne({
            customer: new mongoose.Types.ObjectId(),
            dateTime: new Date('2026-08-01T09:00:00'),
            serviceType: 'Corte de grama',
            status: 'scheduled',
        });

        const response = await supertest(app)
            .delete(`/appointments/${appointment.insertedId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it('deve retornar 404 para ID inexistente', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const response = await supertest(app)
            .delete(`/appointments/${fakeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

});
