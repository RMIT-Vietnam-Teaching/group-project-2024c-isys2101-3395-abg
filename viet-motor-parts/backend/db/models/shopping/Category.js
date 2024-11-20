const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, 'Category name must be unique'],
      minLength: [3, 'Category name must be at least 3 characters long']
    },
    description: {
      type: String,
      required: false,
      maxLength: [200, 'Description cannot exceed 200 characters']
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;