import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function EliminationDialog({ open, onClose, onSubmit }) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [separator, setSeparator] = useState(',');

  const handleSubmit = () => {
    if (!text1.trim() || !text2.trim() || !text3.trim()) {
      alert('All fields must be filled');
      return;
    }
    onSubmit({
      tekst1: text1,
      tekst2: text2,
      tekst3: text3,
      sep: separator
    });
    setText1('');
    setText2('');
    setText3('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Elimination</DialogTitle>
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
        <TextField
          margin="dense"
          label="Text 3"
          fullWidth
          value={text3}
          onChange={(e) => setText3(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EliminationDialog;