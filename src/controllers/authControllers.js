import {userCreator, userAuthenticator} from '../services/authServices.js'

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