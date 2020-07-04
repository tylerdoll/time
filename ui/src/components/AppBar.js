import React from 'react';

import { Typography } from '@material-ui/core';
import { AppBar as MAppBar, Toolbar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Refresh } from '@material-ui/icons';

import { getSession } from "../session.js";

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

  const onLoadSessionClick = () => {
    getSession("test").then(data => console.log(data));
  };

  return (
      <MAppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>Time for {date}</Typography>
          <Button
            color="inherit"
            onClick={onLoadSessionClick}
          >
            Load Session
          </Button>
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
