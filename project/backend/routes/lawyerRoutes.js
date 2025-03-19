import express from 'express';
import multer from 'multer';
import path from 'path';
import Lawyer from '../models/lawyerModel.js';
import { protect } from '../middleware/authMiddleware.js';
import { lawyerAuth } from '../middleware/lawyerMiddleware.js';

const router = express.Router();

// Multer configuration
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
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed!'));
    }
  }
});

// ✅ Register a new lawyer (Only logged-in lawyers can register)
router.post('/register', protect, lawyerAuth, upload.array('documents', 5), async (req, res) => {
  const { name, specialization, experience, fees, availableSlots } = req.body;

  if (!name || !specialization || !experience || !fees || !availableSlots) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingLawyer = await Lawyer.findOne({ name });
    if (existingLawyer) {
      return res.status(400).json({ message: 'Lawyer already registered' });
    }

    const documentPaths = req.files.map(file => file.path);

    const newLawyer = new Lawyer({
      name,
      specialization,
      experience,
      fees,
      availableSlots: JSON.parse(availableSlots),
      documents: documentPaths
    });

    const savedLawyer = await newLawyer.save();
    res.status(201).json(savedLawyer);
  } catch (error) {
    res.status(500).json({ message: 'Error registering lawyer', error: error.message });
  }
});

// ✅ Get all lawyers (Public)
router.get('/', async (req, res) => {
  const { specialization, minExperience, maxFees } = req.query;

  const filter = {};
  if (specialization) filter.specialization = specialization;
  if (minExperience) filter.experience = { $gte: parseInt(minExperience) };
  if (maxFees) filter.fees = { $lte: parseInt(maxFees) };

  try {
    const lawyers = await Lawyer.find(filter);
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lawyers', error: error.message });
  }
});

// ✅ Get details of a specific lawyer by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }
    res.status(200).json(lawyer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lawyer', error: error.message });
  }
});

// ✅ Update lawyer details (Protected for Lawyers Only)
router.put('/:id', protect, lawyerAuth, upload.array('documents', 5), async (req, res) => {
  const { name, specialization, experience, fees, availableSlots } = req.body;

  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    if (req.files) {
      const documentPaths = req.files.map(file => file.path);
      lawyer.documents.push(...documentPaths);
    }

    lawyer.name = name || lawyer.name;
    lawyer.specialization = specialization || lawyer.specialization;
    lawyer.experience = experience || lawyer.experience;
    lawyer.fees = fees || lawyer.fees;
    lawyer.availableSlots = availableSlots ? JSON.parse(availableSlots) : lawyer.availableSlots;

    const updatedLawyer = await lawyer.save();
    res.status(200).json(updatedLawyer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating lawyer', error: error.message });
  }
});

// ✅ Delete a lawyer profile (Protected for Lawyers Only)
router.delete('/:id', protect, lawyerAuth, async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    await lawyer.deleteOne();
    res.status(200).json({ message: 'Lawyer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lawyer', error: error.message });
  }
});

// ✅ Book an appointment slot (Protected for Clients Only)
router.post('/:id/book-slot', protect, async (req, res) => {
  const { slotId } = req.body;

  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    const slot = lawyer.availableSlots.id(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    slot.isBooked = true;
    await lawyer.save();

    res.status(200).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error booking slot', error: error.message });
  }
});

export default router;
