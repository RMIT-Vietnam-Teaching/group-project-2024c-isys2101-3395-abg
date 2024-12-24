import dbConnect from '@/app/lib/db';
import Product from '@/app/lib/models/product';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: 'Product ID is required' }),
      { status: 400 }
    );
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return new Response(
        JSON.stringify({ success: false, error: 'Product not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: product }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch product' }),
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: 'Product ID is required' }),
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

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on updated fields
    });

    if (!updatedProduct) {
      return new Response(
        JSON.stringify({ success: false, error: 'Product not found' }),
        { status: 404 }
      );
    }

    revalidatePath(`/products/${id}`);

    return new Response(
      JSON.stringify({ success: true, data: updatedProduct }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessages = Object.values(error.errors || {}).map(err => err.message);

    return new Response(
      JSON.stringify({ success: false, error: errorMessages.join(', ') }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: 'Product ID is required' }),
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

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return new Response(
        JSON.stringify({ success: false, error: 'Product not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: deletedProduct }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to delete product' }),
      { status: 500 }
    );
  }
}
