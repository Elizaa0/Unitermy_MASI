import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

function MergeDialog({ open, onClose, onSubmit, parallelData, eliminationData }) {
  const [selectedParallel, setSelectedParallel] = useState(0);
  const [selectedElimination, setSelectedElimination] = useState(0);
  const [target, setTarget] = useState('value1');

  const handleSubmit = () => {
    if (parallelData.length === 0 || eliminationData.length === 0) {
      alert('Need data to merge');
      return;
    }

    const parallel = parallelData[selectedParallel];
    const elimination = eliminationData[selectedElimination];

    const eliminationStr = `${elimination.tekst1}${elimination.sep}${elimination.tekst2}${elimination.sep}${elimination.tekst3}`;
    const sep = parallel.sep;

    const newValue1 = target === 'value1' ? eliminationStr : parallel.value1;
    const newValue2 = target === 'value2' ? eliminationStr : parallel.value2;

    onSubmit({
      value1: newValue1,
      value2: newValue2,
      sep: sep,
      merged: true,
      merged_on: target,
      merged_text: eliminationStr
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Merge Uniterms</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
          <FormLabel component="legend">Select Parallel:</FormLabel>
          <RadioGroup value={selectedParallel} onChange={(e) => setSelectedParallel(parseInt(e.target.value))}>
            {parallelData.map((p, i) => (
              <FormControlLabel 
                key={i}
                value={i}
                control={<Radio />}
                label={`${p.value1}${p.sep}${p.value2}`}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
          <FormLabel component="legend">Select Elimination:</FormLabel>
          <RadioGroup value={selectedElimination} onChange={(e) => setSelectedElimination(parseInt(e.target.value))}>
            {eliminationData.map((e, i) => (
              <FormControlLabel 
                key={i}
                value={i}
                control={<Radio />}
                label={`${e.tekst1}${e.sep}${e.tekst2}${e.sep}${e.tekst3}`}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
          <FormLabel component="legend">Merge Target:</FormLabel>
          <RadioGroup value={target} onChange={(e) => setTarget(e.target.value)} row>
            <FormControlLabel value="value1" control={<Radio />} label="Uniterm 1" />
            <FormControlLabel value="value2" control={<Radio />} label="Uniterm 2" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Merge</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MergeDialog;