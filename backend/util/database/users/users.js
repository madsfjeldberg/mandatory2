import { client } from "../db.js";
import dotenv from 'dotenv';
dotenv.config();

const db = client.db(process.env.DB_NAME);

const getUsers = async () => {
  try {
    const users = await db.collection("users").find({}).toArray();
    return users;
  } catch (e) {
    throw new Error(`Failed to get users: ${e.message}`)
  }
}

getUsers();