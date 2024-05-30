import React, { useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography, LinearProgress, Container, TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      console.log('File uploaded successfully:', response.data);
      setVideoUrl(`http://localhost:5000/uploads/${response.data.file.filename}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledBox
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" align="center">Upload Video</Typography>
        <input
          type="file"
          onChange={handleFileChange}
          accept="video/*"
          style={{ display: 'none' }}
          id="video-upload"
        />
        <label htmlFor="video-upload">
          <StyledButton component="span" variant="contained" disabled={uploading}>
            Select Video
          </StyledButton>
        </label>
        {selectedFile && <Typography variant="body1">Selected File: {selectedFile.name}</Typography>}
        {uploading && <LinearProgress variant="determinate" value={uploadProgress} sx={{ width: '100%' }} />}
        <StyledButton type="submit" variant="contained" disabled={!selectedFile || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </StyledButton>
        {videoUrl && (
          <Box sx={{ mt: 2, width: '100%' }}>
            <Typography variant="h6">Uploaded Video:</Typography>
            <video src={videoUrl} controls width="100%" />
          </Box>
        )}
      </StyledBox>
    </Container>
  );
};

export default VideoUpload;
