import Certification from '../models/Certification.js';

export const getAllCertifications = async (req, res, next) => {
  try {
    const certs = await Certification.find().sort({ order: 1, createdAt: 1 });
    res.json({
      success: true,
      count: certs.length,
      data: certs
    });
  } catch (error) {
    next(error);
  }
};

export const createCertification = async (req, res, next) => {
  try {
    const cert = new Certification(req.body);
    await cert.save();
    res.status(201).json({
      success: true,
      message: 'Certification created successfully',
      data: cert
    });
  } catch (error) {
    next(error);
  }
};

export const updateCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Certification updated successfully',
      data: cert
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);

    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Certification deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
