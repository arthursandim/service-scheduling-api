import mongoose from 'mongoose';

const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  googleRefreshToken: { type: String },
  verified: {type: Boolean, default: false},
  verificationToken: {type: String}
}, { timestamps: true })

export default mongoose.model('Professional', professionalSchema);