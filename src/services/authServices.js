import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Professional from '../models/Professional.js';


export const userCreator = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Professional.create({ name, email, password: hashedPassword });
    const { password: _, ...userWithoutPassword} = newUser.toObject();
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

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '1d' });

    return { token, name: user.name };

}