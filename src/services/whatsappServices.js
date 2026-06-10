const token = process.env.WHATSAPP_TOKEN;
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

export async function sendWhatsAppMessage(to, message) {

    const url = `https://graph.facebook.com/v25.0/${phoneNumberId}/messages`;

    const body = {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message }
    };

    await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    
};


