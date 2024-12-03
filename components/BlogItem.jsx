"use client";

import { useEffect, useState } from "react";

export default function BlogItems() {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlog, setExpandedBlog] = useState(null); // To track the expanded blog

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

  // Function to handle "Read More" click
  const toggleExpandBlog = (id) => {
    if (expandedBlog === id) {
      setExpandedBlog(null); // Collapse if already expanded
    } else {
      setExpandedBlog(id); // Expand selected blog
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Blogamon - All Blogs
      </h1>
      {blogs.length === 0 ? (
        <p className="text-xl text-gray-500 text-center">No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl duration-300 mb-8"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-72 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {blog.title}
              </h2>
              <p className="text-lg text-gray-600 italic mb-4">
                By {blog.author}
              </p>
              <div className="mt-2">
                <p className="text-gray-700">
                  {expandedBlog === blog._id
                    ? blog.content
                    : `${blog.content.substring(0, 150)}...`}{" "}
                  <button
                    onClick={() => toggleExpandBlog(blog._id)}
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    {expandedBlog === blog._id ? "Show Less" : "Read More"}
                  </button>
                </p>
                <p className="text-gray-400 mt-2">
                  <span className="font-medium">Tags: </span>
                  {blog.tags.join(", ")}
                </p>
              </div>
              <div className="flex justify-between items-center mt-6">
                <small className="text-gray-400 text-sm">
                  Posted on: {new Date(blog.createdAt).toLocaleString()}
                </small>
                <p className="text-sm text-gray-500 flex items-center">
                  <span role="img" aria-label="thumbs up" className="mr-1">
                    👍
                  </span>
                  {blog.likes} Likes
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
