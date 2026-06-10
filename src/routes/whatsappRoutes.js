import { Router } from 'express';
import { botChat } from '../services/botServices.js';
import { sendWhatsAppMessage } from '../services/whatsappServices.js';
import { getAvailableSlots } from '../services/appointmentsServices.js';

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

    const value = req.body.entry[0].changes[0].value;
    if (!value.messages) return;
    if (value.messages[0].type !== 'text') return;

    const from = value.messages[0].from;
    const message = value.messages[0].text.body;
    const history = conversationHistory.get(from) || [];
    const availableSlots = await getAvailableSlots();
    const { response, history: updatedHistory } = await botChat(history, message, availableSlots);
    conversationHistory.set(from, updatedHistory);
    await sendWhatsAppMessage(from, response);


});

export default router;
