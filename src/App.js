import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';

import { Refresh, Add } from '@material-ui/icons';

import Log from "./Log";
import Groups from "./Groups";

const useStyles = makeStyles({
  appbar: {
    marginBottom: 64,
  },
  title: {
    flexGrow: 1,
  },
});

function msToTime(ms) {
  let hrs = ms / 1000 / 60 / 60;
  let mins = Math.floor(hrs % 1 * 60);
  const m = hrs < 12 ? "AM" : "PM";

  hrs = Math.floor(hrs);
  hrs = hrs < 10 ? "0" + hrs.toString() : hrs;
  mins = mins < 10 ? "0" + mins.toString() : mins;
  return `${hrs}:${mins} ${m}`;
}

function renderRefreshButton(handleOnClick) {
  return ( 
    <Button
      color="inherit"
      startIcon={<Refresh/>}
      onClick={handleOnClick}
    >
      Reset
    </Button>
  );
};

function App() {
  const defaultState = {
    startTime: null,
    stopTime: "",
    name: "",
    entries: [],
    totalTime: 0,
    date: new Date().toDateString(),
  };
  const [state, setState] = useState(defaultState);

  const { startTime, stopTime, name, entries, totalTime, date } = state;

  const classes = useStyles();

  let groupedEntries = entries.reduce((groups, entry) => {
    const idx = groups.findIndex((elem) => elem.name === entry.name);
    if (idx === -1) {
      const {name, time} = entry;
      groups.push({name, time});
    } else {
      groups[idx].time += entry.time;
    }
    return groups;
  }, []);

  const handleAddTime = () => {
    if (!startTime || !stopTime || isNaN(startTime) || isNaN(stopTime)) {
      return;
    }

    const time = Math.ceil(Math.abs(stopTime - startTime) / (60 * 60 * 1000) * 10) / 10;
    setState({
      ...state,
      entries: [
        ...entries,
        {
          id: entries.length,
          name,
          startTime: msToTime(startTime),
          stopTime: msToTime(stopTime),
          time,
        },
      ],
      totalTime: totalTime + time,
    });
  }

  const handleDeleteTime = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const newEntries = entries.filter((entry) => entry.id !== id);
      const newTotalTime = newEntries.reduce((total, entry) => total + entry.time, 0);
      setState({
        ...state,
        entries: newEntries,
        totalTime: newTotalTime,
      });
    }
  };

  return (
    <div>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>Time for {date}</Typography>
          {renderRefreshButton(() => setState(defaultState))}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              id="start"
              label="Start"
              type="time"
              onChange={(e) => setState({...state, startTime: e.target.valueAsNumber})}
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
              onChange={(e) => setState({...state, stopTime: e.target.valueAsNumber})}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="name"
              label="Name"
              onChange={(e) => setState({...state, name: e.target.value})}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Add/>}
              onClick={handleAddTime}>
              Add
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={6}>
            <Groups rows={groupedEntries}/>
            <h2>Total Time: {totalTime.toFixed(1)}</h2>
          </Grid>
          <Grid item md={6}>
            <Log rows={entries} onDelete={handleDeleteTime}/>
          </Grid>
        </Grid>

      </Container>
    </div>
  );
}

export default App;
