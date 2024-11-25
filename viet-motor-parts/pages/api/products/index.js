import dbConnect from '@/app/lib/db';
import Product from '@/app/lib/models/product';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const DEFAULT_LIMIT = 10;
    const { page = 1, limit = DEFAULT_LIMIT } = req.query;

    try {
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      // Fetch paginated products
      const products = await Product.find({})
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

      // Total count for pagination metadata
      const totalCount = await Product.countDocuments();

      res.status(200).json({
        success: true,
        data: products,
        meta: {
          currentPage: pageNumber,
          totalPages: Math.ceil(totalCount / limitNumber),
          totalCount,
          limit: limitNumber, // Include the limit in metadata
        },
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch products' });
    }
  } else if (req.method === 'POST') {
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

      // Validate incoming product data
      const { name, description, brand, category_id, price, stock_quantity, image_base64 } = req.body;

      if (!name || !description || !brand || !category_id || !price || !stock_quantity || !image_base64) {
        return res.status(400).json({ success: false, error: 'Missing required product fields' });
      }

      // Create a new product
      const newProduct = await Product.create(req.body);
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ success: false, error: 'Failed to create product' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }
}
