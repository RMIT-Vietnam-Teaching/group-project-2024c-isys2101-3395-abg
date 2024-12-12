import dbConnect from '@/app/lib/db';
import Category from '@/app/lib/models/category';
import CompatibleVehicle from '@/app/lib/models/compatiblevehicle';
import jwt from 'jsonwebtoken';

export async function GET(request, { params }) {
    await dbConnect();

    const { id } = params;

    if (!id) {
        return new Response(
            JSON.stringify({ success: false, error: 'Vehicle ID is required' }),
            { status: 400 }
        );
    }

    try {
        const vehicle = await CompatibleVehicle.findById(id);

        if (!vehicle) {
            return new Response(
                JSON.stringify({ success: false, error: 'Category not found' }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, data: vehicle }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to fetch vehicle' }),
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
    await dbConnect();

    const { id } = params;

    if (!id) {
        return new Response(
            JSON.stringify({ success: false, error: 'Vehicle ID is required' }),
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

        const updatedVehicle = await CompatibleVehicle.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Run validation on updated fields
        });

        if (!updatedVehicle) {
            return new Response(
                JSON.stringify({ success: false, error: 'Vehicle not found' }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, data: updatedVehicle }),
            {
                status: 200, headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error updating Vehicle }),:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to update Vehicle }),' }),
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();

    const { id } = params;

    if (!id) {
        return new Response(
            JSON.stringify({ success: false, error: 'Vehicle ID is required' }),
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

        const deletedVehicle = await CompatibleVehicle.findByIdAndDelete(id);

        if (!deletedVehicle) {
            return new Response(
                JSON.stringify({ success: false, error: 'Vehicle not found' }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, data: deletedVehicle }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting category:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to delete vehicle' }),
            { status: 500 }
        );
    }
}