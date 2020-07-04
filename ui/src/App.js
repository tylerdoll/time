import React, { useEffect, useState } from 'react';

import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Grow, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from "./components/AppBar";
import Log from "./components/Log";
import Groups from "./components/Groups";
import TimeForm from "./components/TimeForm";

import { saveSession, getSession } from "./session.js";

const defaultState = {
  id: "test",
  startTime: null,
  stopTime: "",
  name: "",
  entries: [],
  totalTime: 0,
  date: new Date().toDateString(),
};

const useStyles = makeStyles({
  loadingIndicator: {
    position: "absolute",
    left: "50%",
    top: "50%",
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

function App() {
  const [state, setState] = useState(defaultState);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const saveState = (state) => { 
    saveSession(state);
    setState(state);
  };
  const { startTime, stopTime, name, entries, totalTime, date } = state;

  const classes = useStyles();

  let groupedEntries = entries.reduce((groups, entry) => {
    const idx = groups.findIndex((elem) => elem.name === entry.name);
    if (idx === -1) {
      const { name, time } = entry;
      groups.push({ name, time });
    } else {
      groups[idx].time += entry.time;
    }
    return groups;
  }, []);

  const loadSession = (id="test") => {
    setIsLoading(true);
    getSession(id).then(savedState => {
      console.log("Got saved state", savedState);
      setLoaded(true);
      setIsLoading(false);
      setState(savedState || defaultState);
    });
  };
  useEffect(() => {
    if (!loaded && !isLoading) loadSession();
    const interval = setInterval(() => {
      console.log("Refreshing session");
      loadSession()
    }, 1 * 60 * 1000);
    return () => clearInterval(interval);
  });

  const handleAddTimeClick = () => {
    if (!startTime || !stopTime || isNaN(startTime) || isNaN(stopTime)) {
      return;
    }

    const time = Math.ceil(Math.abs(stopTime - startTime) / (60 * 60 * 1000) * 10) / 10;
    saveState({
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
      saveState({
        ...state,
        entries: newEntries,
        totalTime: newTotalTime,
      });
    }
  };
  const handleStartChange = (e) => saveState({...state, startTime: e.target.valueAsNumber});
  const handleStopChange = (e) => saveState({...state, stopTime: e.target.valueAsNumber});
  const handleNameChange = (e) => saveState({...state, name: e.target.value});
  const handleRefreshClick = () => saveState(defaultState);

  return (
    <div>
      <AppBar date={date} onRefreshClick={handleRefreshClick} />

      <Container maxWidth="md">
        <Grow in={loaded}>
          <div>
            <h2>Add Time</h2>
            <TimeForm
              start={startTime}
              stop={stopTime}
              name={name}
              onStartChange={handleStartChange}
              onStopChange={handleStopChange}
              onNameChange={handleNameChange}
              onAddTimeClick={handleAddTimeClick}
            />
          </div>
        </Grow>

        <Grid container maxWdith="md" spacing={3}>
          <Grid item xs={12} md={6}>
            <Grow in={loaded} timeout={500}>
              <div>
                <h2>Tasks</h2>
                <Groups rows={groupedEntries}/>
                <h3>Total Time: {totalTime.toFixed(1)}</h3>
              </div>
            </Grow>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grow in={loaded} timeout={1000}>
              <div>
                <h2>Entries</h2>
                <Log rows={entries} onDelete={handleDeleteTime} />
              </div>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
