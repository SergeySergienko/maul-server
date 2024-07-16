import { MongoClient } from 'mongodb';
import { EventModel, TeamMemberModel } from '../models';

const url = process.env.DATABASE_URL as string;

const client = new MongoClient(url);
export const teamMemberCollection = client
  .db('maul_db')
  .collection<TeamMemberModel>('teamMembers');
export const eventCollection = client
  .db('maul_db')
  .collection<EventModel>('events');

export async function runDb() {
  try {
    await client.connect();
    console.log(
      '\x1b[35m%s\x1b[0m',
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (error) {
    console.log(error);
    await client.close();
  }
}
