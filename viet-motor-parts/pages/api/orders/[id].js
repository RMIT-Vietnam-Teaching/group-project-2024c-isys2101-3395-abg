import dbConnect from '@/app/lib/db';
import Order from '@/app/lib/models/order';
import mongoose from 'mongoose';
import { verifyAdminToken } from '@/app/lib/middleware/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: 'Invalid Order ID' });
  }

  if (req.method === 'GET') {
    try {
      // Check if user is admin or customer
      const authHeader = req.headers.authorization;

      if (authHeader) {
        // Admin access with token
        try {
          const admin = verifyAdminToken(req);
          if (admin) {
            // Fetch order for admin
            const order = await Order.findById(id);
            if (!order) {
              return res.status(404).json({ success: false, error: 'Order not found' });
            }
            return res.status(200).json({ success: true, data: order });
          }
        } catch (error) {
          return res.status(401).json({ success: false, error: 'Unauthorized admin' });
        }
      } else {
        // Customer access without token
        const { phone_number } = req.headers;

        if (!phone_number) {
          return res.status(400).json({ success: false, error: 'Phone number is required' });
        }

        // Fetch order for customer
        const order = await Order.findById(id);
        if (!order) {
          return res.status(404).json({ success: false, error: 'Order not found' });
        }

        // Verify customer's phone number matches the order
        if (order.phone_number !== phone_number) {
          return res.status(403).json({ success: false, error: 'Access denied' });
        }

        return res.status(200).json({ success: true, data: order });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
