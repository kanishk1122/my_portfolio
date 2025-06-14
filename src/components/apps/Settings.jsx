import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Settings = ({ wallpaper, setWallpaper, wallpapers }) => {
  const [activeTab, setActiveTab] = useState("appearance");
  const [volume, setVolume] = useState(() => {
    return parseInt(localStorage.getItem("volume") || "50");
  });
  const [brightness, setBrightness] = useState(() => {
    return parseInt(localStorage.getItem("brightness") || "75");
  });
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("notifications") !== "false";
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("fontSize") || "medium";
  });

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply brightness changes
  useEffect(() => {
    const brightnessOverlay =
      document.getElementById("brightness-overlay") ||
      document.createElement("div");
    brightnessOverlay.id = "brightness-overlay";
    brightnessOverlay.style.position = "fixed";
    brightnessOverlay.style.top = "0";
    brightnessOverlay.style.left = "0";
    brightnessOverlay.style.width = "100%";
    brightnessOverlay.style.height = "100%";
    brightnessOverlay.style.pointerEvents = "none";
    brightnessOverlay.style.zIndex = "9998";
    brightnessOverlay.style.transition = "background-color 0.3s ease";

    const opacity = (100 - brightness) / 200; // Convert to 0-0.5 range
    brightnessOverlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

    if (!document.body.contains(brightnessOverlay)) {
      document.body.appendChild(brightnessOverlay);
    }

    localStorage.setItem("brightness", brightness.toString());
  }, [brightness]);

  // Apply font size changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize =
      fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px";
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  // Save other settings
  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("notifications", notifications.toString());
  }, [notifications]);

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
      localStorage.setItem("wallpaper", wallpaperKey);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const resetSettings = () => {
    setVolume(50);
    setBrightness(75);
    setNotifications(true);
    setTheme("light");
    setFontSize("medium");
    if (setWallpaper) {
      setWallpaper("mountain");
    }

    // Clear localStorage
    localStorage.removeItem("volume");
    localStorage.removeItem("brightness");
    localStorage.removeItem("notifications");
    localStorage.removeItem("theme");
    localStorage.removeItem("fontSize");
    localStorage.removeItem("wallpaper");
  };

  return (
    <div className="h-full flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Settings
        </h2>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
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
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {activeTab === "appearance" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Appearance
            </h3>

            {/* Theme Settings */}
            <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                Theme
              </h4>
              <div className="space-y-3">
                {["light", "dark", "auto"].map((themeOption) => (
                  <label
                    key={themeOption}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={themeOption}
                      checked={theme === themeOption}
                      onChange={(e) => handleThemeChange(e.target.value)}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="capitalize">{themeOption} Mode</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Font Size Settings */}
            <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                Font Size
              </h4>
              <div className="space-y-3">
                {["small", "medium", "large"].map((size) => (
                  <label
                    key={size}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="fontSize"
                      value={size}
                      checked={fontSize === size}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="capitalize">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Wallpaper Selection */}
            {wallpapers && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Wallpaper
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(wallpapers).map(([key, value]) => (
                    <motion.div
                      key={key}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                        wallpaper === key
                          ? "border-blue-500 shadow-lg"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
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
            )}
          </div>
        )}

        {activeTab === "system" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              System
            </h3>

            {/* Volume Control */}
            <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                Audio
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Volume
                    </label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {volume}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                Display
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Brightness
                    </label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {brightness}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                Notifications
              </h4>
              <label className="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span>Enable notifications</span>
              </label>
            </div>

            {/* Reset Settings */}
            <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                Reset
              </h4>
              <button
                onClick={resetSettings}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Reset All Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Privacy
            </h3>
            <div className="space-y-4">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                  Data Collection
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Control what data is collected and how it's used.
                </p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Manage Data
                </button>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                  Cookies
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Manage cookie preferences and tracking.
                </p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Cookie Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              About
            </h3>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl font-bold">KS</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Kanishk's Desktop OS
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Version 1.0.0
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Developer:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    Kanishk Soni
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Built with:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    React & Framer Motion
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    GitHub:
                  </span>
                  <a
                    href="https://github.com/kanishk1122"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
                  >
                    @kanishk1122
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Current Settings:
                  </span>
                  <div className="text-right text-gray-800 dark:text-gray-200">
                    <div>Theme: {theme}</div>
                    <div>Volume: {volume}%</div>
                    <div>Brightness: {brightness}%</div>
                  </div>
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
