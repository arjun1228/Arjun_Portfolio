import Profile from '../models/Profile.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found. Please seed the database.',
        data: null
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = new Profile(req.body);
      await profile.save();
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    next(error);
  }
};
