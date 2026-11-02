import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  partner: { type: String, default: '', trim: true },
  type: { type: String, default: 'Full-time', trim: true },
  startDate: { type: String, required: true, trim: true },
  endDate: { type: String, default: 'Present', trim: true },
  current: { type: Boolean, default: false },
  bullets: [{ type: String, required: true }],
  logoUrl: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Experience = mongoose.model('Experience', ExperienceSchema);
export default Experience;
