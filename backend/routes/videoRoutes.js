import express from 'express';
import JITSI_SERVER_URL from '../config/jitsiConfig.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/generate-meeting', protect, (req, res) => {
  try {
    const meetingId = `${req.user._id}-${Date.now()}`;
    const meetingUrl = `${JITSI_SERVER_URL}/${meetingId}`;

    res.status(200).json({ meetingUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate meeting', error: error.message });
  }
});

export default router;
