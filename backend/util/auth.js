import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SALT = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT);
    return hashedPassword;
  } catch (e) {
    throw new Error('Error hashing password');
  }
}

const verifyPassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (e) {
    throw new Error(`Error verifying password: ${e.message}`);
  }
}

const generateToken = (user) => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const exp = now + 60; // Exactly 60 seconds from now

  const token = jwt.sign({
    id: user.id,
    username: user.username,
    iat: now,
    exp: exp
  }, JWT_SECRET);
  debugToken(token);
  return token;
}

const debugToken = (token) => {
  const decoded = jwt.decode(token);
  console.log({
    issuedAt: new Date(decoded.iat * 1000).toLocaleString('da-DK'),
    expiresAt: new Date(decoded.exp * 1000).toLocaleString('da-DK'),
    timeUntilExpiry: decoded.exp - decoded.iat + ' seconds'
  });
  return decoded;
}

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (e) {
    throw new Error('Invalid token');
  }
}

const auth = {
  hashPassword,
  verifyPassword,
  generateToken,
  decodeToken
};

export default auth;