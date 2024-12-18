import dbConnect from '@/app/lib/db';
import CompatibleVehicle from '@/app/lib/models/compatiblevehicle';

// Named export for the GET method
export async function GET(request) {
  await dbConnect(); // Connect to the database

  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  try {
    let vehicles;

    if (name) {
      // If 'name' is provided, perform a case-insensitive search
      vehicles = await CompatibleVehicle.find({
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
    } else {
      // If no 'name', return all records
      vehicles = await CompatibleVehicle.find({});
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

export async function POST(request) {
  await dbConnect(); // Connect to the database

  try {
    const body = await request.json();

    // Destructure fields from the request body
    const { make, vehicleModel, year } = body;

    // Validate required fields
    if (!make || !vehicleModel || !year) {
      return new Response(
        JSON.stringify({ success: false, error: 'Make, vehicleModel, and year are required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if the year is valid
    if (year < 1900) {
      return new Response(
        JSON.stringify({ success: false, error: `Year must be larger than 1900.` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a new compatible vehicle
    const newVehicle = await CompatibleVehicle.create({ make, vehicleModel, year });

    return new Response(
      JSON.stringify({ success: true, data: newVehicle }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to create vehicle' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}