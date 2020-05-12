import mongoose from 'mongoose';

export interface IReservation extends mongoose.Document {
  name?: string;
  phone?: string;
  title: string;
  start: Date;
  end: Date;
  date: Date;
  week: number;
}

const schema = {
  name: String,
  phone: String,
  title:String,
  start: Date,
  end: Date,
  date: Date,
  week: Number
};

const collectionName: string = 'reservation';
const bookingSchema: mongoose.Schema = new mongoose.Schema(schema);

const Reservation = (conn: mongoose.Connection): mongoose.Model<IReservation> =>
  conn.model(collectionName, bookingSchema);

export default Reservation;
