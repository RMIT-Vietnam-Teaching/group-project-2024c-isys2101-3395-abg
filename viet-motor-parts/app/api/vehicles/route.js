import dbConnect from '@/app/lib/db';
import CompatibleVehicle from '@/app/lib/models/compatiblevehicle';

// Named export for the GET method
export async function GET(request) {
  await dbConnect(); // Connect to the database

  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || null;

  if (!name) {
    return new Response(
      JSON.stringify({ success: false, error: 'Vehicle name is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const vehicles = await CompatibleVehicle.find({
      $or: [
        { make: new RegExp(name, 'i') }, // Case-insensitive search in "make"
        { vehicleModel: new RegExp(name, 'i') }, // Case-insensitive search in "vehicleModel"
      ],
    });

    if (vehicles.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'No matching vehicles found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: vehicles }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch vehicles' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
