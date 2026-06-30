import {userCreator, userAuthenticator, verifyToken, resendVerificationToken} from '../services/authServices.js'

export const authRegister = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        const newUser = await userCreator(name, email, password);
        res.status(201).json(newUser);
        
    } catch (error) {
        next(error);
    };
};

export const authLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const userLogin = await userAuthenticator(email, password);
        res.status(200).json(userLogin);
        
    } catch (error) {
        next(error);
    };
};

export const authVerify = async (req, res, next) => {
    try {
        const token = req.params.token;
        await verifyToken(token);
        res.status(200).json({ message: 'Conta verificada com sucesso!' });

    } catch (error) {
        next(error)
    }

};

export const authResendVerification = async (req, res, next) => {
    try {
        const email = req.body.email;
        await resendVerificationToken(email);
        res.status(200).json({ message: 'Código enviado!' })

    } catch (error) {
        next(error);
    }
};