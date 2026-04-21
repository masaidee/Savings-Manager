import mongoose from 'mongoose';

const savingSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
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
savingSchema.index({ studentId: 1, date: -1 });

const Saving = mongoose.model('Saving', savingSchema);

export default Saving;
