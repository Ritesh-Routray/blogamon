import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/app/models/User"; // Import your User model
import { connectToDatabase } from "@/app/lib/mongoose"; // Database connection logic

export async function POST(req) {
  try {
    // Ensure database connection is established
    await connectToDatabase();

    // Get email and password from request body
    const { email, password } = await req.json();

    // Basic input validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find the user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET, // Ensure JWT_SECRET is set in your .env file
      { expiresIn: "1h" }
    );

    // Return the token as a response (without sensitive user info like password)
    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors and send error message
    return NextResponse.json(
      { message: "Error logging in", error: error.message },
      { status: 500 }
    );
  }
}
