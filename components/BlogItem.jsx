"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function BlogItems() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Handle navigation to individual blog
  const handleBlogClick = (id) => {
    router.push(`/blogs/${id}`); // Redirect to dynamic blog page
  };

  return (
    <div className="container mx-auto p-6 font-sans">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 drop-shadow-lg">
        Blogamon - Discover Amazing Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-2xl text-gray-500 text-center font-light">
          No blogs available. Stay tuned!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => handleBlogClick(blog._id)} // Redirect on click
              className="group bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-t-lg group-hover:opacity-90"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 mb-3">
                  {blog.title}
                </h2>
                <p className="text-md text-gray-600 italic mb-3">
                  By {blog.author}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {blog.content.substring(0, 150)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
