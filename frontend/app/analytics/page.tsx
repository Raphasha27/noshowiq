"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { PROVINCES } from "@/lib/constants"
import { analyticsData } from "@/lib/mock-data"

// Professional SVG Icons
const UsersIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
)

const CalendarIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
)

const XCircleIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
)

const ClockIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
)

const StarIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
)

const UserGroupIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
)

const StatCard = ({ title, value, subtitle, trend, Icon, color }: {
    title: string
    value: string | number
    subtitle?: string
    trend?: { value: number; positive: boolean }
    Icon: React.ComponentType
    color: string
}) => (
    <Card className="glass-card hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground mb-1">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                    {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
                    {trend && (
                        <p className={`text-sm mt-2 ${trend.positive ? "text-green-600" : "text-red-500"}`}>
                            {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% from last week
                        </p>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                    <Icon />
                </div>
            </div>
        </CardContent>
    </Card>
)

const SimpleBarChart = ({ data }: { data: typeof analyticsData.weeklyPatients }) => {
    const maxValue = Math.max(...data.map(d => d.patients))

    return (
        <div className="flex items-end justify-between gap-2 h-48 px-4">
            {data.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col gap-1 items-center">
                        <div
                            className="w-full max-w-8 bg-primary rounded-t-md transition-all duration-500 hover:bg-primary/80"
                            style={{ height: `${(item.patients / maxValue) * 140}px` }}
                        />
                        <div
                            className="w-full max-w-8 bg-destructive/70 rounded-t-md"
                            style={{ height: `${(item.noShows / maxValue) * 140}px` }}
                        />
                    </div>
                    <span className="text-xs text-muted-foreground">{item.day}</span>
                </div>
            ))}
        </div>
    )
}

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState("week")
    const [selectedProvince, setSelectedProvince] = useState("all")

    const { overview, weeklyPatients, provinceStats, appointmentTypes } = analyticsData

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-fade-in">
                    <div>
                        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                        <p className="text-muted-foreground">Monitor performance and patient trends</p>
                    </div>
                    <div className="flex gap-3">
                        <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                            <option value="day">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </Select>
                        <Select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                            <option value="all">All Provinces</option>
                            {PROVINCES.map(p => (
                                <option key={p.value} value={p.value}>{p.label}</option>
                            ))}
                        </Select>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8 stagger-children">
                    <StatCard
                        title="Total Patients"
                        value={overview.totalPatients.toLocaleString()}
                        trend={{ value: 8.2, positive: true }}
                        Icon={UsersIcon}
                        color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    />
                    <StatCard
                        title="Today's Appointments"
                        value={overview.appointmentsToday}
                        subtitle="32 completed"
                        Icon={CalendarIcon}
                        color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    />
                    <StatCard
                        title="No-Show Rate"
                        value={`${overview.noShowRate}%`}
                        trend={{ value: 2.1, positive: true }}
                        Icon={XCircleIcon}
                        color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    />
                    <StatCard
                        title="Avg Wait Time"
                        value={`${overview.avgWaitTime} min`}
                        trend={{ value: 4, positive: true }}
                        Icon={ClockIcon}
                        color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    />
                    <StatCard
                        title="Satisfaction"
                        value={`${overview.satisfaction}/5`}
                        subtitle="Based on 523 reviews"
                        Icon={StarIcon}
                        color="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                    />
                    <StatCard
                        title="Active Doctors"
                        value={overview.doctorsActive}
                        subtitle="across 9 provinces"
                        Icon={UserGroupIcon}
                        color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    <Card className="glass-card animate-slide-up">
                        <CardHeader>
                            <CardTitle>Weekly Patient Flow</CardTitle>
                            <CardDescription>Patients vs No-Shows comparison</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SimpleBarChart data={weeklyPatients} />
                            <div className="flex justify-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-primary" />
                                    <span className="text-sm text-muted-foreground">Patients</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-destructive/70" />
                                    <span className="text-sm text-muted-foreground">No-Shows</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
                        <CardHeader>
                            <CardTitle>Performance by Province</CardTitle>
                            <CardDescription>Patient volume and no-show rates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {provinceStats.slice(0, 5).map((stat, index) => (
                                    <div key={stat.province} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">{stat.province}</span>
                                            <span className="text-muted-foreground">{stat.patients.toLocaleString()} patients</span>
                                        </div>
                                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-700"
                                                style={{
                                                    width: `${(stat.patients / 6000) * 100}%`,
                                                    animationDelay: `${index * 0.1}s`
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>No-show: {stat.noShowRate}%</span>
                                            <span>Avg wait: {stat.avgWait} min</span>
                                            <span>Rating: {stat.satisfaction}/5</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Appointment Types */}
                <Card className="glass-card animate-fade-in mb-8">
                    <CardHeader>
                        <CardTitle>Appointment Types Distribution</CardTitle>
                        <CardDescription>Breakdown by consultation type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {appointmentTypes.map((type) => (
                                <div key={type.type} className="p-4 rounded-xl bg-accent/50 text-center">
                                    <p className="text-2xl font-bold">{type.percentage}%</p>
                                    <p className="text-sm text-muted-foreground mt-1">{type.type}</p>
                                    <p className="text-xs text-muted-foreground">{type.count.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="glass-card animate-fade-in">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common analytics tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <Button className="bg-transparent border border-input hover:bg-accent text-foreground">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                Export Report
                            </Button>
                            <Button className="bg-transparent border border-input hover:bg-accent text-foreground">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                Schedule Report
                            </Button>
                            <Button className="bg-transparent border border-input hover:bg-accent text-foreground">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                                Set Alerts
                            </Button>
                            <Button className="bg-transparent border border-input hover:bg-accent text-foreground">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>
                                Compare Periods
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
