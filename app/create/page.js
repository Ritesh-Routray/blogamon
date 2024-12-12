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
  const [generatedTitles, setGeneratedTitles] = useState([
    "How to Improve Your Web Development Skills",
    "Understanding JavaScript in 2024",
    "Top 10 Tools for Web Developers",
    "Best Practices for Writing Clean Code",
    "A Beginner's Guide to React.js",
  ]);
  const [generatedTitle, setGeneratedTitle] = useState(""); // State to hold generated title
  const [helpRequest, setHelpRequest] = useState(""); // State to hold help request
  const [generatedHelp, setGeneratedHelp] = useState(""); // State to hold generated help suggestions
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signup"); // Redirect to signup if not logged in
    }
  }, []);

  const handleTitleSelect = (selectedTitle) => {
    setTitle(selectedTitle);
  };

  const generateTitle = async (brief) => {
    try {
      const response = await axios.post("/api/generate-title", { brief });
      if (response.status === 200) {
        setGeneratedTitle(response.data.title); // Set the generated title from API
      } else {
        setGeneratedTitle("Failed to generate title");
      }
    } catch (error) {
      console.error("Error generating title:", error);
      setGeneratedTitle("Failed to generate title");
    }
  };

  const generateHelp = async () => {
    try {
      const response = await axios.post("/api/generate-help", { helpRequest });
      if (response.status === 200) {
        setGeneratedHelp(response.data.suggestion); // Set the generated help suggestion from API
      } else {
        setGeneratedHelp("Failed to generate help suggestions");
      }
    } catch (error) {
      console.error("Error generating help:", error);
      setGeneratedHelp("Failed to generate help suggestions");
    }
  };

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
      <div className="container mx-auto max-w-3xl bg-white p-10 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Create a New Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="title"
              className="block text-xl font-semibold text-gray-700"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your blog title"
              required
            />
            <div className="mt-4">
              <p className="text-lg font-medium text-gray-700">
                Suggested Titles
              </p>
              <ul className="space-y-2 mt-2">
                {generatedTitles.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleTitleSelect(suggestion)}
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => generateTitle(title)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Generate Title
              </button>
              {generatedTitle && (
                <div className="mt-4 p-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                  <p className="font-medium text-lg">Generated Title:</p>
                  <p className="text-xl text-gray-700">{generatedTitle}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-xl font-semibold text-gray-700"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the author name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-xl font-semibold text-gray-700"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-xl font-semibold text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div>
            <label className="block text-xl font-semibold text-gray-700">
              Content
            </label>
            <textarea
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your blog content here..."
              required
            ></textarea>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-xl font-semibold text-gray-700">
              Publish
            </label>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-6 w-6"
            />
          </div>

          {/* Get Help Section */}
          <div className="mt-8">
            <label className="block text-xl font-semibold text-gray-700">
              Need Help? (Optional)
            </label>
            <textarea
              rows="4"
              value={helpRequest}
              onChange={(e) => setHelpRequest(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe what help you need..."
            ></textarea>
            <button
              type="button"
              onClick={generateHelp}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Get Help
            </button>
            {generatedHelp && (
              <div className="mt-4 p-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <p className="font-medium text-lg">Suggested Help:</p>
                <p className="text-xl text-gray-700">{generatedHelp}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
