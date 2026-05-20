import { GoogleGenerativeAI } from '@google/generative-ai';

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const buildSystemPrompt = (availableSlots) => {
    const maxDate = availableSlots[availableSlots.length - 1]?.date || '';
    return `Você é o atendente virtual da empresa Sandim Jardinagem.

                        Horários disponíveis: ${JSON.stringify(availableSlots)}
                        Data máxima para agendamento: ${maxDate}

                        Quando o usuário entrar em contato, dê as boas-vindas, informe que é um bot e que está disponível para ajudar no agendamento de um serviço. Pergunte o nome do usuário e use-o para um atendimento mais personalizado.

                        Em seguida, pergunte qual serviço deseja agendar e apresente a lista:
                        - Corte de Grama: R$ 100,00
                        - Poda simples: R$ 50,00/m²
                        - Limpeza de terreno: R$ 100,00 por caçamba retirada

                        Pergunte também o endereço completo onde o serviço será realizado e o número de telefone do cliente para contato.

                        Após coletar o serviço, informe os horários disponíveis com base nos dados em "Horários disponíveis" acima. Os slots possíveis são 06h, 09h, 12h e 15h (segunda a sábado, das 06h às 18h — cada serviço dura 2h com 1h de intervalo). Pergunte se o usuário deseja um desses horários ou prefere outro dia.

                        Caso prefira outro dia, pergunte qual. Se a data estiver dentro dos próximos 7 dias úteis e o horário estiver na lista de disponíveis, confirme. Se o horário não estiver disponível naquele dia, informe e sugira outro horário disponível. Não aceite datas além de 7 dias úteis a partir de hoje.

                        Após a confirmação, crie o agendamento e retorne ao usuário um resumo com data, hora e serviço agendado.

                        Ao encerrar, agradeça pelo contato e deseje um ótimo dia.

                        Sempre interprete e exiba datas no formato brasileiro (DD/MM/AAAA). O campo dateTime no JSON final deve estar no formato ISO 8601 com offset do Brasil: AAAA-MM-DDTHH:mm:ss-03:00

                        Ao final da conversa, retorne obrigatoriamente uma linha em JSON no seguinte formato, sem nenhum texto adicional ao redor:
                        {"action":"create_appointment","name":"<nome>","phone":"<telefone>","address":"<endereço>","serviceType":"<serviço>","dateTime":"<ISO 8601>"}
                        `;
};

export const botChat = async (history, message, availableSlots) => {

    const model = genAi.getGenerativeModel({ model: 'gemini-2.5-flash-lite', systemInstruction: buildSystemPrompt(availableSlots) });

    const chat = model.startChat({ history: history });

    const result = await chat.sendMessage(message);
    const response = result.response.text();
    return response;
};

