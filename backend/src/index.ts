import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Odisha Cloud AI is operational' });
});

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Enhancement endpoint (Stub)
app.post('/api/enhance', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        console.log(`Processing image: ${req.file.filename}`);

        // Mock processing delay
        setTimeout(() => {
            res.json({
                id: 'task_' + Date.now(),
                status: 'completed',
                original_url: `/uploads/${req.file?.filename}`,
                processed_url: `/uploads/${req.file?.filename}`, // Default to original for now
                enhancement_type: 'upscale_4x',
            });
        }, 2000);

    } catch (error) {
        console.error('Enhancement Error:', error);
        res.status(500).json({ error: 'Internal server error during enhancement' });
    }
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/processed', express.static(path.join(__dirname, '../processed')));

app.listen(PORT, () => {
    console.log(`Odisha Cloud Backend running on port ${PORT}`);
});
