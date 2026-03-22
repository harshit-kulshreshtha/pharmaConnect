import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ message: "Invalid credentials - email" }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return Response.json({
      id: user._id,
      firstName: user.firstName,
      email: user.email,
      role: user.role,
      address: user.address || ""
    });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
