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
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [helpRequest, setHelpRequest] = useState("");
  const [generatedHelp, setGeneratedHelp] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signup");
    }
  }, [router]);

  const handleTitleSelect = (selectedTitle) => setTitle(selectedTitle);

  const generateTitle = async (brief) => {
    try {
      const { data, status } = await axios.post("/api/generate-title", {
        brief,
      });
      if (status === 200) {
        setGeneratedTitle(data.title);
      } else {
        setGeneratedTitle("Failed to generate title");
      }
    } catch (error) {
      console.error("Error generating title:", error);
      setGeneratedTitle("Failed to generate title");
    }
  };

  const generateHelp = async () => {
    if (!helpRequest.trim()) {
      alert("Please provide a valid help request.");
      return;
    }

    try {
      const { data, status } = await axios.post("/api/generate-help", {
        helpRequest,
      });
      if (status === 200) {
        setGeneratedHelp(data.suggestion);
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
      const { status } = await axios.post(
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (status === 201) {
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
          <InputField
            label="Blog Title"
            value={title}
            onChange={setTitle}
            placeholder="Enter your blog title"
            required
          />
          <TitleSuggestions
            suggestions={generatedTitles}
            onSelect={handleTitleSelect}
            onGenerate={() => generateTitle(title)}
            generatedTitle={generatedTitle}
          />
          <InputField
            label="Author"
            value={author}
            onChange={setAuthor}
            placeholder="Enter the author name"
            required
          />
          <InputField
            label="Image URL"
            value={image}
            onChange={setImage}
            placeholder="Enter image URL"
            required
          />
          <InputField
            label="Tags"
            value={tags}
            onChange={setTags}
            placeholder="Enter tags separated by commas"
          />
          <TextareaField
            label="Content"
            value={content}
            onChange={setContent}
            placeholder="Write your blog content here..."
            required
          />
          <CheckboxField
            label="Publish"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <HelpSection
            value={helpRequest}
            onChange={setHelpRequest}
            onGenerate={generateHelp}
            generatedHelp={generatedHelp}
          />
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

// Reusable Components
const InputField = ({ label, value, onChange, placeholder, required }) => (
  <div>
    <label className="block text-xl font-semibold text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-2 bg-gray-100 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const TextareaField = ({ label, value, onChange, placeholder, required }) => (
  <div>
    <label className="block text-xl font-semibold text-gray-700">{label}</label>
    <textarea
      rows="8"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-2 bg-gray-100 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      required={required}
    ></textarea>
  </div>
);

const CheckboxField = ({ label, checked, onChange }) => (
  <div className="flex items-center gap-4">
    <label className="text-xl font-semibold text-gray-700">{label}</label>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-6 w-6"
    />
  </div>
);

const TitleSuggestions = ({
  suggestions,
  onSelect,
  onGenerate,
  generatedTitle,
}) => (
  <div>
    <p className="text-lg font-medium text-gray-700">Suggested Titles</p>
    <ul className="space-y-2 mt-2">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSelect(suggestion)}
          className="cursor-pointer text-blue-600 hover:underline"
        >
          {suggestion}
        </li>
      ))}
    </ul>
    <button
      type="button"
      onClick={onGenerate}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
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
);

const HelpSection = ({ value, onChange, onGenerate, generatedHelp }) => (
  <div className="mt-8">
    <TextareaField
      label="Need Help? (Optional)"
      value={value}
      onChange={onChange}
      placeholder="Describe what help you need..."
    />
    <button
      type="button"
      onClick={onGenerate}
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
);

export default CreateBlog;
