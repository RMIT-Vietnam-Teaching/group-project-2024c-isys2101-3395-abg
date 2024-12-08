import dbConnect from '@/app/lib/db';
import User from '@/app/lib/models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return new Response(
        JSON.stringify({ message: 'Username and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid username' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) { // replace to !isPasswordValid in the future
      return new Response(
        JSON.stringify({ message: 'Invalid password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '365d' } // Token expiry
    );

    // Respond with the token
    return new Response(
      JSON.stringify({ message: 'Login successful', token }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
