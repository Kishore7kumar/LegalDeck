import multer from 'multer';
import path from 'path';

// ✅ Set storage destination and filename format
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// ✅ File type validation
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, .png, .pdf files are allowed!'));
    }
};

// ✅ Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

export default upload;
