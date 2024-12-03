"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">Blogamon</h3>
          <p className="text-gray-400 text-center md:text-left max-w-xs">
            Stay informed and inspired with the latest blogs, ideas, and
            insights from our community. Join us and share your thoughts!
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-blue-500 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/create"
                className="hover:text-blue-500 transition duration-300"
              >
                Create
              </a>
            </li>
            <li>
              <a
                href="/my-blogs"
                className="hover:text-blue-500 transition duration-300"
              >
                My Blogs
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-blue-500 transition duration-300"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-gray-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
        <p>&copy; 2024 Blogamon. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
