import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  issuer: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ['certification', 'internship', 'achievement'],
    default: 'certification'
  },
  credentialUrl: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Certification = mongoose.model('Certification', CertificationSchema);
export default Certification;
