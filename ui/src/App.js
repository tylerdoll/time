import React, { useEffect, useState } from 'react';

import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Grow, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from "./components/AppBar";
import Log from "./components/Log";
import Groups from "./components/Groups";
import TimeForm from "./components/TimeForm";

import WebSocketAPI from "./session.js";

const defaultSession = {
  id: "default",
  startTime: "",
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
  let mins = Math.floor((hrs % 1) * 60);

  hrs = Math.floor(hrs);
  hrs = hrs < 10 ? "0" + hrs.toString() : hrs;
  mins = mins < 10 ? "0" + mins.toString() : mins;
  return `${hrs}:${mins}`;
}

let ws = null;

function App() {
  const [session, setSession] = useState(defaultSession);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const saveSession = (session) => { 
    ws.sendMessage(session);
    setSession(session);
  };
  const { startTime, stopTime, name, entries, totalTime, date } = session;

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

  const onGetSession = (savedSession) => {
    console.log("Setting session", savedSession);
    setLoaded(true);
    setLoading(false);
    const newSession = savedSession || defaultSession;
    setSession(newSession);
    console.log("Set session", newSession);
  };
  useEffect(() => {
    if (!ws) {
      setLoading(true);
      ws = new WebSocketAPI(onGetSession);
    }
  }, []);
  

  const handleAddTimeClick = () => {
    if (!startTime || !stopTime || isNaN(startTime) || isNaN(stopTime)) {
      console.log("Not adding time");
      return;
    }

    const time = Math.ceil(Math.abs(stopTime - startTime) / (60 * 60 * 1000) * 10) / 10;
    saveSession({
      ...session,
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
      saveSession({
        ...session,
        entries: newEntries,
        totalTime: newTotalTime,
      });
    }
  };
  const handleStartChange = (e) => saveSession({...session, startTime: e.target.valueAsNumber});
  const handleStopChange = (e) => saveSession({...session, stopTime: e.target.valueAsNumber});
  const handleNameChange = (e) => saveSession({...session, name: e.target.value});
  const handleRefreshClick = () => saveSession(defaultSession);

  return (
    <div>
      <AppBar date={date} onRefreshClick={handleRefreshClick} />

      <Fade in={loading} unmountOnExit={true}>
       <CircularProgress className={classes.loadingIndicator} />
      </Fade>

      <Container maxWidth="md">
        <Grow in={loaded}>
          <div>
            <h2>Add Time</h2>
            <TimeForm
              start={msToTime(startTime)}
              stop={msToTime(stopTime)}
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
