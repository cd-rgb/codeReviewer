import { useState, useRef, useEffect } from "react";
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
  const editorRef = useRef(null); // Reference for Editor container

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.querySelector("textarea")?.focus(); // Focus on the textarea inside Editor
    }
  }, [code]); // Re-focus after pasting

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
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    setCode((prevCode) => prevCode + "\n" + pastedText);

    setTimeout(() => {
      editorRef.current?.querySelector("textarea")?.focus(); // Ensure focus after pasting
    }, 100);
  };

  return (
    <main className="h-screen w-full p-6 flex flex-col md:flex-row gap-4 bg-gray-900 text-white">
      {/* Left Section (Code Input) */}
      <div className="flex-1 bg-black p-4 rounded-lg relative flex flex-col">
        <div
          ref={editorRef} // Attach ref to the outer div
          className="relative flex-1 overflow-auto border border-gray-700 rounded-lg"
        >
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            onPaste={handlePaste}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              minHeight: "300px",
              maxHeight: "700px",
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

      {/* Right Section (Review Output) */}
      <div className="flex-1 bg-gray-800 p-4 rounded-lg overflow-auto">
        <Markdown rehypePlugins={[rehypeHighlight]} className="prose max-w-full">
          {review}
        </Markdown>
      </div>
    </main>
  );
}

export default App;
