import { botChat } from '../services/botServices.js';

export const sendMessage = async (req, res, next) => {
    try {
        const { history, message } = req.body;
        const chat = await botChat(history, message)
        res.status(200).json(chat)
    } catch (error) {
        next(error);
    };
};