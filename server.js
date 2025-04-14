// server.js
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

// ✅ Enable CORS
app.use(cors({
  origin: '*' // Change this to your frontend URL in production for more security
}));

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: 'ds8lqylhn',
  api_key: '793837262212788',
  api_secret: '_HvgZAI9BY_r6a_G-vfJ0lzlxDk'
});

// ✅ File upload route
app.post('/upload-id', upload.single('file'), async (req, res) => {
  console.log('Received file:', req.file);  // Add this line to see if multer catches the file

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'user_ids',
      type: 'authenticated',
      access_mode: 'authenticated'
    });

    res.json({ secure_url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// ✅ Dynamic port for Render, fallback for local dev
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
