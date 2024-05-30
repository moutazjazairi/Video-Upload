const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 5000;


app.use(cors());


const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post('/upload/video', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ message: 'Video uploaded successfully', file: req.file });
  } catch (error) {
    res.status(500).json({ message: 'Video upload failed', error });
  }
});


app.post('/upload/photo', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ message: 'Photo uploaded successfully', file: req.file });
  } catch (error) {
    res.status(500).json({ message: 'Photo upload failed', error });
  }
});


app.post('/upload/record', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ message: 'Record uploaded successfully', file: req.file });
  } catch (error) {
    res.status(500).json({ message: 'Record upload failed', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
