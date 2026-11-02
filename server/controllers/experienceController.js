import Experience from '../models/Experience.js';

export const getAllExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json({
      success: true,
      message: 'Experience entry created successfully',
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Experience entry updated successfully',
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Experience entry deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
