"use client"

import { useTheme } from "@/lib/theme-context"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()

    const cycleTheme = () => {
        const themes: Array<"light" | "dark" | "system"> = ["light", "dark", "system"]
        const currentIndex = themes.indexOf(theme)
        const nextTheme = themes[(currentIndex + 1) % themes.length]
        setTheme(nextTheme)
    }

    return (
        <button
            onClick={cycleTheme}
            className="relative p-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all duration-200 focus-ring"
            title={`Current: ${theme} (${resolvedTheme})`}
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <svg
                    className={`absolute inset-0 transition-all duration-300 ${resolvedTheme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
                {/* Moon Icon */}
                <svg
                    className={`absolute inset-0 transition-all duration-300 ${resolvedTheme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            </div>
            {theme === "system" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
        </button>
    )
}
