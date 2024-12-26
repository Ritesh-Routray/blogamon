"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSignInAlt, FaEdit, FaRegUser } from "react-icons/fa";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to home page
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await fetch(`/api/blogs?query=${searchQuery}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Failed to fetch blogs.");
        }
      } catch (error) {
        console.error("Error searching blogs:", error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 min-h-screen font-[Poppins]">
      <header className="bg-transparent shadow-lg">
        <div className="container mx-auto flex flex-wrap justify-between items-center py-6 px-6 sm:px-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wider hover:text-yellow-400 transition duration-300 ease-in-out">
            <Link href="/" className="hover:text-yellow-400">
              Blogamon
            </Link>
          </h1>
          <nav className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/create"
                  className="text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
                >
                  <FaEdit className="inline mr-2" /> Create
                </Link>
                <Link
                  href="/my-blogs"
                  className="text-green-600 font-semibold px-4 py-2 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
                >
                  <FaRegUser className="inline mr-2" /> My Blogs
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-semibold px-4 py-2 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
                >
                  <FaSignInAlt className="inline mr-2" /> Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/signup"
                className="text-white font-semibold px-6 py-2 rounded-lg shadow-xl bg-gradient-to-r from-pink-500 to-orange-500 hover:scale-105 transition-transform duration-300"
              >
                <FaSignInAlt className="inline mr-2" /> Get Started
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-16 px-6 sm:px-8 text-center">
        <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 tracking-wide drop-shadow-lg">
          Discover the Latest Blogs
        </h2>
        {!isLoggedIn && (
          <p className="text-white text-lg mb-6">
            To create a blog, please sign up and log in.
          </p>
        )}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center border border-white rounded-full bg-white py-2 px-4 max-w-md mx-auto shadow-lg"
        >
          <input
            type="text"
            placeholder="Search Blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full flex-grow border-none focus:ring-0 text-gray-800 placeholder-gray-500 text-lg bg-transparent outline-none mb-2 sm:mb-0"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out w-full sm:w-auto"
          >
            Search
          </button>
        </form>
        {searchResults.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Search Results:
            </h3>
            <ul className="space-y-4">
              {searchResults.map((blog) => (
                <li
                  key={blog._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-semibold">{blog.title}</h4>
                  <p className="text-gray-700">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <Link
                    href={`/blogs/${blog._id}`}
                    className="text-blue-500 mt-2 block"
                  >
                    Read More
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {searchQuery && searchResults.length === 0 && (
          <p className="text-white mt-8">No blogs found for the given query.</p>
        )}
      </main>
    </div>
  );
};

export default Header;
