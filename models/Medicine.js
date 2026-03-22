import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema(
  {
    _id: ObjectId,
    name: String,
    description: String,
    price: Number,
    stock: Number,
    createdBy: ObjectId, // admin user id
    createdAt: Date
  },
  { timestamps: true }
);

export default mongoose.models.Medicine || mongoose.model("Medicine", MedicineSchema);
