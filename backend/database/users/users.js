import { testConnection } from "../db.js";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';
import User from "../models/User.js";
dotenv.config();


const getUsers = async () => {
  try {
    const users = await User.find().lean();
    return users;
  } catch (e) {
    throw new Error(`Failed to get users: ${e.message}`);
  }
};

const getUser = async (username) => {
  testConnection();
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (e) {
    throw new Error(`Failed to get user: ${e.message}`);
  }
}

const addUser = async (username, email, password) => {
  testConnection();
  try {
    const existingUser = await User.find({ username: username });
    if (existingUser.length > 0) {
      throw new Error(`User with username ${username} already exists.`);
    }
    return await User.create({
      username: username,
      email: email,
      password: password,
    });
  } catch (e) {
    throw new Error(`Failed to add user: ${e.message}`);
  }
}


const deleteUser = async (id) => {
  testConnection();
  id = ObjectId.createFromHexString(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error(`User with id ${id} not found.`);
    }
    return deletedUser;
  } catch (e) {
    throw new Error(`Failed to delete user: ${e.message}`);
  }
}

export { getUsers, getUser, addUser, deleteUser };