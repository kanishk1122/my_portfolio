import React, { useState } from "react";
import { motion } from "framer-motion";

const Browser = () => {
  const [url, setUrl] = useState("https://www.google.com/webhp?igu=1");
  const [currentUrl, setCurrentUrl] = useState(
    "https://www.google.com/webhp?igu=1"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([
    "https://www.google.com/webhp?igu=1",
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);

    let targetUrl = url.trim();

    // Check if it's a search query or URL
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      if (targetUrl.includes(".") && !targetUrl.includes(" ")) {
        targetUrl = `https://${targetUrl}`;
      } else {
        targetUrl = `https://www.google.com/search?q=${encodeURIComponent(
          targetUrl
        )}&igu=1`;
      }
    }

    setCurrentUrl(targetUrl);

    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(targetUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setTimeout(() => setIsLoading(false), 1500);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setUrl(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setUrl(history[newIndex]);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const bookmarks = [
    { name: "Google", url: "https://www.google.com/webhp?igu=1" },
    { name: "GitHub", url: "https://github.com" },
    { name: "Stack Overflow", url: "https://stackoverflow.com" },
    { name: "MDN", url: "https://developer.mozilla.org" },
    { name: "YouTube", url: "https://www.youtube.com" },
    { name: "Wikipedia", url: "https://www.wikipedia.org" },
  ];

  const handleBookmarkClick = (bookmarkUrl) => {
    setUrl(bookmarkUrl);
    setCurrentUrl(bookmarkUrl);
    setIsLoading(true);

    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(bookmarkUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Browser Controls */}
      <div className="bg-gray-100 p-3 border-b flex items-center space-x-3 shadow-sm">
        <div className="flex space-x-2">
          <motion.button
            className={`w-8 h-8 rounded-full text-gray-600 text-sm font-bold flex items-center justify-center ${
              historyIndex > 0
                ? "bg-gray-300 hover:bg-gray-400"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={goBack}
            disabled={historyIndex <= 0}
            whileHover={historyIndex > 0 ? { scale: 1.1 } : {}}
            whileTap={historyIndex > 0 ? { scale: 0.9 } : {}}
          >
            ←
          </motion.button>
          <motion.button
            className={`w-8 h-8 rounded-full text-gray-600 text-sm font-bold flex items-center justify-center ${
              historyIndex < history.length - 1
                ? "bg-gray-300 hover:bg-gray-400"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            whileHover={historyIndex < history.length - 1 ? { scale: 1.1 } : {}}
            whileTap={historyIndex < history.length - 1 ? { scale: 0.9 } : {}}
          >
            →
          </motion.button>
          <motion.button
            className="w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-600 text-sm font-bold flex items-center justify-center"
            onClick={refresh}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ⟳
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter URL or search..."
          />
        </form>
      </div>

      {/* Bookmarks Bar */}
      <div className="bg-gray-50 p-2 border-b flex space-x-2 overflow-x-auto">
        {bookmarks.map((bookmark) => (
          <motion.button
            key={bookmark.name}
            onClick={() => handleBookmarkClick(bookmark.url)}
            className="px-3 py-1 text-sm bg-white hover:bg-gray-100 rounded-md border border-gray-200 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {bookmark.name}
          </motion.button>
        ))}
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
            <motion.div
              className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        <iframe
          src={currentUrl}
          className="w-full h-full border-none"
          title="Browser Content"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default Browser;
