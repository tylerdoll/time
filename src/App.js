import React, { useState } from 'react';

import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';


import AppBar from "./components/AppBar";
import Log from "./components/Log";
import Groups from "./components/Groups";
import TimeForm from "./components/TimeForm";

const defaultState = {
  startTime: null,
  stopTime: "",
  name: "",
  entries: [],
  totalTime: 0,
  date: new Date().toDateString(),
};

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
  const { startTime, stopTime, name, entries, totalTime, date } = state;

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

  const handleAddTimeClick = () => {
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
  const handleStartChange = (e) => setState({...state, startTime: e.target.valueAsNumber});
  const handleStopChange = (e) => setState({...state, stopTime: e.target.valueAsNumber});
  const handleNameChange = (e) => setState({...state, name: e.target.value});
  const handleRefreshClick = () => setState(defaultState);

  return (
    <div>
      <AppBar date={date} onRefreshClick={handleRefreshClick} />

      <Container maxWidth="md">
        <TimeForm
          onStartChange={handleStartChange}
          onStopChange={handleStopChange}
          onNameChange={handleNameChange}
          onAddTimeClick={handleAddTimeClick}
        />

        <Grid container spacing={3}>
          <Grid item md={6}>
            <Groups rows={groupedEntries}/>
            <h2>Total Time: {totalTime.toFixed(1)}</h2>
          </Grid>
          <Grid item md={6}>
            <Log rows={entries} onDelete={handleDeleteTime} />
          </Grid>
        </Grid>

      </Container>
    </div>
  );
}

export default App;
