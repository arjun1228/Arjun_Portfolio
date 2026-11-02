import mongoose from 'mongoose';

const SkillItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  iconKey: { type: String, default: '', trim: true }
}, { _id: false });

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true },
  items: [SkillItemSchema],
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Skill = mongoose.model('Skill', SkillSchema);
export default Skill;
