import { connectDB } from "../../../lib/mongodb";
import Order from "../../../models/Order";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    let query = {};
    if (userId) {
      query.userId = userId;
    }

    const orders = await Order.find(query)
      .populate("userId", "firstName lastName email")
      .populate("items.medicineId")
      .sort({ createdAt: -1 });

    return Response.json(orders);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const order = await Order.create(body);
    return Response.json(order, { status: 201 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const updated = await Order.findByIdAndUpdate(body._id, body, { new: true });
    return Response.json(updated);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
