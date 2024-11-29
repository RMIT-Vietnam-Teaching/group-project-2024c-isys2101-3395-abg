import dbConnect from '@/app/lib/db';
import Category from '@/app/lib/models/category';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    await dbConnect();

    const DEFAULT_LIMIT = 9; // Default number of categories per page
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || DEFAULT_LIMIT, 10);

    try {
        // Fetch paginated categories
        const categories = await Category.find({})
            .skip((page - 1) * limit)
            .limit(limit);

        // Total count for pagination metadata
        const totalCount = await Category.countDocuments();

        return new Response(
            JSON.stringify({
                success: true,
                data: categories,
                meta: {
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / limit),
                    totalCount,
                    limit,
                },
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching categories:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to fetch categories' }),
            { status: 500 }
        );
    }
}

export async function POST(request) {
    await dbConnect();

    const authHeader = request.headers.get('authorization');

    // Check for authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(
            JSON.stringify({ success: false, error: 'Unauthorized access' }),
            { status: 401 }
        );
    }

    try {
        // Verify JWT token
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'admin') {
            return new Response(
                JSON.stringify({ success: false, error: 'Access denied' }),
                { status: 403 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { name, description } = body;

        // Validate incoming category data
        if (!name) {
            return new Response(
                JSON.stringify({ success: false, error: 'Category name is required' }),
                { status: 400 }
            );
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return new Response(
                JSON.stringify({ success: false, error: 'Category already exists' }),
                { status: 409 }
            );
        }

        // Create a new category
        const newCategory = await Category.create({ name, description });

        return new Response(
            JSON.stringify({ success: true, data: newCategory }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error creating category:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to create category' }),
            { status: 500 }
        );
    }
}