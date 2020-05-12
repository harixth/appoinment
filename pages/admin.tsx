import { Button } from '@material-ui/core';
import Link from 'next/link';
import withApollo from '../lib/graphql/with-apollo';
import { useCurrentReservationQuery } from '../lib/graphql/documents/CurrentReservation.graphql';
import { useAddAvailableWeekReservationMutation } from '../lib/graphql/documents/AddAvailableWeekReservation.graphql';

const admin = () => {
  const { data } = useCurrentReservationQuery();

  const [
    addReservation,
    { data: dt }
  ] = useAddAvailableWeekReservationMutation();

  if (dt) {
    console.log(dt);
  }

  if (data) {
    console.log(data);
  }

  return (
    <div>
      <p>Create slots for upcoming weeks</p>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={() => addReservation()}
      >
        Create
      </Button>
      <br />
      <br />
      <p>Current Slots created = {data?.currentReservation?.length}</p>
      <br />
      <Link href="/">Visit Calendar</Link>{' '}
    </div>
  );
};

export default withApollo(admin);
