import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
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

// Index for faster queries by room
studentSchema.index({ roomId: 1 });

const Student = mongoose.model('Student', studentSchema);

export default Student;
