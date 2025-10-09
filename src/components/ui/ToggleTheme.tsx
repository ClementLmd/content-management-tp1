"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		try {
			const stored = localStorage.getItem("theme");
			if (stored === "dark") {
				setIsDark(true);
				document.documentElement.setAttribute("data-theme", "dark");
			} else if (stored === "light") {
				setIsDark(false);
				document.documentElement.removeAttribute("data-theme");
			} else {
				const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
				setIsDark(prefersDark);
				if (prefersDark) document.documentElement.setAttribute("data-theme", "dark");
			}
		} catch (e) {
			// ignore
		}
	}, []);

	const toggle = () => {
		const next = !isDark;
		setIsDark(next);
		try {
			if (next) {
				document.documentElement.setAttribute("data-theme", "dark");
				localStorage.setItem("theme", "dark");
			} else {
				document.documentElement.removeAttribute("data-theme");
				localStorage.setItem("theme", "light");
			}
		} catch (e) {}
	};

	return (
		<button
			onClick={toggle}
			className={`p-3 rounded-xl transition-all hover:scale-110 ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
			aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
		>
			{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
		</button>
	);
}