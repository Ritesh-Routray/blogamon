"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the user is logged in (based on token presence)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to home page after logout
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-800 min-h-screen font-[Poppins]">
      {/* Header Section */}
      <header className="bg-transparent shadow-xl">
        <div className="container mx-auto flex justify-between items-center py-8 px-12">
          {/* Logo */}
          <h1 className="text-5xl font-extrabold text-white tracking-wider hover:text-yellow-400 transition duration-300 ease-in-out">
            <Link href="/" className="hover:text-yellow-400">
              Blogamon
            </Link>
          </h1>

          {/* Conditional Rendering for Buttons */}
          <nav className="flex gap-6 items-center">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
                >
                  Sign Out
                </button>
                <Link
                  href="/create"
                  className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
                >
                  Create
                </Link>
                <Link
                  href="/my-blogs"
                  className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-500 hover:scale-105 transition-all duration-300 ease-in-out transform"
                >
                  My Blogs
                </Link>
                {/* Profile Button */}
                <Link
                  href="/profile"
                  className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 ease-in-out transform"
                >
                  Profile
                </Link>
              </>
            ) : (
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out transform"
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto py-24 px-8">
        {/* Latest Blogs Heading */}
        <h2 className="text-6xl font-bold text-white text-center mb-6 tracking-wide">
          Latest Blogs
        </h2>

        {/* Description Text */}
        <p className="text-white text-lg text-center max-w-3xl mx-auto mb-10">
          Stay ahead of the curve with the latest insights, trends, and stories
          from our expert bloggers. Get inspired, stay informed, and discover
          new perspectives.
        </p>

        {/* Search Bar Section (Relocated) */}
        <form
          onSubmit={handleSearch}
          className="flex items-center border border-white rounded-full bg-white py-2 px-4 max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="Search Blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-lg bg-transparent outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full ml-2 shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Search
          </button>
        </form>
      </main>
    </div>
  );
};

export default Header;
