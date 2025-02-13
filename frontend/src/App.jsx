import { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { ClipboardCopy, Check } from "lucide-react"; // Copy icon
import "./index.css"; // Tailwind CSS file

function App() {
  const [code, setCode] = useState('print("Hello World")');
  const [review, setReview] = useState("");
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
  };

  return (
    <main className="h-screen w-full p-6 flex flex-col md:flex-row gap-4 bg-gray-900 text-white">
      {/* Left Section */}
      <div className="flex-1 bg-black p-4 rounded-lg relative flex flex-col">
        {/* Code Editor */}
        <div className="relative flex-1 overflow-auto border border-gray-700 rounded-lg">
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
              minHeight: "6000px",
              maxHeight: "7000px",
              overflowY: "auto",
              borderRadius: "10px",
            }}
          />
          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"
          >
            {copied ? <Check size={20} color="lime" /> : <ClipboardCopy size={20} />}
          </button>
        </div>

        {/* Review Button */}
        <button
          onClick={reviewCode}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg"
        >
          Review Code
        </button>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-gray-800 p-4 rounded-lg overflow-auto">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
