import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { protect, lawyerAuth } from '../middleware/authMiddleware.js';
import File from '../models/fileModel.js';

const router = express.Router();

// ✅ Upload file (Protected for Lawyers Only)
router.post('/', protect, lawyerAuth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // ✅ Save file metadata to the database
        const file = new File({
            filename: req.file.originalname,
            filepath: `/uploads/${req.file.filename}`,
            uploadedBy: req.user._id,
        });

        const savedFile = await file.save();

        res.status(201).json({
            message: 'File uploaded successfully',
            file: savedFile,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});

// ✅ Get all uploaded files (Protected for Lawyers Only)
router.get('/', protect, lawyerAuth, async (req, res) => {
    try {
        const files = await File.find({ uploadedBy: req.user._id });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching files', error: error.message });
    }
});

// ✅ Get single file by ID (Protected for Lawyers Only)
router.get('/:id', protect, lawyerAuth, async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching file', error: error.message });
    }
});

// ✅ Delete file by ID (Protected for Lawyers Only)
router.delete('/:id', protect, lawyerAuth, async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        await file.deleteOne();

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting file', error: error.message });
    }
});

export default router;
