import express from 'express';
import User from '../models/User.js';
// import bcrypt from 'bcrypt';

const router = express.Router();

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // checking if the user already exists
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const { password: _password, ...safeUser } = user.toObject();
    res.status(201).json(safeUser);

  } catch (error) {
    console.error('Error creating user:', error);

    res.status(500).json({
      message: 'Failed to create user',
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
       email ,
    });

    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const { password: _password, ...safeUser } = user.toObject();
    return res.status(200).json(safeUser);
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Failed to log in' });
  }
});

export default router;