import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.status(403).send('Token inválido');
    }
});

router.post('/', (req, res) => {
    console.log(JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

export default router;
