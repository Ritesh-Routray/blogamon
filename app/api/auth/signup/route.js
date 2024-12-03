// app/api/auth/signup.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/app/lib/mongoose";
import User from "@/app/models/User"; // Your User model

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Replace this in production with a secure secret

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Optional: Validate email format and password strength
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Token validity: 1 hour
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json(
      { message: "Error signing up", error: error.message },
      { status: 500 }
    );
  }
}
