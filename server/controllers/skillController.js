import Skill from '../models/Skill.js';

export const getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json({
      success: true,
      message: 'Skill category created successfully',
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill entry not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Skill category updated successfully',
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill entry not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Skill category deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
