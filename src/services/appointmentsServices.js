import Appointment from '../models/Appointment.js';
import emailTransporter from '../config/emailTransporter.js'

export const listAllAppointments = async () => {
    const appointments = await Appointment.find();
    return (appointments);
};

export const listAppointmentById = async (appointmentID) => {
    const appointment = await Appointment.findById(appointmentID);
    return (appointment);
};

export const appointmentCreator = async (customer, dateTime, serviceType) => {
    const newAppointment = await Appointment.create({ customer, dateTime, serviceType });

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
