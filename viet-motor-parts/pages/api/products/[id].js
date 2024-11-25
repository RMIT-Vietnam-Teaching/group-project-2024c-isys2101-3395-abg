import dbConnect from '@/app/lib/db';
import Product from '@/app/lib/models/product';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, error: 'Product ID is required' });
  }

  if (req.method === 'PATCH') {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized access' });
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== 'admin') {
        return res.status(403).json({ success: false, error: 'Access denied' });
      }

      const updateData = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run validation on updated fields
      });

      if (!updatedProduct) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }

      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ success: false, error: 'Failed to update product' });
    }
  } else if (req.method === 'DELETE') {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized access' });
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== 'admin') {
        return res.status(403).json({ success: false, error: 'Access denied' });
      }

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }

      res.status(200).json({ success: true, data: deletedProduct });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ success: false, error: 'Failed to delete product' });
    }
  } else {
    res.setHeader('Allow', ['PATCH', 'DELETE']);
    res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }
}
