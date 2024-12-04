import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongoose.js";
import Blog from "@/app/models/Blog";
import jwt from "jsonwebtoken"; // Assuming you use JWT for authentication

export async function GET(request) {
  try {
    await connectToDatabase();

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization header missing" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token

    // Fetch blogs by the user
    const blogs = await Blog.find({ author: decoded.username }).sort({
      createdAt: -1,
    });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user's blogs", error: error.message },
      { status: 500 }
    );
  }
}
