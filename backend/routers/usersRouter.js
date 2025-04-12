import { Router } from "express";
import { getUsers, addUser, getUser, deleteUser } from "../util/database/users/users.js";

const router = Router();

router.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

// add singular get here sometime
router.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await getUser(id);
  res.status(200).json(user);
});


router.post("/api/users", async (req, res) => {
  const { username, email, password } = req.body;
  addUser(username, email, password);
  res.status(200).send({ message: "User Added succesfully." });
});

router.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  deleteUser(id);
  res.status(200).send({ message: "User Deleted Succesfully." });
});

export default router;