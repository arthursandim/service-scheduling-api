import { Router } from 'express';
import { botChat } from '../services/botServices.js';
import { sendWhatsAppMessage } from '../services/whatsappServices.js';
import { getAvailableSlots, appointmentCreator } from '../services/appointmentsServices.js';
import { customerCreator } from '../services/customerServices.js';

const router = Router();

const conversationHistory = new Map();


router.get('/', (req, res) => {

    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.status(403).send('Token inválido');
    }

});

router.post('/', async (req, res) => {

    res.sendStatus(200);

    try {
        const value = req.body.entry[0].changes[0].value;
        if (!value.messages) return;
        if (value.messages[0].type !== 'text') return;

        const from = value.messages[0].from;
        const message = value.messages[0].text.body;
        const history = conversationHistory.get(from) || [];
        const availableSlots = await getAvailableSlots();
        const { response, history: updatedHistory } = await botChat(history, message, availableSlots);
        conversationHistory.set(from, updatedHistory);
        console.log('RESPOSTA DO BOT:', response);
        await sendWhatsAppMessage(from, response);

        if (response.includes('"action":"create_appointment"')) {
            const jsonStart = response.indexOf('{');
            const jsonEnd = response.lastIndexOf('}');
            const jsonString = response.slice(jsonStart, jsonEnd + 1);
            const parsed = JSON.parse(jsonString);
            const customer = await customerCreator(parsed.name, parsed.phone, parsed.address);
            await appointmentCreator(customer, parsed.dateTime, parsed.serviceType);
        }
    } catch (error) {
        console.error('Erro no processamento WhatsApp:', error);
    }

});

export default router;
