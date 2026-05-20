import { botChat } from '../services/botServices.js';
import { getAvailableSlots, appointmentCreator } from '../services/appointmentsServices.js';
import { customerCreator } from '../services/customerServices.js'

export const sendMessage = async (req, res, next) => {
    try {
        const { history, message } = req.body;
        const availableSlots = await getAvailableSlots();
        const chat = await botChat(history, message, availableSlots);
        if (chat.includes('"action":"create_appointment"')) {
            const jsonStart = chat.indexOf('{');
            const jsonEnd = chat.lastIndexOf('}');
            const jsonString = chat.slice(jsonStart, jsonEnd + 1);
            const parsed = JSON.parse(jsonString);
            const customer = await customerCreator(parsed.name, parsed.phone, parsed.address);
            await appointmentCreator(customer._id, parsed.dateTime, parsed.serviceType);
        }
        res.status(200).json(chat);
    } catch (error) {
        next(error);
    };
};