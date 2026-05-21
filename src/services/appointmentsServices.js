import Appointment from '../models/Appointment.js';
import emailTransporter from '../config/emailTransporter.js';
import { createCalendarEvent } from '../services/calendarServices.js';

export const listAllAppointments = async () => {
    const appointments = await Appointment.find();
    return (appointments);
};

export const listAppointmentById = async (appointmentID) => {
    const appointment = await Appointment.findById(appointmentID);
    return (appointment);
};

export const appointmentCreator = async (customer, dateTime, serviceType) => {
    const newAppointment = await Appointment.create({ customer: customer._id, dateTime, serviceType });

    await createCalendarEvent(customer.name, serviceType, dateTime, customer.address)

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Novo agendamento',
        html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f9f9f9; border-radius: 8px;">
                    <h2 style="color: #333;">Novo agendamento criado</h2>
                    <hr style="border: none; border-top: 1px solid #ddd;" />
                    <p style="color: #555; font-size: 15px;">Um novo agendamento foi registrado no sistema.</p>
                    <p style="color: #555; font-size: 14px;">Acesse o painel para visualizar os detalhes.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;" />
                    <p style="color: #aaa; font-size: 12px;">Service Scheduling — notificação automática</p>
                </div>`
    };
    await emailTransporter.sendMail(mailOptions);

    return newAppointment;
};

export const appointmentUpdater = async (appointmentID, newData) => {

    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentID, newData, { new: true });
    return updatedAppointment;
}

export const appointmentRemover = async (appointmentID) => {

    const appointment = await Appointment.findByIdAndDelete(appointmentID);
    return (appointment);
}

export const getAvailableSlots = async () => {
    const slots = [6, 9, 12, 15];
    const today = new Date();

    const nextTwoDays = [];
    let current = new Date(today);
    current.setDate(current.getDate() + 1);

    while (nextTwoDays.length < 7) {

        if (current.getDay() !== 0) {
            nextTwoDays.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
    };

    const availableSlots = [];

    for (const day of nextTwoDays) {
        const startOfDay = new Date(day);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(day);
        endOfDay.setHours(23, 59, 59, 999);

        const bookedAppointments = await Appointment.find({
            dateTime: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });

        const bookedHours = bookedAppointments.map(a => a.dateTime.getHours());

        const freeSlots = slots.filter(slot => !bookedHours.includes(slot));

        availableSlots.push({ date: day.toLocaleDateString('pt-BR'), slots: freeSlots });
    };

    return availableSlots;

}
