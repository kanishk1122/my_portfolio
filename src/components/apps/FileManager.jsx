import React, { useState } from "react";
import { motion } from "framer-motion";

const FileManager = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const folders = [
    { name: "Documents", type: "folder", size: "—", modified: "2024-01-15" },
    { name: "Pictures", type: "folder", size: "—", modified: "2024-01-14" },
    { name: "Downloads", type: "folder", size: "—", modified: "2024-01-13" },
    { name: "Projects", type: "folder", size: "—", modified: "2024-01-12" },
    { name: "Music", type: "folder", size: "—", modified: "2024-01-11" },
  ];

  const files = [
    { name: "resume.pdf", type: "pdf", size: "245 KB", modified: "2024-01-10" },
    {
      name: "portfolio.zip",
      type: "archive",
      size: "15.3 MB",
      modified: "2024-01-09",
    },
    {
      name: "profile.jpg",
      type: "image",
      size: "2.1 MB",
      modified: "2024-01-08",
    },
    { name: "notes.txt", type: "text", size: "1.2 KB", modified: "2024-01-07" },
    {
      name: "presentation.pptx",
      type: "presentation",
      size: "8.7 MB",
      modified: "2024-01-06",
    },
  ];

  const getIcon = (type) => {
    const icons = {
      folder: "📁",
      pdf: "📄",
      archive: "📦",
      image: "🖼️",
      text: "📝",
      presentation: "📊",
    };
    return icons[type] || "📄";
  };

  const formatSize = (size) => {
    return size === "—" ? size : size;
  };

  const allItems = [...folders, ...files];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <motion.button
                className="p-2 hover:bg-gray-100 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ← Back
              </motion.button>
              <motion.button
                className="p-2 hover:bg-gray-100 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                → Forward
              </motion.button>
            </div>
            <div className="text-sm text-gray-600">{currentPath}</div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ⚏
            </motion.button>
            <motion.button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ☰
            </motion.button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 bg-white border-r border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Quick Access
          </h3>
          <nav className="space-y-1">
            {["Desktop", "Documents", "Downloads", "Pictures", "Music"].map(
              (item) => (
                <motion.button
                  key={item}
                  className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                </motion.button>
              )
            )}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-4 gap-4">
              {allItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{getIcon(item.type)}</div>
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatSize(item.size)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                      Size
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                      Modified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allItems.map((item, index) => (
                    <motion.tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className="mr-3 text-lg">
                            {getIcon(item.type)}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatSize(item.size)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {item.modified}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileManager;
