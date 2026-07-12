import { connectDB } from "../../../lib/mongodb";
import Medicine from "../../../models/Medicine";

export async function GET(request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const category = url.searchParams.get("category") || "";

    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (category) filter.category = category;

    const medicines = await Medicine.find(filter).sort({ createdAt: -1 });
    return Response.json(medicines);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}     

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const medicine = await Medicine.create(body);
    return Response.json(medicine, { status: 201 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const updated = await Medicine.findByIdAndUpdate(body._id, body, { new: true });
    return Response.json(updated);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();
    await Medicine.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
