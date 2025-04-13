import { testConnection } from "../db.js";
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

const editUser = async (id, username, email, password) => {
  testConnection();
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { username: username, email: email, password: password },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error(`User with username ${username} not found.`);
    }
    return updatedUser;
  } catch (e) {
    throw new Error(`Failed to update user: ${e.message}`);
  }
}


// const deleteUser = async (username) => {
//   testConnection();
//   try {
//     const deletedUser = await User.findByUsernameAndDelete(username);
//     if (!deletedUser) {
//       throw new Error(`User with username ${username} not found.`);
//     }
//     return deletedUser;
//   } catch (e) {
//     throw new Error(`Failed to delete user: ${e.message}`);
//   }
// }

export { getUsers, getUser, addUser, editUser };