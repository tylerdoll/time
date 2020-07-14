import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';

import TaskTableEntry from './TaskTableEntry';

const useStyles = makeStyles({
  root: {
    marginTop: 32,
  },
});

export default function TaskTable(props) {
  const { rows, onEntryDelete } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TaskTableEntry key={row.name} row={row} onEntryDelete={onEntryDelete}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
