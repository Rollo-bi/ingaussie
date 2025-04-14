// server.js
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const cors = require('cors');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors()); // Enable CORS

// Set up Cloudinary
cloudinary.config({
  cloud_name: 'ds8lqylhn', // Replace with your Cloudinary cloud name
  api_key: '793837262212788', // Replace with your API key
  api_secret: '_HvgZAI9BY_r6a_G-vfJ0lzlxDk' // Replace with your API secret
});

// File upload route
app.post('/upload-id', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'user_ids',
      type: 'authenticated',
      access_mode: 'authenticated'
    });

    res.json({ secure_url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
