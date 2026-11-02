import Message from '../models/Message.js';
import { sendContactEmail } from '../utils/sendEmail.js';

export const handleContactSubmit = async (req, res, next) => {
  try {
    const { name, email, subject, message, _honeypot } = req.body;

    // Honeypot check: Bots fill hidden inputs; real users don't
    if (_honeypot && _honeypot.trim().length > 0) {
      console.warn(`[Spam Blocked] Honeypot triggered by IP: ${req.ip}`);
      // Return 200 fake success to disarm spambots
      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully.',
        data: null
      });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '';

    // Save message to MongoDB
    const newMessage = new Message({
      name,
      email: email.toLowerCase(),
      subject,
      message,
      ip: String(clientIp),
      read: false
    });

    await newMessage.save();

    // Trigger email notification asynchronously so response is snappy
    sendContactEmail({ name, email, subject, message }).catch(err => {
      console.error('[Email Notification Error]', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
      data: {
        id: newMessage._id,
        name: newMessage.name,
        subject: newMessage.subject
      }
    });
  } catch (error) {
    next(error);
  }
};
