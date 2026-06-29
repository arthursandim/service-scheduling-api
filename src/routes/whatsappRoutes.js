import { Router } from 'express';
import { botChat } from '../services/botServices.js';
import { sendWhatsAppMessage } from '../services/whatsappServices.js';
import { getAvailableSlots, appointmentCreator } from '../services/appointmentsServices.js';
import { customerCreator } from '../services/customerServices.js';
import { classifyIntent, checkGuardrails } from '../services/layeredBotServices.js';


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

    let from;

    try {
        const value = req.body.entry[0].changes[0].value;
        if (!value.messages) return;
        if (value.messages[0].type !== 'text') return;

        from = value.messages[0].from;
        const message = value.messages[0].text.body;
        const intent = await classifyIntent(message);
        if (intent !== 'agendar') {
            await sendWhatsAppMessage(from, 'Olá! Sou o assistente virtual da Sandim Jardinagem e posso ajudar apenas com agendamentos de serviços. Para cancelamentos ou outras solicitações, entre em contato diretamente conosco.');
            return;
        };
        const safe = await checkGuardrails(message);
        if (!safe) {
            await sendWhatsAppMessage(from, 'Não consigo continuar com essa conversa. Se precisar agendar um serviço, estou à disposição.');
            return;
        };
        const history = conversationHistory.get(from) || [];
        const availableSlots = await getAvailableSlots();
        const { response, history: updatedHistory } = await botChat(history, message, availableSlots, from);
        conversationHistory.set(from, updatedHistory);
        console.log('RESPOSTA DO BOT:', response);

        if (response.includes('"action":"create_appointment"')) {
            const jsonStart = response.indexOf('{');
            const jsonEnd = response.lastIndexOf('}');
            const jsonString = response.slice(jsonStart, jsonEnd + 1);
            const parsed = JSON.parse(jsonString);
            const customer = await customerCreator(parsed.name, parsed.phone, parsed.address);
            await appointmentCreator(customer, parsed.dateTime, parsed.serviceType);
            await sendWhatsAppMessage(from, `Agendamento confirmado! ✅\n\nServiço: ${parsed.serviceType}\nData: ${new Date(parsed.dateTime).toLocaleString('pt-BR')}\n\nObrigado pelo contato, ${parsed.name}! Até breve.`);
        } else {
            await sendWhatsAppMessage(from, response);
        }
    } catch (error) {
        console.error('Erro no processamento WhatsApp:', error);
        await sendWhatsAppMessage(from, 'Desculpe, estou com uma instabilidade no momento. Por favor, tente novamente em alguns instantes.');

    }

});

export default router;
