import React, { useEffect, useState } from 'react';

import { v4 as uuid4 } from 'uuid';

import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Grow, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from "./components/AppBar";
import TaskTable from "./components/TaskTable";
import TimeForm from "./components/TimeForm";
import DeleteEntryAlert from "./components/DeleteEntryAlert";

import WebSocketAPI from "./WebSocketApi";
import {calcHoursWorked, getTimeStr} from "./time";

const now = new Date();
const defaultSession = {
  id: "default",
  startTime: getTimeStr(now),
  stopTime: getTimeStr(now),
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

function groupEntries(entries) {
  let groupedEntries = entries.reduce((groups, entry) => {
    const idx = groups.findIndex((elem) => elem.name === entry.name);
    if (idx === -1) {
      const { name, time } = entry;
      groups.push({ name, time, entries: [entry] });
    } else {
      groups[idx].time += entry.time;
      groups[idx].entries.push(entry);
    }
    return groups;
  }, []);
  return groupedEntries;
}

function App() {
  //****************************************************************************
  // State
  //****************************************************************************
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [deleteEntryAlertOpen, setDeleteEntryAlertOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [session, setSession] = useState(defaultSession);

  const { startTime, stopTime, name, entries, totalTime, date } = session;
  const groupedEntries = groupEntries(entries);
  const saveSession = (session) => {
    console.log("Saving session", session);
    setSession(session);
    socket.lazySendMessage(session);
    console.log("Saved session", session);
  };

  //****************************************************************************
  // Web Socket
  //****************************************************************************
  const onGetSession = (savedSession) => {
    console.log("Setting session", savedSession);
    setLoaded(true);
    setLoading(false);
    const newSession = savedSession || defaultSession;
    setSession(newSession);
    console.log("Set session", newSession);
  };

  useEffect(() => {
    if (!socket) {
      setLoading(true);
      setSocket(new WebSocketAPI(onGetSession));
    }
  }, [socket]);
  
  //****************************************************************************
  // Event handlers
  //****************************************************************************
  const handleAddTimeClick = () => {
    if (!startTime || !stopTime) {
      console.log("Not adding time");
      return;
    }

    const time = calcHoursWorked(startTime, stopTime);
    saveSession({
      ...session,
      entries: [
        ...entries,
        {
          id: uuid4(),
          name,
          startTime,
          stopTime,
          time,
        },
      ],
      totalTime: totalTime + time,
    });
  }
  const handleDeleteTimeConfirm = () => {
    console.log("Deleting entry:", entryToDelete);
    setDeleteEntryAlertOpen(false);
    setEntryToDelete(null);

    const newEntries = entries.filter((entry) => entry.id !== entryToDelete);
    const newTotalTime = newEntries.reduce((total, entry) => total + entry.time, 0);
    saveSession({
      ...session,
      entries: newEntries,
      totalTime: newTotalTime,
    });
  };
  const handleStartChange = (e) => saveSession({...session, startTime: e.target.value});
  const handleStopChange = (e) => saveSession({...session, stopTime: e.target.value});
  const handleNameChange = (e) => saveSession({...session, name: e.target.value});
  const handleRefreshClick = () => saveSession(defaultSession);
  const handleDeleteEntryAlertClose = () => {
    setDeleteEntryAlertOpen(false);
    setEntryToDelete(null);
  }
  const handleOnDeleteTaskEntryClick = (entryId) => { 
    setDeleteEntryAlertOpen(true);
    setEntryToDelete(entryId);
  }

  //****************************************************************************
  // Render
  //****************************************************************************
  const classes = useStyles();
  return (
    <div>
      <AppBar date={date} onRefreshClick={handleRefreshClick} />
      <DeleteEntryAlert
        open={deleteEntryAlertOpen}
        handleClose={handleDeleteEntryAlertClose}
        handleOnConfirm={handleDeleteTimeConfirm}
      />

      <Fade in={loading} unmountOnExit={true}>
        <CircularProgress className={classes.loadingIndicator} />
      </Fade>

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
          <Grid item xs={12}>
            <Grow in={loaded} timeout={500}>
              <div>
                <h2>Tasks</h2>
                <TaskTable rows={groupedEntries} onEntryDelete={handleOnDeleteTaskEntryClick}/>
                <h3>Total Time: {totalTime.toFixed(1)}</h3>
              </div>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
