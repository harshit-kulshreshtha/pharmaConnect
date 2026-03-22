import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const existing = await User.findOne({ email: body.email });
    if (existing) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      dob: body.dob,
      phone: body.phone,
      email: body.email,
      password: hashedPassword,
      role: "user"
    });

    return Response.json({
      id: user._id,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
