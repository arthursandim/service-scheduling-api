import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Professional from '../models/Professional.js';
import crypto from 'crypto';
import emailTransporter from '../config/emailTransporter.js';



export const userCreator = async (name, email, password) => {
    const existingUser = await Professional.findOne({ email });
    if (existingUser) {
        throw new Error('Este email já está em uso.')
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Professional.create({ name, email, password: hashedPassword });
    const token = crypto.randomInt(100000, 999999).toString();
    await Professional.findByIdAndUpdate(newUser._id, { verificationToken: token });
    await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirme seu cadastro',
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f9f9f9; border-radius: 8px;">
                    <h2 style="color: #333;">Confirme seu cadastro</h2>
                    <hr style="border: none; border-top: 1px solid #ddd;" />
                    <p style="color: #555; font-size: 15px;">Seu código de verificação é:</p>
                    <p style="font-size: 32px; font-weight: bold; color: #3d7a52; letter-spacing: 8px;">${token}</p>
                    <p style="color: #555; font-size: 14px;">Ou <a href="${process.env.FRONTEND_URL}/verificar?email=${email}" style="color: #3d7a52;">clique aqui</a> para ir à tela de confirmação.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;" />
                    <p style="color: #aaa; font-size: 12px;">Service Scheduling — notificação automática</p>
                </div>`
    });
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
};

export const userAuthenticator = async (email, password) => {
    const user = await Professional.findOne({ email });

    if (!user) {
        throw new Error('Email ou senha inválidos');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Email ou senha inválidos');
    }

    if (!user.verified) {
        throw new Error('Usuário não verificado');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return { token, name: user.name };

};

export const verifyToken = async (token) => {
    const user = await Professional.findOne({ verificationToken: token });
    if (!user) {
        throw new Error('Código de verificação inválido ou expirado');
    }

    await Professional.findByIdAndUpdate(user._id, { verified: true, verificationToken: null });

    const authToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return { token: authToken, name: user.name };

};

export const resendVerificationToken = async (email) => {
    const user = await Professional.findOne({ email });
    if (!user) throw new Error('Email não encontrado. Tente se cadastrar novamente.');
    if (user.verified) throw new Error('Conta já verificada');

    const token = crypto.randomInt(100000, 999999).toString();
    await Professional.findByIdAndUpdate(user._id, { verificationToken: token });
    await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirme seu cadastro',
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f9f9f9; border-radius: 8px;">
                    <h2 style="color: #333;">Confirme seu cadastro</h2>
                    <hr style="border: none; border-top: 1px solid #ddd;" />
                    <p style="color: #555; font-size: 15px;">Seu código de verificação é:</p>
                    <p style="font-size: 32px; font-weight: bold; color: #3d7a52; letter-spacing: 8px;">${token}</p>
                    <p style="color: #555; font-size: 14px;">Ou <a href="${process.env.FRONTEND_URL}/verificar?email=${email}" style="color: #3d7a52;">clique aqui</a> para ir à tela de confirmação.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;" />
                    <p style="color: #aaa; font-size: 12px;">Service Scheduling — notificação automática</p>
                </div>`
    });
};