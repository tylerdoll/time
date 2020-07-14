import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export default function TaskTableEntry(props) {
  const { row, onEntryDelete } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} onClick={() => setOpen(!open)} hover={true}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.time.toFixed(1)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <h3>Entries</h3>
              <Table aria-label="task time entries">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Start</TableCell>
                    <TableCell align="right">Stop</TableCell>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.entries.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell align="right">{row.startTime}</TableCell>
                      <TableCell align="right">{row.stopTime}</TableCell>
                      <TableCell align="right">{row.time}</TableCell>
                      <TableCell align="right"><IconButton aria-label="delete" onClick={() => onEntryDelete(row.id)}><Delete/></IconButton></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
