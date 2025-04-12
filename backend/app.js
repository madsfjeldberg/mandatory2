import express from "express";
import authRouter from "./routers/authRouter.js";
import usersRouter from "./routers/usersRouter.js";
import { connectDB } from "./util/database/db.js";

const app = express();
const PORT = 8080;

app.use(express.json())

app.use(authRouter);
app.use(usersRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
