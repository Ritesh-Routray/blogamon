import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/app/lib/mongoose"; // Ensure correct path
import Blog from "@/app/models/Blog";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    console.log("Connecting to database...");
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Error deleting blog", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params; // Extracting the blog ID from the URL params

  try {
    await connectToDatabase();

    // Check if the blog ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    // Extract the updated data from the request body
    const updatedData = req.body;

    // Update the blog by ID
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated blog
      runValidators: true, // Ensure the update follows model validation
    });

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Error updating blog", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }

}
