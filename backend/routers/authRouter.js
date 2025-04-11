import { Router } from 'express';
import auth from "../util/auth.js";

const router = Router();

router.post('/auth/register', async (req, res) => { 
  // extract user data from request body
  const { username, email, password } = req.body;

  // validate user data
  if (!username || !email || !password) {
    return res.status(400).send({ message: 'All fields are required' });
  }
  
  const hashedPassword = await auth.hashPassword(password);
  
  // at some point will save user to db here
  // db.save(username, email, hashedPassword);
  // for now, just simulate a successful registration
  res.status(201).send({ message: 'User registered successfully' });
});

router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: 'All fields are required' });
  }

  // check user exists here
  // const dbUser = db.find(username);
  const dbUserPassword = await auth.hashPassword("password");
  const dbUser = {
    id: "1",
    username: "user",
    password: dbUserPassword
  }


  const isValidPassword = await auth.verifyPassword(password, dbUser.password);

  try {
    if (isValidPassword) {
      const token = auth.generateToken(dbUser)
      res.status(200).cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour
      }).json({
        message: "Login successful."
      })

    } else {
      res.status(401).send({ message: "Wrong username or password."})
    }
  } catch (e) {
    res.status(500).send({ message: 'An error occurred during login.', error: e.message });
  }


  




});


export default router;