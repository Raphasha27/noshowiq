"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ArrowLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
)

const ClockIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
)

const DeviceIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
)

const ShieldIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
)

const ChartIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
)

const features = [
    {
        Icon: ClockIcon,
        title: "Zero-Queue Technology",
        description: "Our smart scheduling system eliminates waiting rooms. Arrive just in time for your appointment and see your doctor immediately.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        Icon: DeviceIcon,
        title: "Pre-Visit Updates",
        description: "Share your symptoms and medical history before you arrive. Doctors get context, you get faster, more focused care.",
        color: "from-purple-500 to-pink-500"
    },
    {
        Icon: ShieldIcon,
        title: "POPIA Compliant",
        description: "Your health data is protected by South African privacy laws. We use enterprise-grade encryption to keep your information safe.",
        color: "from-green-500 to-emerald-500"
    },
    {
        Icon: ChartIcon,
        title: "Smart Analytics",
        description: "AI-powered predictions help clinics optimize scheduling. This means shorter waits and better care for everyone.",
        color: "from-orange-500 to-amber-500"
    }
]

const stats = [
    { value: "24+", label: "Partner Hospitals" },
    { value: "50K+", label: "Patients Served" },
    { value: "45min", label: "Avg. Time Saved" },
    { value: "12%", label: "No-Show Reduction" }
]

export default function LearnMorePage() {
    return (
        <div className="min-h-screen">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <Link href="/get-started">
                    <Button className="bg-transparent border border-input hover:bg-accent text-foreground">
                        <ArrowLeftIcon />
                        <span className="ml-2">Back to Registration</span>
                    </Button>
                </Link>
            </div>

            {/* Hero */}
            <section className="py-12 md:py-20 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 gradient-mesh opacity-50" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                        Healthcare Without the Wait
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        NoShowIQ is transforming how South Africans experience healthcare. No more 4-hour waits. No more crowded waiting rooms.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-8 border-y border-border/50">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">How NoShowIQ Works</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((feature) => (
                            <Card key={feature.title} className="glass-card hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                                        <feature.Icon />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <Card className="glass-card p-8">
                        <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to Get Started?</h2>
                        <p className="text-muted-foreground mb-6">
                            Join thousands of South Africans already enjoying stress-free healthcare visits.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/get-started">
                                <Button className="w-full sm:w-auto px-8">
                                    Create Free Account
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button className="w-full sm:w-auto px-8 bg-transparent border border-input hover:bg-accent text-foreground">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    )
}
