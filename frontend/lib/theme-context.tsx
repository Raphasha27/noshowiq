"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    resolvedTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("dark")
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark")

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null
        if (stored) {
            setThemeState(stored)
        }
    }, [])

    useEffect(() => {
        const root = window.document.documentElement

        const applyTheme = (newTheme: Theme) => {
            let resolved: "light" | "dark" = "light"

            if (newTheme === "system") {
                resolved = window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
            } else {
                resolved = newTheme
            }

            root.classList.remove("light", "dark")
            root.classList.add(resolved)
            setResolvedTheme(resolved)
        }

        applyTheme(theme)

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = () => {
            if (theme === "system") {
                applyTheme("system")
            }
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [theme])

    const setTheme = (newTheme: Theme) => {
        localStorage.setItem("theme", newTheme)
        setThemeState(newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}
