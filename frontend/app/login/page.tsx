"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Professional SVG Icons
const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
)

const LockIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
)

const EyeIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
)

const EyeSlashIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
)

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [role, setRole] = useState<"patient" | "staff">("patient")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock authentication
        if (email && password) {
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("userRole", role)

            // Redirect based on role to ensure they land in the app (with sidebar)
            if (role === "patient") {
                router.push("/patient")
            } else {
                router.push("/dashboard")
            }
        } else {
            setError("Please enter your credentials")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold">NoShowIQ</h1>
                    <p className="text-muted-foreground">Hospital Management System</p>
                </div>

                {/* Login Card */}
                <Card className="glass-card animate-slide-up">
                    <CardHeader className="text-center">
                        <CardTitle>Welcome Back</CardTitle>
                        <CardDescription>Sign in to your account</CardDescription>
                    </CardHeader>

                    <CardContent>
                        {/* Role Toggle */}
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setRole("patient")}
                                className={`flex-1 py-2 px-4 rounded-lg border-2 text-sm font-medium transition-all ${role === "patient"
                                    ? "border-primary text-primary bg-primary/10"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    }`}
                            >
                                Patient
                            </button>
                            <button
                                onClick={() => setRole("staff")}
                                className={`flex-1 py-2 px-4 rounded-lg border-2 text-sm font-medium transition-all ${role === "staff"
                                    ? "border-primary text-primary bg-primary/10"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    }`}
                            >
                                Medical Staff
                            </button>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <UserIcon />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={role === "patient" ? "patient@email.co.za" : "doctor@hospital.co.za"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-background text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <LockIcon />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10 bg-background text-foreground"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                                    <span className="text-muted-foreground">Remember me</span>
                                </label>
                                <a href="#" className="text-primary hover:underline">Forgot password?</a>
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>

                        <p className="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/get-started" className="text-primary font-medium hover:underline">
                                Get Started
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 rounded-lg border border-border bg-card shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">🔑</span>
                        <h3 className="font-semibold text-sm">Demo Credentials</h3>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Patient Login</span>
                                <code className="text-xs font-mono mt-1 select-all">patient@noshowiq.co.za</code>
                            </div>
                            <Button
                                type="button"
                                className="h-8 px-3 text-xs bg-background hover:bg-accent border border-input text-foreground"
                                onClick={() => {
                                    setRole("patient");
                                    setEmail("patient@noshowiq.co.za");
                                    setPassword("Patient123!");
                                }}
                            >
                                Fill
                            </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Medical Staff</span>
                                <code className="text-xs font-mono mt-1 select-all">staff@noshowiq.co.za</code>
                            </div>
                            <Button
                                type="button"
                                className="h-8 px-3 text-xs bg-background hover:bg-accent border border-input text-foreground"
                                onClick={() => {
                                    setRole("staff");
                                    setEmail("staff@noshowiq.co.za");
                                    setPassword("Staff123!");
                                }}
                            >
                                Fill
                            </Button>
                        </div>

                        <p className="text-[10px] text-center text-muted-foreground">
                            Password: Any value works in demo mode (e.g. "123456")
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-muted-foreground mt-6 animate-fade-in">
                    © 2024 NoShowIQ. Made with care in South Africa 🇿🇦
                </p>
            </div>
        </div>
    )
}
