import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, matchPassword }  from '../models/user.js';

// Register User
export const registerUser = async (req, res) => {
  try {
    const { email, password, mobile , username} = req.body;
    console.log("registeruser");
    console.log(req.body);
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = await createUser(email, password,mobile, username);
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Authenticate User (Login)
export const authUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("authUser");
  try {
    // Check if user exists
    
  console.log("before checking user");
    const user = await findUserByEmail(email);
    if (!user) {
      
      console.log("user doesnt exist");
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {

      console.log("password doesnt macth");
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET  );

    console.log("user authenticated successfully");
    return res.json({ message: 'Authenticated', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// module.exports = { registerUser, authUser };
