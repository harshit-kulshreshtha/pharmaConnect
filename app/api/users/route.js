import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return Response.json(users);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
