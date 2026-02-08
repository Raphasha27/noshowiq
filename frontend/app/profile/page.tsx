"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Professional SVG Icons
const UserIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
)

const KeyIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
)

const BellIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
)

const ShieldIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
)

const LogoutIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
)

const CameraIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
)

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
)

const ArrowLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
)

type Tab = "profile" | "security" | "notifications"

export default function ProfilePage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<Tab>("profile")
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    // Profile data
    const [profile, setProfile] = useState({
        firstName: "Dr. Sarah",
        lastName: "Nkosi",
        email: "sarah.nkosi@hospital.co.za",
        phone: "071 234 5678",
        role: "Senior Doctor",
        department: "General Medicine",
        clinic: "Chris Hani Baragwanath Hospital",
        employeeId: "CHB-2024-001",
    })

    // Notification settings
    const [notifications, setNotifications] = useState({
        emailAppointments: true,
        emailUpdates: false,
        smsReminders: true,
        pushNotifications: true,
    })

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const handleLogout = () => {
        router.push("/login")
    }

    const TabButton = ({ tab, icon, label }: { tab: Tab; icon: React.ReactNode; label: string }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent"
                }`}
        >
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </button>
    )

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button className="bg-transparent border border-input hover:bg-accent text-foreground p-2">
                                <ArrowLeftIcon />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
                            <p className="text-muted-foreground">Manage your account and preferences</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleLogout}
                        className="bg-transparent border border-destructive text-destructive hover:bg-destructive/10"
                    >
                        <LogoutIcon />
                        <span className="ml-2 hidden sm:inline">Logout</span>
                    </Button>
                </div>

                {/* Profile Card */}
                <Card className="glass-card mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
                                    {profile.firstName[0]}{profile.lastName[0]}
                                </div>
                                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                                    <CameraIcon />
                                </button>
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-xl font-bold text-foreground">{profile.firstName} {profile.lastName}</h2>
                                <p className="text-muted-foreground">{profile.role}</p>
                                <p className="text-sm text-muted-foreground">{profile.clinic}</p>
                                <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-medium">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Active
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    <TabButton tab="profile" icon={<UserIcon />} label="Profile" />
                    <TabButton tab="security" icon={<KeyIcon />} label="Security" />
                    <TabButton tab="notifications" icon={<BellIcon />} label="Notifications" />
                </div>

                {/* Tab Content */}
                {activeTab === "profile" && (
                    <Card className="glass-card animate-fade-in">
                        <CardHeader>
                            <CardTitle className="text-foreground">Personal Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-foreground">First Name</Label>
                                    <Input
                                        value={profile.firstName}
                                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                        className="bg-background text-foreground"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Last Name</Label>
                                    <Input
                                        value={profile.lastName}
                                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                        className="bg-background text-foreground"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-foreground">Email Address</Label>
                                <Input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="bg-background text-foreground"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-foreground">Phone Number</Label>
                                <Input
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className="bg-background text-foreground"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-foreground">Department</Label>
                                    <Input
                                        value={profile.department}
                                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                                        className="bg-background text-foreground"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Employee ID</Label>
                                    <Input value={profile.employeeId} disabled className="bg-accent text-muted-foreground" />
                                </div>
                            </div>
                            <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
                                {saving ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </span>
                                ) : saved ? (
                                    <span className="flex items-center gap-2">
                                        <CheckIcon />
                                        Saved!
                                    </span>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {activeTab === "security" && (
                    <Card className="glass-card animate-fade-in">
                        <CardHeader>
                            <CardTitle className="text-foreground">Security Settings</CardTitle>
                            <CardDescription>Manage your password and security preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 rounded-lg bg-accent/50 flex items-start gap-3">
                                <ShieldIcon />
                                <div>
                                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                                    <Button className="mt-3 bg-transparent border border-input hover:bg-accent text-foreground">
                                        Enable 2FA
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-foreground">Change Password</h3>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Current Password</Label>
                                    <Input type="password" placeholder="Enter current password" className="bg-background text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">New Password</Label>
                                    <Input type="password" placeholder="Enter new password" className="bg-background text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Confirm New Password</Label>
                                    <Input type="password" placeholder="Confirm new password" className="bg-background text-foreground" />
                                </div>
                                <Button onClick={handleSave} disabled={saving}>
                                    {saving ? "Updating..." : "Update Password"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === "notifications" && (
                    <Card className="glass-card animate-fade-in">
                        <CardHeader>
                            <CardTitle className="text-foreground">Notification Preferences</CardTitle>
                            <CardDescription>Choose how you want to be notified</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { key: "emailAppointments", label: "Email - Appointment notifications", description: "Receive emails about new and updated appointments" },
                                { key: "emailUpdates", label: "Email - System updates", description: "Get notified about new features and updates" },
                                { key: "smsReminders", label: "SMS - Appointment reminders", description: "Receive SMS reminders before appointments" },
                                { key: "pushNotifications", label: "Push notifications", description: "Real-time notifications in the app" },
                            ].map((item) => (
                                <div key={item.key} className="flex items-start justify-between p-4 rounded-lg bg-accent/30">
                                    <div>
                                        <p className="font-medium text-foreground">{item.label}</p>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                    <button
                                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                                        className={`w-12 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications]
                                            ? "bg-primary"
                                            : "bg-muted"
                                            }`}
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${notifications[item.key as keyof typeof notifications]
                                                ? "translate-x-6"
                                                : "translate-x-0.5"
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                            <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
                                {saving ? "Saving..." : saved ? "Saved!" : "Save Preferences"}
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
