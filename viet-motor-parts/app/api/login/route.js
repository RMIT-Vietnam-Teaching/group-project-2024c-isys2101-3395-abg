import dbConnect from '@/app/lib/db';
import User from '@/app/lib/models/users';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { serialize } from 'cookie';

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
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: 'Invalid password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate a JWT token with jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ id: user._id, username: user.username, role: user.role })
      .setProtectedHeader({ alg: 'HS256' }) // Algorithm
      .setIssuedAt() // Issued at timestamp
      .setExpirationTime('365d') // Expiry (1 year)
      .sign(secret); // Secret key

    // Create a cookie
    const serializedCookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure in production
      sameSite: 'strict',
      maxAge: 365 * 24 * 60 * 60, // One year
      path: '/',
    });

    // Set the cookie in the response
    return new Response(
      JSON.stringify({ message: 'Login successful' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': serializedCookie,
        },
      }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
