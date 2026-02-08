"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { PROVINCES, LANGUAGES } from "@/lib/constants"

// Professional SVG Icons
const QrCodeIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
    </svg>
)

const ClipboardIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
)

const CameraIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
)

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
)

export default function PatientPage() {
    const router = useRouter()
    const [mode, setMode] = useState<"select" | "scan" | "manual" | "success">("select")
    const [loading, setLoading] = useState(false)
    const [scanning, setScanning] = useState(false)

    // Form data
    const [formData, setFormData] = useState({
        name: "",
        idNumber: "",
        province: "Gauteng",
        language: "English",
        symptoms: "",
        needsAssistance: false,
    })

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleScan = () => {
        setScanning(true)
        setTimeout(() => {
            setScanning(false)
            setFormData({
                name: "Thabo Mokoena",
                idNumber: "9501015800087",
                province: "Gauteng",
                language: "English",
                symptoms: "",
                needsAssistance: false,
            })
            setMode("manual")
        }, 2000)
    }

    const handleSubmit = async () => {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setMode("success")
        setLoading(false)
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-3xl font-bold text-foreground">Patient Check-in</h1>
                    <p className="text-muted-foreground">Quick and easy hospital registration</p>
                </div>

                {/* Mode Selection */}
                {mode === "select" && (
                    <div className="space-y-4 animate-slide-up">
                        <Card
                            className="glass-card cursor-pointer hover:border-primary transition-all group"
                            onClick={() => setMode("scan")}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <QrCodeIcon />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-foreground">Scan QR Code</h3>
                                        <p className="text-sm text-muted-foreground">Quick check-in with your appointment QR</p>
                                    </div>
                                    <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </CardContent>
                        </Card>

                        <Card
                            className="glass-card cursor-pointer hover:border-primary transition-all group"
                            onClick={() => setMode("manual")}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                                        <ClipboardIcon />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-foreground">Manual Entry</h3>
                                        <p className="text-sm text-muted-foreground">Fill in your details manually</p>
                                    </div>
                                    <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </CardContent>
                        </Card>

                        <p className="text-center text-sm text-muted-foreground">
                            Don't have an account? <a href="/get-started" className="text-primary hover:underline">Register here</a>
                        </p>
                    </div>
                )}

                {/* QR Scanner */}
                {mode === "scan" && (
                    <Card className="glass-card animate-slide-up">
                        <CardHeader className="text-center">
                            <CardTitle className="text-foreground">Scan Your QR Code</CardTitle>
                            <CardDescription>Point your camera at the appointment QR code</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="aspect-square max-w-xs mx-auto rounded-2xl bg-black/90 relative overflow-hidden">
                                {scanning ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-48 h-48 border-4 border-primary rounded-lg relative">
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-primary animate-pulse"
                                                style={{ animation: "scan 2s linear infinite" }} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70">
                                        <CameraIcon />
                                        <p className="text-sm mt-2">Camera preview</p>
                                    </div>
                                )}
                                {/* Scanner overlay corners */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg" />
                                <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg" />
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg" />
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg" />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    className="flex-1 bg-transparent border border-input hover:bg-accent text-foreground"
                                    onClick={() => setMode("select")}
                                >
                                    Back
                                </Button>
                                <Button className="flex-1" onClick={handleScan} disabled={scanning}>
                                    {scanning ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Scanning...
                                        </span>
                                    ) : (
                                        <>
                                            <CameraIcon />
                                            <span className="ml-2">Start Scan</span>
                                        </>
                                    )}
                                </Button>
                            </div>

                            <button
                                className="w-full text-center text-sm text-primary hover:underline"
                                onClick={() => setMode("manual")}
                            >
                                Enter details manually instead
                            </button>
                        </CardContent>
                    </Card>
                )}

                {/* Manual Entry Form */}
                {mode === "manual" && (
                    <Card className="glass-card animate-slide-up">
                        <CardHeader>
                            <CardTitle className="text-foreground">Your Details</CardTitle>
                            <CardDescription>Please fill in your information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-foreground">Full Name</Label>
                                <Input
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    className="bg-background text-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-foreground">SA ID Number</Label>
                                <Input
                                    placeholder="13 digit ID number"
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

                            <div className="space-y-2">
                                <Label className="text-foreground">Symptoms (Optional)</Label>
                                <textarea
                                    placeholder="Describe any symptoms..."
                                    value={formData.symptoms}
                                    onChange={(e) => handleChange("symptoms", e.target.value)}
                                    className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <label className="flex items-center gap-3 p-4 rounded-lg bg-accent/50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.needsAssistance}
                                    onChange={(e) => handleChange("needsAssistance", e.target.checked)}
                                    className="w-5 h-5 accent-primary"
                                />
                                <div>
                                    <p className="font-medium text-foreground">I need assistance</p>
                                    <p className="text-sm text-muted-foreground">Wheelchair, visual, or hearing support</p>
                                </div>
                            </label>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    className="bg-transparent border border-input hover:bg-accent text-foreground"
                                    onClick={() => setMode("select")}
                                >
                                    Back
                                </Button>
                                <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Checking in...
                                        </span>
                                    ) : (
                                        "Check In"
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Success State */}
                {mode === "success" && (
                    <Card className="glass-card animate-slide-up text-center">
                        <CardContent className="p-8">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-foreground mb-2">Check-in Complete!</h2>
                            <p className="text-muted-foreground mb-6">
                                You're now in the queue. We'll notify you when it's your turn.
                            </p>

                            <div className="p-4 rounded-xl bg-primary/10 mb-6">
                                <p className="text-sm text-muted-foreground">Your Queue Number</p>
                                <p className="text-4xl font-bold text-primary">A-042</p>
                                <p className="text-sm text-muted-foreground mt-1">Estimated wait: ~15 minutes</p>
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full" onClick={() => router.push("/dashboard")}>
                                    View Queue Status
                                </Button>
                                <Button
                                    className="w-full bg-transparent border border-input hover:bg-accent text-foreground"
                                    onClick={() => setMode("select")}
                                >
                                    New Check-in
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Scanning animation styles */}
            <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(180px); }
          100% { transform: translateY(0); }
        }
      `}</style>
        </div>
    )
}
