import { useEffect, useState } from "react";

const THEME_KEY = "theme_mode";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(typeof window !== "undefined" && localStorage.getItem(THEME_KEY) === "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
  }, [dark]);

  return (
    <button onClick={() => setDark((v) => !v)} className="px-3 py-1 rounded-xl bg-white/95 text-gray-800 shadow hover:bg-white dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
