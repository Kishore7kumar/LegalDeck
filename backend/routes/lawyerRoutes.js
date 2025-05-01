import express from 'express';
import multer from 'multer';
import path from 'path';
import Lawyer from '../models/lawyerModel.js';
import { protect } from '../middleware/authMiddleware.js';
import { lawyerAuth } from '../middleware/lawyerMiddleware.js';
import { registerLawyer, getAllLawyers, getLawyerById, updateLawyer, deleteLawyer, bookSlot } from '../controllers/lawyerController.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, or PDF files allowed.'));
    }
  }
});

// Routes
router.post('/register', protect, lawyerAuth, upload.array('documents', 5), registerLawyer);
router.get('/', getAllLawyers);
router.get('/:id', getLawyerById);
router.put('/:id', protect, lawyerAuth, upload.array('documents', 5), updateLawyer);
router.delete('/:id', protect, lawyerAuth, deleteLawyer);
router.post('/:id/book-slot', protect, bookSlot);

export default router;
