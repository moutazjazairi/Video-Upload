import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Button } from '@mui/material';
import VideoUpload from './components/VideoUpload';
import ImageUpload from './components/ImageUpload';
import RecordUpload from './components/RecordUpload';

const theme = createTheme();

const App = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const navigateToUpload = (page) => {
    setCurrentPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => navigateToUpload('video')}
          >
            Upload Video
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => navigateToUpload('image')}
          >
            Upload Image
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigateToUpload('record')}
          >
            Record Upload
          </Button>
        </Toolbar>
      </AppBar>
      {currentPage === 'video' && <VideoUpload />}
      {currentPage === 'image' && <ImageUpload />}
      {currentPage === 'record' && <RecordUpload />}
    </ThemeProvider>
  );
};

export default App;
