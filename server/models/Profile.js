import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true },
  grade: { type: String, required: true }
}, { _id: false });

const StatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, required: true }
}, { _id: false });

const SocialSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false });

const SeoSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  ogImage: { type: String, default: '' }
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  initials: { type: String, required: true, trim: true },
  headline: { type: String, required: true, trim: true },
  tagline: { type: String, default: '', trim: true },
  statusBadge: { type: String, default: '', trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, default: '', trim: true },
  showPhone: { type: Boolean, default: false },
  location: { type: String, default: '', trim: true },
  photoUrl: { type: String, default: '' },
  resumeUrl: { type: String, default: '/resume.pdf' },
  aboutParagraphs: [{ type: String }],
  highlightPhrases: [{ type: String }],
  education: [EducationSchema],
  stats: [StatSchema],
  socials: [SocialSchema],
  contactIntro: { type: String, default: '' },
  seo: SeoSchema
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
