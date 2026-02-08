"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { LANGUAGES } from "@/lib/constants"
import { useTheme } from "@/lib/theme-context"

// Professional SVG Icons
const PaletteIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
)

const AccessibilityIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
)

const GlobeIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
)

const BellIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
)

const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
)

const SunIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
)

const MoonIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
)

const ComputerIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
)

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
    <button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 ${enabled ? "bg-primary" : "bg-slate-600"
            }`}
    >
        <span
            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${enabled ? "left-6" : "left-1"
                }`}
        />
    </button>
)

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const [fontSize, setFontSize] = useState("medium")
    const [language, setLanguage] = useState("English")

    // Accessibility
    const [highContrast, setHighContrast] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [screenReader, setScreenReader] = useState(true)

    // Notifications
    const [smsReminders, setSmsReminders] = useState(true)
    const [emailUpdates, setEmailUpdates] = useState(true)
    const [pushNotifs, setPushNotifs] = useState(false)

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground">Customize your experience</p>
                </div>

                <div className="space-y-6 stagger-children">
                    {/* Appearance */}
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <PaletteIcon />
                                </div>
                                <div>
                                    <CardTitle className="text-foreground">Appearance</CardTitle>
                                    <CardDescription>Customize the look and feel</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label className="text-sm font-medium text-foreground mb-3 block">Theme</Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: "light", Icon: SunIcon, label: "Light" },
                                        { value: "dark", Icon: MoonIcon, label: "Dark" },
                                        { value: "system", Icon: ComputerIcon, label: "System" },
                                    ].map(({ value, Icon, label }) => (
                                        <button
                                            key={value}
                                            onClick={() => setTheme(value as "light" | "dark" | "system")}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${theme === value
                                                ? "border-primary bg-primary/10"
                                                : "border-border hover:border-primary/50"
                                                }`}
                                        >
                                            <Icon />
                                            <span className="text-sm text-foreground">{label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-foreground mb-2 block">Font Size</Label>
                                <Select
                                    value={fontSize}
                                    onChange={(e) => setFontSize(e.target.value)}
                                    className="bg-background text-foreground"
                                >
                                    <option value="small">Small</option>
                                    <option value="medium">Medium (Default)</option>
                                    <option value="large">Large</option>
                                    <option value="xlarge">Extra Large</option>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Accessibility */}
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <AccessibilityIcon />
                                </div>
                                <div>
                                    <CardTitle className="text-foreground">Accessibility</CardTitle>
                                    <CardDescription>Make the app easier to use</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-medium text-foreground">High Contrast Mode</p>
                                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                                </div>
                                <Toggle enabled={highContrast} onChange={setHighContrast} />
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-medium text-foreground">Reduced Motion</p>
                                    <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                                </div>
                                <Toggle enabled={reducedMotion} onChange={setReducedMotion} />
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-medium text-foreground">Screen Reader Support</p>
                                    <p className="text-sm text-muted-foreground">Optimized for assistive technologies</p>
                                </div>
                                <Toggle enabled={screenReader} onChange={setScreenReader} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Language */}
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <GlobeIcon />
                                </div>
                                <div>
                                    <CardTitle className="text-foreground">Language & Region</CardTitle>
                                    <CardDescription>Choose your preferred language</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">Display Language</Label>
                                <Select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="bg-background text-foreground"
                                >
                                    {LANGUAGES.map(l => (
                                        <option key={l.value} value={l.value}>{l.label}</option>
                                    ))}
                                </Select>
                                <p className="text-xs text-muted-foreground mt-2">
                                    🇿🇦 NoShowIQ supports all 11 official South African languages.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <BellIcon />
                                </div>
                                <div>
                                    <CardTitle className="text-foreground">Notifications</CardTitle>
                                    <CardDescription>Manage your notification preferences</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-medium text-foreground">SMS Reminders</p>
                                    <p className="text-sm text-muted-foreground">Receive appointment reminders via SMS</p>
                                </div>
                                <Toggle enabled={smsReminders} onChange={setSmsReminders} />
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-medium text-foreground">Email Updates</p>
                                    <p className="text-sm text-muted-foreground">Receive booking confirmations</p>
                                </div>
                                <Toggle enabled={emailUpdates} onChange={setEmailUpdates} />
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-medium text-foreground">Push Notifications</p>
                                    <p className="text-sm text-muted-foreground">Real-time queue updates</p>
                                </div>
                                <Toggle enabled={pushNotifs} onChange={setPushNotifs} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account */}
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                                    <UserIcon />
                                </div>
                                <div>
                                    <CardTitle className="text-foreground">Account</CardTitle>
                                    <CardDescription>Manage your account settings</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-foreground">Full Name</Label>
                                    <Input defaultValue="Dr. Sarah Nkosi" className="bg-background text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Employee ID</Label>
                                    <Input defaultValue="EMP-2024-1234" className="bg-background text-foreground" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-foreground">Email</Label>
                                    <Input type="email" defaultValue="sarah.nkosi@hospital.co.za" className="bg-background text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Phone</Label>
                                    <Input type="tel" defaultValue="071 234 5678" className="bg-background text-foreground" />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button>Save Changes</Button>
                                <Button className="bg-transparent border border-destructive text-destructive hover:bg-destructive/10">
                                    Delete Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
