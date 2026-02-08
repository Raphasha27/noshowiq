"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockPatients, mockDoctors, mockNotifications, type Patient } from "@/lib/mock-data"

// Professional SVG Icons
const UsersIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
)

const ClockIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
)

const UserPlusIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>
)

const BellIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
)

const CheckCircleIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
)

const ExclamationIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
)

const getStatusStyle = (status: Patient["status"]) => {
    switch (status) {
        case "waiting":
            return "status-waiting"
        case "in-consultation":
            return "status-in-progress"
        case "completed":
            return "status-completed"
        case "no-show":
            return "status-no-show"
        default:
            return ""
    }
}

const getStatusLabel = (status: Patient["status"]) => {
    switch (status) {
        case "waiting": return "Waiting"
        case "in-consultation": return "In Consultation"
        case "completed": return "Completed"
        case "no-show": return "No Show"
    }
}

const getPriorityStyle = (priority: Patient["priority"]) => {
    switch (priority) {
        case "emergency":
            return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
        case "urgent":
            return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
        default:
            return ""
    }
}

export default function DashboardPage() {
    const [patients, setPatients] = useState<Patient[]>(mockPatients)
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const waitingPatients = patients.filter(p => p.status === "waiting")
    const inConsultation = patients.filter(p => p.status === "in-consultation")
    const completedToday = patients.filter(p => p.status === "completed")
    const noShows = patients.filter(p => p.status === "no-show")
    const activeDoctors = mockDoctors.filter(d => d.status !== "offline")
    const unreadNotifications = mockNotifications.filter(n => !n.read)

    const avgWaitTime = 14 // minutes

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-fade-in">
                    <div>
                        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
                        <p className="text-muted-foreground">
                            {currentTime.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            {' • '}
                            {currentTime.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                            <BellIcon />
                            {unreadNotifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                                    {unreadNotifications.length}
                                </span>
                            )}
                        </button>
                        <Link href="/profile">
                            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity">
                                SN
                            </div>
                        </Link>
                        <Button>
                            <UserPlusIcon />
                            <span className="ml-2 hidden sm:inline">Add Patient</span>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-children">
                    <Card className="glass-card">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Waiting</p>
                                    <p className="text-3xl font-bold">{waitingPatients.length}</p>
                                    <p className="text-xs text-muted-foreground mt-1">patients in queue</p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <UsersIcon />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Avg Wait Time</p>
                                    <p className="text-3xl font-bold">{avgWaitTime}<span className="text-lg font-normal">min</span></p>
                                    <p className="text-xs text-green-600 mt-1">↓ 3 min from yesterday</p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <ClockIcon />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Completed</p>
                                    <p className="text-3xl font-bold">{completedToday.length}</p>
                                    <p className="text-xs text-muted-foreground mt-1">consultations today</p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <CheckCircleIcon />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">No-Shows</p>
                                    <p className="text-3xl font-bold">{noShows.length}</p>
                                    <p className="text-xs text-red-500 mt-1">{((noShows.length / patients.length) * 100).toFixed(1)}% rate</p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                    <ExclamationIcon />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Patient Queue */}
                    <div className="lg:col-span-2">
                        <Card className="glass-card animate-slide-up">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Patient Queue</CardTitle>
                                        <CardDescription>{waitingPatients.length + inConsultation.length} patients active</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 text-sm rounded-lg bg-primary/10 text-primary">All</button>
                                        <button className="px-3 py-1 text-sm rounded-lg hover:bg-accent">Waiting</button>
                                        <button className="px-3 py-1 text-sm rounded-lg hover:bg-accent">Urgent</button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {/* In Consultation */}
                                    {inConsultation.map((patient) => (
                                        <div
                                            key={patient.id}
                                            className="p-4 rounded-xl border-2 border-primary bg-primary/5 animate-pulse-glow"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold">
                                                        {patient.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{patient.name}</p>
                                                        <p className="text-sm text-muted-foreground">{patient.assignedDoctor}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(patient.status)}`}>
                                                    {getStatusLabel(patient.status)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">{patient.symptoms}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-4 text-xs text-muted-foreground">
                                                    <span>Appt: {patient.appointmentTime}</span>
                                                    <span>•</span>
                                                    <span>{patient.province}</span>
                                                    {patient.needsAssistance && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-primary">♿ Assistance needed</span>
                                                        </>
                                                    )}
                                                </div>
                                                <Button>Complete</Button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Waiting Patients */}
                                    {waitingPatients.map((patient, index) => (
                                        <div
                                            key={patient.id}
                                            className="p-4 rounded-xl border hover:border-primary/50 transition-all hover:shadow-md"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm font-semibold">
                                                        #{patient.queueNumber}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium">{patient.name}</p>
                                                            {patient.priority !== "normal" && (
                                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityStyle(patient.priority)}`}>
                                                                    {patient.priority.toUpperCase()}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{patient.assignedDoctor}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(patient.status)}`}>
                                                    {getStatusLabel(patient.status)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">{patient.symptoms}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-4 text-xs text-muted-foreground">
                                                    <span>Appt: {patient.appointmentTime}</span>
                                                    <span>•</span>
                                                    <span>Checked in: {patient.checkInTime}</span>
                                                    {patient.needsAssistance && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-primary">♿ Assistance</span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button className="bg-transparent border border-input hover:bg-accent text-foreground">View</Button>
                                                    <Button>Call</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Active Doctors */}
                        <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
                            <CardHeader>
                                <CardTitle>Active Doctors</CardTitle>
                                <CardDescription>{activeDoctors.length} doctors on duty</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {activeDoctors.slice(0, 4).map((doctor) => (
                                        <div key={doctor.id} className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
                                                    {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                                                </div>
                                                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${doctor.status === "available" ? "bg-green-500" : "bg-amber-500"
                                                    }`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{doctor.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{doctor.specialty}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">{doctor.patientsToday}</p>
                                                <p className="text-xs text-muted-foreground">today</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>{unreadNotifications.length} unread</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockNotifications.slice(0, 4).map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-3 rounded-lg ${notification.read ? "bg-accent/30" : "bg-accent"}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-2 h-2 mt-2 rounded-full ${notification.type === "alert" ? "bg-red-500" :
                                                    notification.type === "appointment" ? "bg-blue-500" :
                                                        notification.type === "reminder" ? "bg-amber-500" :
                                                            "bg-gray-500"
                                                    }`} />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium">{notification.title}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {new Date(notification.timestamp).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
