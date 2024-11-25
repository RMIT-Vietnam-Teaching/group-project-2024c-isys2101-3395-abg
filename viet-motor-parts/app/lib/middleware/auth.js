import jwt from 'jsonwebtoken';

export const verifyAdminToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.username) {
      throw new Error('Invalid token');
    }

    return decoded; // Return decoded token data
  } catch (error) {
    throw new Error('Unauthorized');
  }
};
