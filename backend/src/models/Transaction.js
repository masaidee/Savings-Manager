import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child',
      required: true,
    },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    notes: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
transactionSchema.index({ childId: 1, date: -1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
