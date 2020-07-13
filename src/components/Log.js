import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    marginTop: 32,
  },
});

function Log(props) {
  const { rows, onDelete } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Start</TableCell>
            <TableCell align="right">Stop</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.startTime}</TableCell>
              <TableCell align="right">{row.stopTime}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right"><IconButton aria-label="delete" onClick={() => onDelete(row.id)}><Delete/></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Log;
