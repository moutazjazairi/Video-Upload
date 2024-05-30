import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
      setImageUrl(`http://localhost:5000/uploads/${response.data.file.filename}`);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Typography variant="h4" align="center">Upload Image</Typography>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button component="span" variant="contained">
            Select Image
          </Button>
        </label>
        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />}
        <Button onClick={handleSubmit} variant="contained" disabled={!selectedFile}>Upload</Button>
        {imageUrl && <Typography variant="body1">Uploaded Image URL: http://localhost:5000/uploads/{imageUrl}</Typography>}
      </Box>
    </Container>
  );
};

export default ImageUpload;
