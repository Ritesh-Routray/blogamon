import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongoose.js";
import Blog from "@/app/models/Blog";

// GET: Fetch all blogs or search blogs by tags/title
export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query"); // Get the search query from URL

    let blogs;

    if (query) {
      // Search blogs by title or tags (case-insensitive)
      const regex = new RegExp(query, "i");
      blogs = await Blog.find({
        $or: [{ title: regex }, { tags: { $regex: regex } }],
      })
        .sort({ createdAt: -1 })
        .select("-__v");
    } else {
      // Fetch all blogs if no search query is provided
      blogs = await Blog.find({}).sort({ createdAt: -1 }).select("-__v");
    }

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blogs", error: error.message },
      { status: 500 }
    );
  }
}

// POST: Create a new blog
export async function POST(request) {
  try {
    await connectToDatabase(); // Ensure DB connection
    const body = await request.json(); // Parse incoming JSON body

    // Validate required fields
    const {
      title,
      content,
      author,
      image,
      tags = [],
      isPublished = false,
    } = body;
    if (!title || !content || !author || !image) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: title, content, author, and image are required.",
        },
        { status: 400 }
      );
    }

    // Create a new blog document
    const newBlog = new Blog({
      title,
      content,
      author,
      image,
      tags: Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag) => tag.trim()),
      isPublished,
    });

    // Save the blog to the database
    const savedBlog = await newBlog.save();

    return NextResponse.json(savedBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating blog", error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update an existing blog (optional)
export async function PUT(request) {
  try {
    await connectToDatabase();
    const { id, title, content, author, image, tags, isPublished } =
      await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        author,
        image,
        tags: Array.isArray(tags)
          ? tags
          : tags.split(",").map((tag) => tag.trim()),
        isPublished,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating blog", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete an existing blog (optional)
export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting blog", error: error.message },
      { status: 500 }
    );
  }
}
