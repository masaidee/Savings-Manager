import mongoose from 'mongoose';

const childSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalSaved: {
      type: Number,
      default: 0,
      min: 0,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate totalSaved from transactions (will be updated via controller)
const Child = mongoose.model('Child', childSchema);

export default Child;
