"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { PROVINCES, LANGUAGES } from "@/lib/constants"

// Professional SVG Icons
const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
)

const features = [
    { title: "Zero Queue", description: "Skip waiting rooms with smart scheduling" },
    { title: "Pre-Visit Updates", description: "Share symptoms before you arrive" },
    { title: "Real-time Tracking", description: "Know your exact position in queue" },
    { title: "Multilingual", description: "Available in all SA languages" },
]

export default function GetStartedPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    // Form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        idNumber: "",
        province: "Gauteng",
        language: "English",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push("/patient")
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Features */}
            <div className="hidden lg:flex lg:w-1/2 gradient-primary p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-white">NoShowIQ</span>
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4">
                        Healthcare Made Simple
                    </h1>
                    <p className="text-white/80 text-lg mb-12">
                        Join thousands of South Africans enjoying stress-free hospital visits.
                    </p>

                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="flex items-start gap-4 animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
                                    <CheckIcon />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{feature.title}</h3>
                                    <p className="text-white/70 text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-white/60 text-sm relative z-10">
                    © 2024 NoShowIQ. Made with care in South Africa 🇿🇦
                </p>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="text-center mb-8 lg:hidden">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl gradient-primary flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold">NoShowIQ</h1>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center justify-between mb-8">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center flex-1">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${s <= step
                                        ? "bg-primary text-white"
                                        : "bg-accent text-muted-foreground"
                                        }`}
                                >
                                    {s < step ? <CheckIcon /> : s}
                                </div>
                                {s < 3 && (
                                    <div className={`flex-1 h-1 mx-2 rounded ${s < step ? "bg-primary" : "bg-accent"}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    <Card className="glass-card">
                        {step === 1 && (
                            <>
                                <CardHeader>
                                    <CardTitle className="text-foreground">Personal Information</CardTitle>
                                    <CardDescription>Tell us about yourself</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-foreground">First Name</Label>
                                            <Input
                                                placeholder="Thabo"
                                                value={formData.firstName}
                                                onChange={(e) => handleChange("firstName", e.target.value)}
                                                className="bg-background text-foreground"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-foreground">Last Name</Label>
                                            <Input
                                                placeholder="Mokoena"
                                                value={formData.lastName}
                                                onChange={(e) => handleChange("lastName", e.target.value)}
                                                className="bg-background text-foreground"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-foreground">SA ID Number</Label>
                                        <Input
                                            placeholder="9501015800087"
                                            value={formData.idNumber}
                                            onChange={(e) => handleChange("idNumber", e.target.value)}
                                            className="bg-background text-foreground"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-foreground">Province</Label>
                                            <Select
                                                value={formData.province}
                                                onChange={(e) => handleChange("province", e.target.value)}
                                                className="bg-background text-foreground"
                                            >
                                                {PROVINCES.map(p => (
                                                    <option key={p.value} value={p.value}>{p.label}</option>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-foreground">Language</Label>
                                            <Select
                                                value={formData.language}
                                                onChange={(e) => handleChange("language", e.target.value)}
                                                className="bg-background text-foreground"
                                            >
                                                {LANGUAGES.map(l => (
                                                    <option key={l.value} value={l.value}>{l.label}</option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <Button className="w-full" onClick={() => setStep(2)}>
                                        Continue
                                    </Button>
                                </CardContent>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <CardHeader>
                                    <CardTitle className="text-foreground">Contact Details</CardTitle>
                                    <CardDescription>How can we reach you?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-foreground">Email Address</Label>
                                        <Input
                                            type="email"
                                            placeholder="thabo@email.co.za"
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            className="bg-background text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-foreground">Phone Number</Label>
                                        <Input
                                            type="tel"
                                            placeholder="071 234 5678"
                                            value={formData.phone}
                                            onChange={(e) => handleChange("phone", e.target.value)}
                                            className="bg-background text-foreground"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <Button className="bg-transparent border border-input hover:bg-accent text-foreground" onClick={() => setStep(1)}>
                                            Back
                                        </Button>
                                        <Button className="flex-1" onClick={() => setStep(3)}>
                                            Continue
                                        </Button>
                                    </div>
                                </CardContent>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <CardHeader>
                                    <CardTitle className="text-foreground">Create Password</CardTitle>
                                    <CardDescription>Secure your account</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-foreground">Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Create a strong password"
                                            value={formData.password}
                                            onChange={(e) => handleChange("password", e.target.value)}
                                            className="bg-background text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-foreground">Confirm Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                            className="bg-background text-foreground"
                                        />
                                    </div>

                                    <div className="p-4 rounded-lg bg-accent space-y-2">
                                        <p className="text-sm font-medium text-foreground">Password must have:</p>
                                        <ul className="text-xs text-muted-foreground space-y-1">
                                            <li className="flex items-center gap-2">
                                                <CheckIcon /> At least 8 characters
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckIcon /> One uppercase letter
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckIcon /> One number
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            className="mt-1 w-4 h-4 rounded border-input"
                                        />
                                        <label htmlFor="terms" className="text-sm text-muted-foreground">
                                            I agree to the{" "}
                                            <Link href="/privacy" className="text-primary hover:underline">
                                                Privacy Policy
                                            </Link>{" "}
                                            and{" "}
                                            <Link href="/terms" className="text-primary hover:underline">
                                                Terms of Service
                                            </Link>
                                        </label>
                                    </div>

                                    <div className="text-center">
                                        <Link href="/learn-more" className="text-sm text-primary hover:underline font-medium">
                                            Learn more about NoShowIQ →
                                        </Link>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button className="bg-transparent border border-input hover:bg-accent text-foreground" onClick={() => setStep(2)}>
                                            Back
                                        </Button>
                                        <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
                                            {loading ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Creating Account...
                                                </span>
                                            ) : (
                                                "Create Account"
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </>
                        )}
                    </Card>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
