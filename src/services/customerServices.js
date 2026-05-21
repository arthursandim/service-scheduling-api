import Customer from '../models/Customer.js'

export const customerCreator = async (name, phone, address) => {
    const normalizePhone = (raw) => raw.replace(/\D/g, '').replace(/^0/, '');
    const normalized = normalizePhone(phone);
    
    const existing = await Customer.findOne({ phone: normalized});
    if (existing) {
        return existing;
    };
    return (await Customer.create({ name, phone: normalized, address }));
};
