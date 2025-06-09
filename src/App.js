import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import ParallelDialog from './components/ParallelDialog';
import EliminationDialog from './components/EliminationDialog';
import MergeDialog from './components/MergeDialog';
import UnitermDisplay from './components/UnitermDisplay';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function App() {
  const [parallelData, setParallelData] = useState([]);
  const [eliminationData, setEliminationData] = useState([]);
  const [openParallelDialog, setOpenParallelDialog] = useState(false);
  const [openEliminationDialog, setOpenEliminationDialog] = useState(false);
  const [openMergeDialog, setOpenMergeDialog] = useState(false);

  const saveToFirebase = async () => {
    try {
      await addDoc(collection(db, 'uniterms'), {
        parallelData,
        eliminationData,
        createdAt: new Date()
      });
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data: ', error);
      alert('Error saving data');
    }
  };

  const loadFromFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'uniterms'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      if (data.length > 0) {
        const latest = data[data.length - 1]; // Get most recent
        setParallelData(latest.parallelData || []);
        setEliminationData(latest.eliminationData || []);
        alert('Data loaded successfully!');
      } else {
        alert('No data found');
      }
    } catch (error) {
      console.error('Error loading data: ', error);
      alert('Error loading data');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Uniterm Modeling App
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button variant="contained" onClick={() => setOpenParallelDialog(true)}>
            Parallel
          </Button>
          <Button variant="contained" onClick={() => setOpenEliminationDialog(true)}>
            Elimination
          </Button>
          <Button variant="contained" onClick={() => setOpenMergeDialog(true)}>
            Merge
          </Button>
          <Button variant="outlined" onClick={() => {
            setParallelData([]);
            setEliminationData([]);
          }}>
            Clear
          </Button>
          <Button variant="contained" color="success" onClick={saveToFirebase}>
            Save
          </Button>
          <Button variant="contained" color="info" onClick={loadFromFirebase}>
            Load
          </Button>
        </Box>

        <Paper elevation={3} sx={{ p: 2, minHeight: '500px' }}>
          <UnitermDisplay 
            parallelData={parallelData} 
            eliminationData={eliminationData} 
          />
        </Paper>
      </Box>

      <ParallelDialog 
        open={openParallelDialog} 
        onClose={() => setOpenParallelDialog(false)}
        onSubmit={(data) => {
          setParallelData([...parallelData, data]);
          setOpenParallelDialog(false);
        }}
      />

      <EliminationDialog 
        open={openEliminationDialog} 
        onClose={() => setOpenEliminationDialog(false)}
        onSubmit={(data) => {
          setEliminationData([...eliminationData, data]);
          setOpenEliminationDialog(false);
        }}
      />

      <MergeDialog 
        open={openMergeDialog} 
        onClose={() => setOpenMergeDialog(false)}
        parallelData={parallelData}
        eliminationData={eliminationData}
        onSubmit={(data) => {
          setParallelData([...parallelData, data]);
          setOpenMergeDialog(false);
        }}
      />
    </Container>
  );
}

export default App;