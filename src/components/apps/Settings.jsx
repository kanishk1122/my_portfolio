import React, { useState } from "react";
import { motion } from "framer-motion";

const Settings = ({ wallpaper, setWallpaper, wallpapers }) => {
  const [activeTab, setActiveTab] = useState("appearance");
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);
  const [notifications, setNotifications] = useState(true);

  const tabs = [
    { id: "appearance", name: "Appearance", icon: "🎨" },
    { id: "system", name: "System", icon: "⚙️" },
    { id: "privacy", name: "Privacy", icon: "🔒" },
    { id: "about", name: "About", icon: "ℹ️" },
  ];

  const wallpaperNames = {
    mountain: "Mountain Vista",
    ocean: "Ocean Blue",
    forest: "Forest Green",
    desert: "Desert Sunset",
    space: "Deep Space",
  };

  const handleWallpaperChange = (wallpaperKey) => {
    if (setWallpaper) {
      setWallpaper(wallpaperKey);
    }
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.name}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {activeTab === "appearance" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Appearance
            </h3>

            {/* Wallpaper Selection */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-700 mb-4">
                Wallpaper
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {wallpapers &&
                  Object.entries(wallpapers).map(([key, value]) => (
                    <motion.div
                      key={key}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                        wallpaper === key
                          ? "border-blue-500 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleWallpaperChange(key)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className="w-full h-24 bg-cover bg-center"
                        style={{ backgroundImage: value }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 backdrop-blur-sm">
                        {wallpaperNames[key]}
                      </div>
                      {wallpaper === key && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                          ✓
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Theme Settings */}
            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-lg font-medium text-gray-700 mb-4">Theme</h4>
              <div className="space-y-3">
                <label className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    defaultChecked
                    className="mr-3 text-blue-600"
                  />
                  <span>Light Mode</span>
                </label>
                <label className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    className="mr-3 text-blue-600"
                  />
                  <span>Dark Mode</span>
                </label>
                <label className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="auto"
                    className="mr-3 text-blue-600"
                  />
                  <span>Auto (System)</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">System</h3>

            {/* Volume Control */}
            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-lg font-medium text-gray-700 mb-3">Audio</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Volume: {volume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-lg font-medium text-gray-700 mb-3">
                Display
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Brightness: {brightness}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-lg font-medium text-gray-700 mb-3">
                Notifications
              </h4>
              <label className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="mr-3 text-blue-600"
                />
                <span>Enable notifications</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Privacy
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">
                  Data Collection
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Control what data is collected and how it's used.
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Manage Data
                </button>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Cookies</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Manage cookie preferences and tracking.
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Cookie Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">About</h3>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl font-bold">KS</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Kanishk's Desktop OS
                </h4>
                <p className="text-gray-600">Version 1.0.0</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Developer:</span>
                  <span className="text-gray-800">Kanishk Soni</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Built with:</span>
                  <span className="text-gray-800">React & Framer Motion</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">GitHub:</span>
                  <a
                    href="https://github.com/kanishk1122"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    @kanishk1122
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
