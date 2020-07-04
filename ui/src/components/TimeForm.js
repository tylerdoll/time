import React from 'react';

import { Grid } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';

import { Add } from '@material-ui/icons';

function TimeForm(props) {
  const { 
    start,
    stop,
    name,
    onStartChange,
    onStopChange,
    onNameChange,
    onAddTimeClick
  } = props;
  return (
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <TextField
              id="start"
              label="Start"
              type="time"
              fullWidth={true}
              value={start}
              onChange={onStartChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="stop"
              label="Stop"
              type="time"
              fullWidth={true}
              value={stop}
              onChange={onStopChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="name"
              label="Name"
              fullWidth={true}
              value={name}
              onChange={onNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Add/>}
              onClick={onAddTimeClick}>
              Add
            </Button>
          </Grid>
        </Grid>
  );
}

export default TimeForm;
