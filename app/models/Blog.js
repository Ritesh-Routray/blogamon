// models/Blog.ts
import mongoose, { Schema, model, models } from "mongoose";

const blogSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: String, required: true, trim: true },
  image: { type: String, required: true }, // URL of the blog image
  tags: [{ type: String, trim: true }], // Array of tags for categorization
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }, // Number of likes
  comments: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      commentedAt: { type: Date, default: Date.now },
    },
  ], // Array of comments
  isPublished: { type: Boolean, default: false }, // Publish status
});

blogSchema.pre("save", function (next) {
  this.updatedAt = new Date(); // Update `updatedAt` field before saving
  next();
});

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;
