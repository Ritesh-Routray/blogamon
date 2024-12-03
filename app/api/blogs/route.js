// app/api/blogs/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongoose.js";
import Blog from "@/app/models/Blog";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all blogs sorted by creation date
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).select("-__v");

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blogs", error: error.message },
      { status: 500 }
    );
  }
}

// Handle POST request to create a new blog
export async function POST(request) {
  try {
    await connectToDatabase(); // Ensure the database connection is established

    const body = await request.json(); // Parse incoming request body

    // Validate required fields
    const { title, content, author, image, tags } = body;
    if (!title || !content || !author || !image) {
      return NextResponse.json(
        { message: 'Missing required fields: title, content, author, and image are required.' },
        { status: 400 }
      );
    }

    // Create a new blog document
    const newBlog = new Blog({
      title,
      content,
      author,
      image,
      tags: tags || [],
      isPublished: true, // Set to true by default
    });

    // Save the blog to the database
    const savedBlog = await newBlog.save();

    // Return the saved blog as a response
    return NextResponse.json(savedBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating blog', error: error.message },
      { status: 500 }
    );
  }
}





