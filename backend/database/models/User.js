import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 20,
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
    minLength: 5,
    maxLength: 50,
  },
  password: { 
    type: String, 
    required: true,
    minLength: 5,
    maxLength: 100,
  }
}, { timestamps: true, collection : 'users' });

export default mongoose.model('User', userSchema);