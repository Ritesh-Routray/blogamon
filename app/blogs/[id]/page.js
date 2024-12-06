"use client";

import Link from "next/link";

export default async function BlogPage({ params }) {
  const { id } = params;

  // Fetch the single blog post
  const res = await fetch(`api/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center text-red-500 font-semibold text-xl">
          Error loading blog
        </div>
      </div>
    );
  }

  const blog = await res.json();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="relative group">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover object-center rounded-t-lg transform transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-t-lg"></div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-10 bg-white space-y-6">
          <h1 className="text-5xl font-extrabold text-center text-gray-900 tracking-wide leading-snug mb-4 hover:text-indigo-600 transition-colors duration-300">
            {blog.title}
          </h1>
          <p className="text-lg text-gray-600 text-center italic mb-6">
            By <span className="text-indigo-600">{blog.author}</span> |{" "}
            <span className="text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </p>

          <p className="text-lg text-gray-800 leading-relaxed mb-8">
            {blog.content}
          </p>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-4 mb-8">
            <p className="text-sm font-medium text-gray-700">Tags:</p>
            <div className="flex flex-wrap gap-4">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Read More Articles{" "}
              <Link href="/blogs">
                <span className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300">
                  here
                </span>
              </Link>
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Posted on:{" "}
              <span className="font-semibold text-gray-700">
                {new Date(blog.createdAt).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
