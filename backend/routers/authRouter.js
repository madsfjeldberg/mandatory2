import { Router } from "express";
import auth from "../util/auth.js";
import { addUser, getUser, editUser } from "../database/users/users.js";
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Set to true in production
  sameSite: process.env.NODE_ENV === "production" ? "None" : "lax", // Set to None in production for cross-site cookies
  maxAge: 3600000, // 1 hour
}

router.post("/auth/register", async (req, res) => {
  // extract user data from request body
  const { username, email, password } = req.body;

  // validate user data
  if (!username || !email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const hashedPassword = await auth.hashPassword(password);

  let newUser = addUser(username, email, hashedPassword);
  const token = auth.generateToken(newUser);
  res
    .status(200)
    .cookie("jwt", token, cookieOptions)
    .json({ message: "User Registered successful.", status: 200 });

  // res.status(200).send({ status: 200, message: "User registered successfully" });
});

router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log("All fields are required");
    return res.status(400).send({ message: "All fields are required" });
  }

  const dbUser = await getUser(username);
  console.log(dbUser);

  if (!dbUser) {
    console.log("User not found");
    return res.status(401).send({ message: "Wrong username or password." });
  }
  const isValidPassword = await auth.verifyPassword(password, dbUser.password);

  try {
    if (isValidPassword) {
      const token = auth.generateToken(dbUser);
      res
        .status(200)
        .cookie("jwt", token, cookieOptions)
        .json({
          message: "Login successful.",
          status: 200,
        });
    } else {
      console.log("Wrong username or password.");
      return res.status(401).send({ message: "Wrong username or password." });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: "An error occurred during login.", error: e.message });
  }
});


router.get("/auth/logout", (req, res) => {
  res
    .clearCookie("jwt")
    .status(200)
    .send({ message: "Logout successful." });
});

router.post("/auth/change-password", async (req, res) => {
  const { newPassword } = req.body;
  
  if (!newPassword) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const token = req.cookies.jwt;  
  const decoded = auth.decodeToken(token);
  const dbUser = await getUser(decoded.username);

  try {
    const hashedPassword = await auth.hashPassword(newPassword);
    await editUser(dbUser._id, dbUser.username, dbUser.email, hashedPassword);
    res.status(200).send({ message: "Password changed successfully" });
  } catch (e) {
    res.status(500).send({ message: `An error occurred during password change.` });
  }
});

export default router;
