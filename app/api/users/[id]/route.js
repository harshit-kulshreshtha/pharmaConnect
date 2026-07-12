import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import mongoose from "mongoose";

export async function PUT(req, context) {
  try {
    await connectDB();
    let params = context.params;
    // context.params may be a Promise in some Next versions
    if (typeof params?.then === "function") params = await params;
    const { id } = params || {};
    const body = await req.json();

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // Update only allowed fields
    const updateObj = {};
    if (body.dob !== undefined) updateObj.dob = body.dob;
    if (body.phone !== undefined) updateObj.phone = body.phone;
    if (body.addressLine1 !== undefined || body.addressCity !== undefined || body.addressState !== undefined || body.addressZip !== undefined) {
      updateObj.address = {
        line1: body.addressLine1 || "",
        city: body.addressCity || "",
        state: body.addressState || "",
        zip: body.addressZip || ""
      };
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateObj, { new: true }).select("-password");

    if (!updatedUser) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(updatedUser);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function GET(req, context) {
  try {
    await connectDB();
    let params = context.params;
    if (typeof params?.then === "function") params = await params;
    const { id } = params || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
