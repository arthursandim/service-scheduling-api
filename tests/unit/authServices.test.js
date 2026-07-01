import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.unstable_mockModule('../../src/models/Professional.js', () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn()
    }
}));

jest.unstable_mockModule('bcrypt', () => ({
    default: {
        hash: jest.fn(),
        compare: jest.fn()
    }
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
    default: {
        sign: jest.fn()
    }
}));

jest.unstable_mockModule('../../src/config/emailTransporter.js', () => ({
    default: {
        sendMail: jest.fn()
    }
}));

const { userAuthenticator, verifyToken } = await import('../../src/services/authServices.js');
const { default: Professional } = await import('../../src/models/Professional.js');
const { default: bcrypt } = await import('bcrypt');
const { default: jwt } = await import('jsonwebtoken');

describe('userAuthenticator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve lançar erro quando o email não é encontrado', async () => {
        // Arrange
        Professional.findOne.mockResolvedValue(null);
        // Act
        await expect(userAuthenticator('test@test.com', '123456')).rejects.toThrow('Email ou senha inválidos');
    });

    it('deve lançar erro quando a senha for inválida', async () => {
        //Arrange
        Professional.findOne.mockResolvedValue({ password: 'hashed_password' });
        bcrypt.compare.mockResolvedValue(false);
        //Act
        await expect(userAuthenticator('test@test.com', '123456')).rejects.toThrow('Email ou senha inválidos');

    });

    it('deve lançar erro quando o usuário ainda não estiver verificado', async () => {
        //Arrange
        Professional.findOne.mockResolvedValue({ verified: false });
        bcrypt.compare.mockResolvedValue(true);
        //Act
        await expect(userAuthenticator('test@test.com', '123456')).rejects.toThrow('Usuário não verificado');
    });

    it('deve passar com a autenticação do usuário', async () => {
        //Arrange
        Professional.findOne.mockResolvedValue({ id: 1, name: 'Teste', verified: true });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('fake-token');
        //Act
        await expect(userAuthenticator('test@test.com', '123456')).resolves.toEqual({ token: 'fake-token', name: 'Teste' })
    });

});

describe('verifyToken', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve lançar erro de token inválido', async () => {
        //Arrange
        Professional.findOne.mockResolvedValue(null);
        // Act
        await expect(verifyToken('fake-token')).rejects.toThrow('Código de verificação inválido ou expirado');
    });

    it('deve passar com token válido', async () => {
        //Arrange
        Professional.findOne.mockResolvedValue({ _id: '123', id: '123', name: 'Teste' });
        Professional.findByIdAndUpdate.mockResolvedValue();
        jwt.sign.mockReturnValue('fake-token');
        //Act
        await expect(verifyToken('fake-token')).resolves.toEqual({ token: 'fake-token', name: 'Teste' })
    });

});

