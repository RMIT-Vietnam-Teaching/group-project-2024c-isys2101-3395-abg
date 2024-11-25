import dbConnect from '@/app/lib/db';
import Order from '@/app/lib/models/order';
import { verifyAdminToken } from '@/app/lib/middleware/auth';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Fetch all orders (admin only)
    try {
      // Check if user is admin
      try {
        const admin = verifyAdminToken(req); // Ensure the user is an admin
        if (!admin) {
          return res.status(403).json({ success: false, error: 'Access denied' });
        }

        // Fetch all orders
        const orders = await Order.find({});
        return res.status(200).json({ success: true, data: orders });
      } catch (error) {
        return res.status(401).json({ success: false, error: 'Unauthorized admin' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'POST') {
    // Create a new order (admin only)
    try {
      // Check if user is admin
      try {
        const admin = verifyAdminToken(req); // Ensure the user is an admin
        if (!admin) {
          return res.status(403).json({ success: false, error: 'Access denied' });
        }

        // Create a new order
        const order = new Order(req.body);
        const savedOrder = await order.save();
        return res.status(201).json({ success: true, data: savedOrder });
      } catch (error) {
        return res.status(401).json({ success: false, error: 'Unauthorized admin' });
      }
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
