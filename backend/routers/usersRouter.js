import { Router } from "express";
import { getUsers, addUser } from "../util/database/users/users.js";

const router = Router();

router.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
})

// add singular get here sometime


router.post("/api/users", async (req, res) => {
  const { username, email, password } = req.body;
  addUser(username, email, password);
  res.status(200).send({ message: "User Added succesfully." });
})

export default router;