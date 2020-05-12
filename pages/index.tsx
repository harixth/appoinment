import React, { useState } from 'react';
import { Paper, Drawer, Typography, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Calendar from '../components/calendar';
import Form from '../components/form';
import withApollo from '../lib/graphql/with-apollo';

const Index = () => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [drawervisible, setDrawervisible] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
  const [openFail, setOpenFail] = React.useState<boolean>(false);

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleFailClose = () => {
    setOpenFail(false);
  };

  const showDrawer = (id: string) => {
    setDrawervisible(true);
    setSelectedId(id);
  };

  const onClose = () => {
    setDrawervisible(false);
  };

  return (
    <div>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success">
          Booking succeded!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openFail}
        autoHideDuration={3000}
        onClose={handleFailClose}
      >
        <Alert onClose={handleFailClose} severity="error">
          Booking Fail! Probably you have already booked
        </Alert>
      </Snackbar>
      <Paper
        style={{ backgroundColor: `rgba(33,150,243,1)` }}
        className="container"
        role="button"
        tabIndex={0}
      >
        <Typography style={{ color: 'white' }} variant="body2" gutterBottom>
          Click on the Available Event to book {'  '}
          <img src="./inspect.png" alt="book-btn" width="32" height="32" />
        </Typography>
      </Paper>
      <Calendar openSuccess={openSuccess} showDrawer={showDrawer} />
      <Drawer anchor="left" onClose={onClose} open={drawervisible}>
        <Form
          id={selectedId}
          setDrawervisible={setDrawervisible}
          setOpenSuccess={setOpenSuccess}
          setOpenFail={setOpenFail}
        />
      </Drawer>
    </div>
  );
};

export default withApollo(Index);
