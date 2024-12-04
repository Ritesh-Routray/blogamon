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
    <div className="bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 min-h-screen font-[Poppins]">
      {/* Header Section */}
      <header className="bg-transparent shadow-lg">
        <div className="container mx-auto flex flex-wrap justify-between items-center py-6 px-6 sm:px-12">
          {/* Logo */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wider hover:text-yellow-400 transition duration-300 ease-in-out">
            <Link href="/" className="hover:text-yellow-400">
              Blogamon
            </Link>
          </h1>

          {/* Navigation Buttons */}
          <nav className="flex flex-wrap gap-4 sm:gap-6 items-center mt-4 sm:mt-0">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-xl hover:bg-red-500 hover:scale-105 transition-transform duration-300 ease-in-out transform w-full sm:w-auto"
                >
                  Sign Out
                </button>
                <Link
                  href="/create"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-xl hover:bg-blue-500 hover:scale-105 transition-transform duration-300 ease-in-out transform w-full sm:w-auto"
                >
                  Create
                </Link>
                <Link
                  href="/my-blogs"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-xl hover:bg-green-500 hover:scale-105 transition-transform duration-300 ease-in-out transform w-full sm:w-auto"
                >
                  My Blogs
                </Link>
                <Link
                  href="/profile"
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-xl hover:bg-yellow-400 hover:scale-105 transition-transform duration-300 ease-in-out transform w-full sm:w-auto"
                >
                  Profile
                </Link>
              </>
            ) : (
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out transform w-full sm:w-auto"
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto py-16 px-6 sm:px-8 text-center">
        {/* Latest Blogs Heading */}
        <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 tracking-wide drop-shadow-lg">
          Discover the Latest Blogs
        </h2>

        {/* Description Text */}
        <p className="text-white text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed opacity-90">
          Stay ahead of the curve with insights, trends, and stories from expert
          bloggers. Get inspired, stay informed, and discover new perspectives
          on topics that matter.
        </p>

        {/* Search Bar Section */}
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
      </main>
    </div>
  );
};

export default Header;
