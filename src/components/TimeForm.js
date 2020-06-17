import React from 'react';

import { Grid } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';

import { Add } from '@material-ui/icons';

function TimeForm(props) {
  const { onStartChange, onStopChange, onNameChange, onAddTimeClick } = props;
  return (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              id="start"
              label="Start"
              type="time"
              onChange={onStartChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="stop"
              label="Stop"
              type="time"
              onChange={onStopChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="name"
              label="Name"
              onChange={onNameChange}
            />
          </Grid>
          <Grid item xs={3}>
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
