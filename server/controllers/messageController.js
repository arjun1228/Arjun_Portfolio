import Message from '../models/Message.js';

export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    const unreadCount = await Message.countDocuments({ read: false });

    res.json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

export const updateMessageStatus = async (req, res, next) => {
  try {
    const { read } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: Boolean(read) },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Message status updated',
      data: message
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
