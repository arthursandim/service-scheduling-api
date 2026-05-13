import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  dateTime: { type: Date, required: true},
  status: { type: String, enum: ['scheduled', 'cancelled', 'completed'], default: 'scheduled' },
  serviceType: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('Appointment', appointmentSchema)