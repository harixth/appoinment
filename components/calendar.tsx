import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useCurrentReservationQuery } from '../lib/graphql/documents/CurrentReservation.graphql';

const localizer = momentLocalizer(moment);

type CalendarProps = {
  openSuccess: boolean;
  showDrawer: Function;
};

type Event = {
  _id: string | null | undefined;
  title: string;
  start: Date;
  end: Date;
};

const MyCalendar: React.FC<CalendarProps> = props => {
  const { showDrawer, openSuccess } = props;
  const [events, setEvents] = React.useState<Event[]>([]);
  const [error, setError] = React.useState<boolean>(false);
  const { data, refetch } = useCurrentReservationQuery();

  if (openSuccess) {
    refetch();
  }

  React.useEffect(() => {
    if (data) {
      const { currentReservation } = data;
      const mapped = currentReservation
        ? currentReservation.map(item => {
            return {
              _id: item._id,
              title: item.title,
              start: new Date(item.start),
              end: new Date(item.end)
            };
          })
        : [];
      setEvents(mapped);
    }
  }, [data]);
  return (
    <div>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity="error">
          Selected has been Reserved
        </Alert>
      </Snackbar>
      <Calendar
        className="rbc-calendar"
        localizer={localizer}
        events={events}
        showMultiDayTimes
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={event => ({
          style: {
            backgroundColor: event.title === 'Available' ? '#90EE90' : '#FF6347'
          }
        })}
        onSelectEvent={event =>
          event.title === 'Available' ? showDrawer(event._id) : setError(true)
        }
      />
      {error && (
        <Alert onClose={() => setError(false)} severity="error">
          This is an error alert — check it out!
        </Alert>
      )}
    </div>
  );
};

export default MyCalendar;
