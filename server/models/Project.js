import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  description: { type: String, required: true, trim: true },
  highlights: [{ type: String }],
  tech: [{ type: String, required: true }],
  category: {
    type: String,
    enum: ['Full Stack', 'Frontend', 'AI/ML', 'Other'],
    default: 'Full Stack'
  },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  badge: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
