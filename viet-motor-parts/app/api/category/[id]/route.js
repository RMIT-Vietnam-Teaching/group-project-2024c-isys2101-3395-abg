import dbConnect from '@/app/lib/db';
import Category from '@/app/lib/models/category';
import jwt from 'jsonwebtoken';

export async function GET(request, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: 'Category ID is required' }),
      { status: 400 }
    );
  }

  try {
    const category = await Category.findById(id);

    if (!category) {
      return new Response(
        JSON.stringify({ success: false, error: 'Category not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: category }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching category:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch category' }),
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: 'Category ID is required' }),
      { status: 400 }
    );
  }

  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized access' }),
      { status: 401 }
    );
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return new Response(
        JSON.stringify({ success: false, error: 'Access denied' }),
        { status: 403 }
      );
    }

    const updateData = await request.json();

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on updated fields
    });

    if (!updatedCategory) {
      return new Response(
        JSON.stringify({ success: false, error: 'Category not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: updatedCategory }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating category:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to update category' }),
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: 'Category ID is required' }),
      { status: 400 }
    );
  }

  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized access' }),
      { status: 401 }
    );
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return new Response(
        JSON.stringify({ success: false, error: 'Access denied' }),
        { status: 403 }
      );
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return new Response(
        JSON.stringify({ success: false, error: 'Category not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: deletedCategory }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting category:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to delete category' }),
      { status: 500 }
    );
  }
}