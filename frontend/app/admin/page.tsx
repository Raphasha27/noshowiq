"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CLINICS } from "@/lib/constants"

type Tab = "clinics" | "users" | "notifications" | "system"

// Professional SVG Icons
const BuildingIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
)

const UsersIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
)

const BellIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
)

const CogIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
)

const DatabaseIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
)

const RefreshIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
)

const DocumentIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
)

const WarningIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
)

const mockUsers = [
    { id: 1, name: "Dr. Sarah Nkosi", role: "Doctor", clinic: "Chris Hani Baragwanath", status: "Active" },
    { id: 2, name: "Nurse Thabo Mokoena", role: "Nurse", clinic: "Steve Biko Academic", status: "Active" },
    { id: 3, name: "Dr. John van der Merwe", role: "Doctor", clinic: "Groote Schuur", status: "Active" },
    { id: 4, name: "Admin Palesa Dlamini", role: "Admin", clinic: "All Clinics", status: "Active" },
]

const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${active
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent"
            }`}
    >
        {children}
    </button>
)

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<Tab>("clinics")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredClinics = CLINICS.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-3xl font-bold">Admin Panel</h1>
                    <p className="text-muted-foreground">Manage clinics, users, and system settings</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
                    <TabButton active={activeTab === "clinics"} onClick={() => setActiveTab("clinics")}>
                        <BuildingIcon /> Clinics
                    </TabButton>
                    <TabButton active={activeTab === "users"} onClick={() => setActiveTab("users")}>
                        <UsersIcon /> Users
                    </TabButton>
                    <TabButton active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")}>
                        <BellIcon /> Notifications
                    </TabButton>
                    <TabButton active={activeTab === "system"} onClick={() => setActiveTab("system")}>
                        <CogIcon /> System
                    </TabButton>
                </div>

                {/* Tab Content */}
                {activeTab === "clinics" && (
                    <div className="space-y-6 animate-fade-in">
                        <Card className="glass-card">
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <CardTitle>Registered Clinics</CardTitle>
                                        <CardDescription>{CLINICS.length} clinics across South Africa</CardDescription>
                                    </div>
                                    <div className="flex gap-3">
                                        <Input
                                            placeholder="Search clinics..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-64"
                                        />
                                        <Button>+ Add Clinic</Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Province</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">City</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredClinics.slice(0, 10).map((clinic) => (
                                                <tr key={clinic.id} className="border-b hover:bg-accent/50 transition-colors">
                                                    <td className="py-3 px-4 font-medium">{clinic.name}</td>
                                                    <td className="py-3 px-4 text-muted-foreground">{clinic.province}</td>
                                                    <td className="py-3 px-4 text-muted-foreground">{clinic.city}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${clinic.type === "Academic" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                                                            clinic.type === "Regional" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                                                                "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400"
                                                            }`}>
                                                            {clinic.type}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex gap-2">
                                                            <Button className="h-8 px-3 text-xs bg-transparent hover:bg-accent">Edit</Button>
                                                            <Button className="h-8 px-3 text-xs bg-transparent hover:bg-accent">View</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === "users" && (
                    <div className="space-y-6 animate-fade-in">
                        <Card className="glass-card">
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <CardTitle>System Users</CardTitle>
                                        <CardDescription>Manage doctors, nurses, and administrators</CardDescription>
                                    </div>
                                    <Button>+ Add User</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {mockUsers.map((user) => (
                                        <Card key={user.id} className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                                                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-sm text-muted-foreground">{user.role} • {user.clinic}</p>
                                                </div>
                                                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                    {user.status}
                                                </span>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === "notifications" && (
                    <div className="space-y-6 animate-fade-in">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>Notification Settings</CardTitle>
                                <CardDescription>Configure SMS and email notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
                                        <div>
                                            <p className="font-medium">Appointment Reminders</p>
                                            <p className="text-sm text-muted-foreground">Send SMS 24h before appointments</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
                                        <div>
                                            <p className="font-medium">No-Show Alerts</p>
                                            <p className="text-sm text-muted-foreground">Alert staff when patient misses appointment</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
                                        <div>
                                            <p className="font-medium">Daily Reports</p>
                                            <p className="text-sm text-muted-foreground">Send daily summary to administrators</p>
                                        </div>
                                        <input type="checkbox" className="w-5 h-5 accent-primary" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>SMS Gateway API Key</Label>
                                    <Input type="password" placeholder="Enter API key..." />
                                </div>

                                <Button>Save Settings</Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === "system" && (
                    <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>System Status</CardTitle>
                                <CardDescription>Current system health</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span>API Server</span>
                                    <span className="flex items-center gap-2 text-green-600">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Database</span>
                                    <span className="flex items-center gap-2 text-green-600">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Connected
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>SMS Service</span>
                                    <span className="flex items-center gap-2 text-green-600">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Active
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Last Backup</span>
                                    <span className="text-muted-foreground">2 hours ago</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>System maintenance</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start gap-2 border border-input bg-transparent hover:bg-accent text-foreground">
                                    <DatabaseIcon /> Backup Database
                                </Button>
                                <Button className="w-full justify-start gap-2 border border-input bg-transparent hover:bg-accent text-foreground">
                                    <RefreshIcon /> Clear Cache
                                </Button>
                                <Button className="w-full justify-start gap-2 border border-input bg-transparent hover:bg-accent text-foreground">
                                    <DocumentIcon /> View Logs
                                </Button>
                                <Button className="w-full justify-start gap-2 border border-destructive bg-transparent hover:bg-destructive/10 text-destructive">
                                    <WarningIcon /> System Reset
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
