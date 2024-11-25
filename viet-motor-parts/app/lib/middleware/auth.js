import jwt from 'jsonwebtoken';

export function verifyAdminToken(req) {
  const authHeader = req.headers.authorization;

  // Ensure the Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized access: Missing or invalid Authorization header');
  }

  // Extract and verify the token
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Ensure the user is an admin
  if (decoded.role !== 'admin') {
    throw new Error('Access denied: Admin role required');
  }

  return decoded;
}
