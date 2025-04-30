import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { registerLawyer } from '../controllers/lawyerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/register-lawyer', protect, registerLawyer); // requires auth
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;
