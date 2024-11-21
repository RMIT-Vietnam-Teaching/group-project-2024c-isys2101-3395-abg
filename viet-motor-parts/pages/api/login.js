import dbConnect from '@/app/lib/db';
import User from '@/app/lib/models/users'; // Adjust the path to your User model
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For creating authentication tokens

export default async function handler(req, res) {
    // Allow only POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Connect to the database
        await dbConnect();

        // Extract username and password from the request body
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find the user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiry
        );

        // Respond with the token
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
