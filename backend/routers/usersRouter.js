import { Router } from "express";
import { getUsers } from "../util/database/users/users.js";

const router = Router();

router.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
})

export default router;