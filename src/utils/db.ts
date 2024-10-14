import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI!);
const dbName = 'dev';

export const connectDB = async () => {
//   if (!client.isConnected()) 
  await client.connect();
  return client.db(dbName);
};
