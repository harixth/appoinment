import mongoose from 'mongoose';

const uri: string = process.env.DB_PATH ?? '';

export const getConnection = async (): Promise<mongoose.Connection> => {
  const conn = await mongoose.createConnection(uri, {
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0, // and MongoDB driver buffering
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  return conn;
};
