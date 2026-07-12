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
      lastName: user.lastName,
      email: user.email,
      dob: user.dob || "",
      phone: user.phone || "",
      address: user.address || { line1: "", city: "", state: "", zip: "" },
      role: user.role
    });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
