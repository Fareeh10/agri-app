import express from 'express';
import User from '../models/User.js';

const router = express.Router();


// POST /api/users
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json(user);

  } catch (error) {
    console.error('Error creating user:', error);

    res.status(500).json({
      message: 'Failed to create user',
    });
  }
});


export default router;