import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

const RecordUpload = () => {
  const [record, setRecord] = useState(null);

  const handleRecordUpload = () => {
    
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Typography variant="h4" align="center">Upload Record</Typography>
        <Button onClick={handleRecordUpload} variant="contained">
          Upload Record
        </Button>
        {record && <Typography variant="body1">Record: {record}</Typography>}
      </Box>
    </Container>
  );
};

export default RecordUpload;
