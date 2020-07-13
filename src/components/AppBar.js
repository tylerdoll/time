import React from 'react';

import { Typography } from '@material-ui/core';
import { AppBar as MAppBar, Toolbar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Refresh } from '@material-ui/icons';

const useStyles = makeStyles({
  appbar: {
    marginBottom: 64,
  },
  title: {
    flexGrow: 1,
  },
});

function AppBar(props) {
  const classes = useStyles();
  const { onRefreshClick, date } = props;

  return (
      <MAppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>Time for {date}</Typography>
          <Button
            color="inherit"
            startIcon={<Refresh/>}
            onClick={onRefreshClick}
          >
            Reset
          </Button>
        </Toolbar>
      </MAppBar>
  );
}

export default AppBar;
