import { client, testConnection } from "../db.js";
import { ObjectId } from "mongodb";
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
    throw new Error(`Failed to get users: ${e.message}`);
  }
}

const getUser = async (id) => {
  testConnection();
  id = ObjectId.createFromHexString(id)
  try {
    const user = await db.collection("users").findOne({ _id: id});
    return user;
  } catch (e) {
    throw new Error(`Failed to get user: ${e.message}`);
  }
}

const addUser = async (username, email, password) => {
  testConnection();
  try {
    return await db.collection("users").insertOne({ username: username, email: email, password: password });
  } catch (e) {
    throw new Error(`Failed to add user: ${e.message}`);
  }
}

const deleteUser = async (id) => {
  testConnection();
  id = ObjectId.createFromHexString(id);
  try {
    return await db.collection("users").deleteOne({ _id: id });
  } catch (e) {
    throw new Error(`Failed to delete user: ${e.message}`);
  }
}

export { getUsers, getUser, addUser, deleteUser };