import { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./index.css"; // Tailwind will be used instead of App.css

function App() {
  const [code, setCode] = useState('print("Hello World")');
  const [review, setReview] = useState("");

  async function reviewCode() {
    try {
      const response = await axios.post(
        "https://aicodereviewer.onrender.com/ai/get-review",
        { code }
      );
      setReview(response.data.review);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to get review. Check server logs.");
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row p-4 bg-gray-900 text-white">
      {/* Left Side: Code Editor */}
      <div className="flex flex-col md:w-1/2 w-full h-full bg-black rounded-xl p-4 relative">
        <div className="flex-1 overflow-auto border border-gray-700 rounded-lg p-2">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              minHeight: "300px",
            }}
          />
        </div>
        <button
          onClick={reviewCode}
          className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Review
        </button>
      </div>

      {/* Right Side: Review Output */}
      <div className="md:w-1/2 w-full h-full bg-gray-800 rounded-xl p-4 overflow-auto">
        <h2 className="text-lg font-bold mb-2">Code Review</h2>
        <Markdown rehypePlugins={[rehypeHighlight]} className="prose">
          {review}
        </Markdown>
      </div>
    </div>
  );
}

export default App;
