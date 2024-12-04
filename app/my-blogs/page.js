"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For redirect after editing or deleting

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router for redirect after edit/delete

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("/api/my-blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch blogs");
        }
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs(blogs.filter((blog) => blog._id !== blogId)); // Remove blog from state
      alert("Blog deleted successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (blogId) => {
    router.push(`/edit-blog/${blogId}`); // Navigate to the edit page with the blog ID
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">
        My Blogs
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {blogs.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          You have not created any blogs yet. Get started by writing your first
          post!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {blog.content}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    Tags: {blog.tags.join(", ")}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-4 text-right">
                  <button
                    className="text-indigo-600 hover:text-indigo-800 transition-colors mr-4"
                    onClick={() => handleEdit(blog._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 transition-colors"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
