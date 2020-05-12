import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import { useUpdateReservationMutation } from '../lib/graphql/documents/UpdateReservation.graphql';

type FormProps = {
  id: string;
  setOpenFail: Function;
  setOpenSuccess: Function;
  setDrawervisible: Function;
};

const Form: React.FC<FormProps> = ({
  id,
  setDrawervisible,
  setOpenSuccess,
  setOpenFail
}) => {
  const [updateReservation, { data, error }] = useUpdateReservationMutation();
  const handleSearch = (values: any) => {
    const { name, phone } = values;
    console.log(`${name} ${phone} ${id}`);
    return updateReservation({
      variables: {
        id,
        phone,
        name
      }
    });
  };

  if (data) {
    setDrawervisible(false);
    setOpenSuccess(true);
  }

  if (error) {
    setDrawervisible(false);
    setOpenFail(true)
  }

  return (
    <>
      <Formik
        initialValues={{ name: '', phone: '+60' }}
        onSubmit={handleSearch}
      >
        {({ handleChange, handleBlur, values, handleSubmit }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Make Reservation
            </Typography>
            <TextField
              name="name"
              label="Name"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              required
              fullWidth
            />
            <TextField
              name="phone"
              label="Phone Number"
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              required
              fullWidth
            />
            <Button className="serch-button" type="submit">
              <span style={{ color: 'white' }}>BOOK NOW</span>
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
