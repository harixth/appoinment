import { ApolloError } from 'apollo-server-micro';
import mongoose from 'mongoose';
import moment from 'moment';
import ReservationModel, {
  IReservation
} from '../../database/models/reservation';
import { getConnection } from '../../database';


const Query = {
  async currentReservation(
    _parent: any,
    _args: any,
    _context: any,
    _info: any
  ) {
    const dbConn = await getConnection();
    const Reservation: mongoose.Model<IReservation> = ReservationModel(dbConn);
    let list: IReservation[];
    try {
      let week = moment().week();
      list = await Reservation.find({
        $or: [{ week: week }, { week: week + 1 }, { week: week + 2 }]
      });
    } catch (error) {
      console.error('> CurrentReservation error: ', error);
      throw new ApolloError('Error retrieving current reservation');
    }
    return list;
  }
};

const Mutation = {
  async updateReservation(
    _parent: any,
    { id, phone, name }: any,
    _context: any,
    _info: any
  ): Promise<IReservation | null> {
    const dbConn = await getConnection();
    const Reservation: mongoose.Model<IReservation> = ReservationModel(dbConn);
    try {
      let week = moment().week();
      const rs = await Reservation.findOne({
        $and: [{ phone }],
        $or: [{ week: week }, { week: week + 1 }, { week: week + 2 }]
      });
      if (rs) {
        throw new Error('Reservation Found');
      }
      const reservation = await Reservation.findByIdAndUpdate(id, {
        name,
        phone,
        title: 'Reserved'
      });
      return reservation;
    } catch (error) {
      console.error('> updateReservation error: ', error);
      throw new ApolloError('Error update reservation');
    }
  },
  async addAvailableWeekReservation(
    _parent: any,
    _args: any,
    _context: any,
    _info: any
  ): Promise<IReservation[]> {
    const dbConn = await getConnection();
    const Reservation: mongoose.Model<IReservation> = ReservationModel(dbConn);
    try {
      let week = moment().week();
      let exist = true;
      let counter = 0;
      while (exist) {
        const rs = await Reservation.findOne({ week });
        if (rs) {
          week++;
          counter++;
        } else {
          exist = false;
        }
      }
      let r = [];
      for (let day = 1; day < 7; day++) {
        for (let slot = 0; slot < 18; slot++) {
          for (let j = 0; j < (day === 6 ? 4 : 2); j++) {
            r.push({
              title: 'Available',
              week,
              start: moment()
                .add(counter, 'weeks')
                .startOf('week')
                .add(day, 'days')
                .add(9, 'hours')
                .add(30 * slot, 'minutes')
                .add(1, 'minutes')
                .toDate(),
              end: moment()
                .add(counter, 'weeks')
                .startOf('week')
                .add(day, 'days')
                .add(9, 'hours')
                .add(30 * (slot + 1), 'minutes')
                .toDate(),
              date: moment()
                .add(counter, 'weeks')
                .startOf('week')
                .add(day, 'days')
            });
          }
        }
      }
      const reservations = await Reservation.create(r);
      return reservations;
    } catch (error) {
      console.error('> updateReservation error: ', error);
      throw new ApolloError('Error update reservation');
    }
  }
};

export default { Query, Mutation };
