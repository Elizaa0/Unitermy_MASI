import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function ParallelDialog({ open, onClose, onSubmit }) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [separator, setSeparator] = useState(',');

  const handleSubmit = () => {
    if (!text1.trim() || !text2.trim()) {
      alert('Both values are required');
      return;
    }
    onSubmit({
      value1: text1,
      value2: text2,
      sep: separator
    });
    setText1('');
    setText2('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Parallel</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Separator</InputLabel>
          <Select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
          >
            <MenuItem value=",">Comma (,)</MenuItem>
            <MenuItem value=";">Semicolon (;)</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          label="Text 1"
          fullWidth
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Text 2"
          fullWidth
          value={text2}
          onChange={(e) => setText2(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ParallelDialog;