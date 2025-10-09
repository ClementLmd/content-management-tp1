"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldBeDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Update localStorage
    localStorage.setItem("theme", newIsDark ? "dark" : "light");

    // Update DOM
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="p-3 rounded-xl bg-gray-100 text-gray-700">
        <Moon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="p-3 rounded-xl transition-all hover:scale-110 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 cursor-pointer"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
