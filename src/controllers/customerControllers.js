import { customerCreator } from '../services/customerServices.js';

export const customerCreate = async (req, res, next) => {
    try {
        const { name, phone, address } = req.body;
        const customer = await customerCreator(name, phone, address);
        res.status(201).json(customer);
    } catch (error) {
        next(error);
    }
};
