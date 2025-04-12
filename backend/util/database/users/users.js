import { client, testConnection } from "../db.js";
import dotenv from 'dotenv';
dotenv.config();

const db = client.db(process.env.DB_NAME);

const getUsers = async () => {
  testConnection();
  try {
    const users = await db.collection("users").find({}).toArray();
    console.log(users);
    return users;
  } catch (e) {
    throw new Error(`Failed to get users: ${e.message}`)
  }
}

export { getUsers };