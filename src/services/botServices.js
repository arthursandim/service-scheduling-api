import { GoogleGenerativeAI } from '@google/generative-ai';

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Monta o system prompt do atendente virtual com base nos horários disponíveis.
 * Define personalidade, serviços oferecidos, regras de agendamento e o formato
 * de saída JSON esperado ao final da conversa.
 *
 * Limitações:
 * - Aceita agendamentos apenas nos próximos 7 dias úteis
 * - Horários disponíveis: 06h, 09h, 12h e 15h (seg–sáb)
 * - Cada serviço ocupa 2h com 1h de intervalo entre atendimentos
 */
const buildSystemPrompt = (availableSlots, phoneNumber) => {
    const maxDate = availableSlots[availableSlots.length - 1]?.date || '';
    return `Você é o atendente virtual da empresa Sandim Jardinagem.

                        Horários disponíveis: ${JSON.stringify(availableSlots)}
                        Data máxima para agendamento: ${maxDate}

                        Na primeira mensagem do usuário, dê as boas-vindas, informe que é um bot e pergunte o nome. Nunca repita saudações ou perguntas já feitas no histórico da conversa.

                        Em seguida, pergunte qual serviço deseja agendar e apresente a lista:
                        - Corte de Grama: R$ 100,00
                        - Poda simples: R$ 50,00/m²
                        - Limpeza de terreno: R$ 100,00 por caçamba retirada

                        Pergunte também o endereço completo onde o serviço será realizado e o número de telefone do cliente para contato.

                        Quando for perguntar o telefone de contato, primeiro confirme: "Posso usar o número ${phoneNumber} como seu telefone de contato?" Se o cliente confirmar, use esse número. Se não, peça o número correto.

                        Após coletar o serviço, informe os horários disponíveis com base nos dados em "Horários disponíveis" acima. Os slots possíveis são 06h, 09h, 12h e 15h (segunda a sábado, das 06h às 18h — cada serviço dura 2h com 1h de intervalo). Pergunte se o usuário deseja um desses horários ou prefere outro dia.

                        Caso prefira outro dia, pergunte qual. Se a data estiver dentro dos próximos 7 dias úteis e o horário estiver na lista de disponíveis, confirme. Se o horário não estiver disponível naquele dia, informe e sugira outro horário disponível. Não aceite datas além de 7 dias úteis a partir de hoje.

                        Após a confirmação de todos os dados pelo cliente, sinalize que o atendimento foi concluído retornando exclusivamente o JSON especificado abaixo, sem nenhum texto adicional ao redor.

                        Sempre interprete e exiba datas no formato brasileiro (DD/MM/AAAA). O campo dateTime no JSON final deve estar no formato ISO 8601 com offset do Brasil: AAAA-MM-DDTHH:mm:ss-03:00

                        Ao final da conversa, retorne obrigatoriamente uma linha em JSON no seguinte formato, sem nenhum texto adicional ao redor:
                        {"action":"create_appointment","name":"<nome>","phone":"<telefone>","address":"<endereço>","serviceType":"<serviço>","dateTime":"<ISO 8601>"}
                        `;
};

/**
 * Envia uma mensagem ao modelo Gemini dentro de uma sessão de chat com histórico.
 * Loga o consumo de tokens a cada chamada para monitoramento de uso da API.
 *
 * @param {Array} history - Histórico de mensagens da conversa atual
 * @param {string} message - Mensagem enviada pelo usuário
 * @param {Array} availableSlots - Horários disponíveis para agendamento
 * @param {string} phoneNumber - Número de telefone do usuário no WhatsApp
 * @returns {{ response: string, history: Array }} Resposta do modelo e histórico atualizado
 */
export const botChat = async (history, message, availableSlots, phoneNumber) => {
    try {
        const model = genAi.getGenerativeModel({ model: process.env.GEMINI_MODEL, systemInstruction: buildSystemPrompt(availableSlots, phoneNumber) });

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(message);
        const response = result.response.text();
        const updatedHistory = await chat.getHistory();

        const usage = result.response.usageMetadata;
        console.log(`[Gemini tokens] prompt: ${usage.promptTokenCount} | resposta: ${usage.candidatesTokenCount} | total: ${usage.totalTokenCount}`);

        return { response, history: updatedHistory };
    } catch (error) {
        console.error('[botChat] Erro ao chamar Gemini API:', error.message);
        throw new Error('O assistente virtual está temporariamente indisponível. Tente novamente em instantes.');
    }
};
