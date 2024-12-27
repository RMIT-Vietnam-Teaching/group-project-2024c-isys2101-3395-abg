import mongoose from 'mongoose';
import Product, { IProduct } from '../lib/models/product';
import dbConnect from '../lib/db';

// Function to update products with discount_perc
async function seedDiscountPerc() {
  try {
    console.log('Fetching products...');
    const products: IProduct[] = await Product.find({});

    console.log(`Found ${products.length} products. Updating with discount_perc...`);
    const updatePromises = products.map((product) => {
      const randomDiscount = Math.floor(Math.random() * (60 - 20 + 1)) + 20; // Generate random number between 20 and 60
      return Product.findByIdAndUpdate(
        product._id,
        { discount_perc: randomDiscount },
        { new: true } // Return updated document
      );
    });

    const updatedProducts = await Promise.all(updatePromises);
    console.log(`Successfully updated ${updatedProducts.length} products with discount_perc.`);
  } catch (error) {
    console.error('Error updating products:', error);
  }
}

// Main function to handle the entire flow
async function main() {
  try {
    console.log('Connecting to the database...');
    await dbConnect();
    console.log('Connected to the database.');

    await seedDiscountPerc();
  } catch (error) {
    console.error('Error during seed operation:', error);
  } finally {
    try {
      console.log('Disconnecting from the database...');
      await mongoose.disconnect();
      console.log('Disconnected from the database.');
    } catch (disconnectError) {
      console.error('Error during disconnection:', disconnectError);
    }
  }
}

// Execute the main function
main();