import bcrypt from 'bcryptjs';
import client from '../config/database.js';

// Check if user exists by email
export const findUserByEmail = async (email) => {
  console.log("findUserByEmail");
  const result = await client.query('SELECT * FROM public.users WHERE email = $1', [email]);
  console.log(result.rows.length);
  return result.rows[0];
};

// Create a new user
export const createUser = async (email, password, mobile, username) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("values are ");
    console.log( username, hashedPassword, mobile, email)
  const result = await client.query(
    'INSERT INTO users (email, password, mobile, username) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, hashedPassword, mobile, username]
  );
  return result.rows[0];
};

// Check if the entered password matches the stored hash
export const matchPassword = async (enteredPassword, storedPassword) => {
  return bcrypt.compare(enteredPassword, storedPassword);
};
