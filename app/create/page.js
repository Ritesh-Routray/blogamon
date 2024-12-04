"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signup"); // Redirect to signup if not logged in
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author || !image) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/blogs",
        {
          title,
          content,
          author,
          image,
          tags: tags.split(",").map((tag) => tag.trim()),
          isPublished,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Blog created successfully!");
        router.push("/my-blogs");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 py-16">
      <div className="container mx-auto max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Create a New Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
              placeholder="Enter your blog title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-lg font-medium text-gray-700"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
              placeholder="Enter the author name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-lg font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Content
            </label>
            <textarea
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
              placeholder="Write your blog content here..."
              required
            ></textarea>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg font-medium text-gray-700">Publish</label>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-6 w-6"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-500"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
