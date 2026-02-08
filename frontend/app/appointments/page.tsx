"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { PROVINCES, CLINICS, APPOINTMENT_TYPES, TIME_SLOTS } from "@/lib/constants"

export default function AppointmentsPage() {
    const [selectedProvince, setSelectedProvince] = useState("Gauteng")
    const [selectedClinic, setSelectedClinic] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [appointmentType, setAppointmentType] = useState("general")
    const [step, setStep] = useState(1)
    const [patientName, setPatientName] = useState("")
    const [patientPhone, setPatientPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [booked, setBooked] = useState(false)

    const filteredClinics = useMemo(() => {
        return CLINICS.filter(c => c.province === selectedProvince)
    }, [selectedProvince])

    const selectedClinicData = CLINICS.find(c => c.id === selectedClinic)

    const handleBook = async () => {
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setBooked(true)
        setLoading(false)
    }

    const getMinDate = () => {
        const today = new Date()
        return today.toISOString().split('T')[0]
    }

    if (booked) {
        return (
            <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
                <Card className="w-full max-w-md glass-card animate-fade-in">
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <span className="text-3xl">✅</span>
                        </div>
                        <CardTitle className="text-2xl">Appointment Booked!</CardTitle>
                        <CardDescription>Your appointment has been confirmed</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-accent/50 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Clinic:</span>
                                <span className="font-medium">{selectedClinicData?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Date:</span>
                                <span className="font-medium">{new Date(selectedDate).toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Time:</span>
                                <span className="font-medium">{selectedTime}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Type:</span>
                                <span className="font-medium">{APPOINTMENT_TYPES.find(t => t.value === appointmentType)?.label}</span>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                            You will receive an SMS reminder 24 hours before your appointment.
                        </p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => setBooked(false)}>
                            Book Another
                        </Button>
                        <Button className="flex-1" onClick={() => window.location.href = '/patient'}>
                            Check-in Now
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
                    <p className="text-muted-foreground">Schedule your visit in 3 easy steps</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8 animate-fade-in">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${s <= step
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                    } ${s === step ? "animate-pulse-glow" : ""}`}
                            >
                                {s}
                            </div>
                            {s < 3 && (
                                <div className={`flex-1 h-1 mx-2 rounded ${s < step ? "bg-primary" : "bg-muted"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <Card className="glass-card animate-slide-up">
                    {step === 1 && (
                        <>
                            <CardHeader>
                                <CardTitle>Select Location & Clinic</CardTitle>
                                <CardDescription>Choose your province and preferred healthcare facility</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Province</Label>
                                        <Select
                                            value={selectedProvince}
                                            onChange={(e) => {
                                                setSelectedProvince(e.target.value)
                                                setSelectedClinic("")
                                            }}
                                        >
                                            {PROVINCES.map(p => (
                                                <option key={p.value} value={p.value}>{p.label}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Appointment Type</Label>
                                        <Select
                                            value={appointmentType}
                                            onChange={(e) => setAppointmentType(e.target.value)}
                                        >
                                            {APPOINTMENT_TYPES.map(t => (
                                                <option key={t.value} value={t.value}>{t.label} ({t.duration} min)</option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Select Clinic</Label>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {filteredClinics.map((clinic) => (
                                            <button
                                                key={clinic.id}
                                                onClick={() => setSelectedClinic(clinic.id)}
                                                className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${selectedClinic === clinic.id
                                                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                                                        : "border-border hover:border-primary/50"
                                                    }`}
                                            >
                                                <p className="font-medium">{clinic.name}</p>
                                                <p className="text-sm text-muted-foreground">{clinic.city} • {clinic.type}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    disabled={!selectedClinic}
                                    onClick={() => setStep(2)}
                                >
                                    Continue
                                </Button>
                            </CardFooter>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <CardHeader>
                                <CardTitle>Choose Date & Time</CardTitle>
                                <CardDescription>Select your preferred appointment slot</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input
                                        type="date"
                                        value={selectedDate}
                                        min={getMinDate()}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                </div>

                                {selectedDate && (
                                    <div className="space-y-2 animate-fade-in">
                                        <Label>Available Time Slots</Label>
                                        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                                            {TIME_SLOTS.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${selectedTime === time
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-accent hover:bg-accent/80"
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                                <Button
                                    className="flex-1"
                                    disabled={!selectedDate || !selectedTime}
                                    onClick={() => setStep(3)}
                                >
                                    Continue
                                </Button>
                            </CardFooter>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <CardHeader>
                                <CardTitle>Your Details</CardTitle>
                                <CardDescription>Enter your contact information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                        placeholder="Enter your full name"
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <Input
                                        type="tel"
                                        placeholder="e.g., 071 234 5678"
                                        value={patientPhone}
                                        onChange={(e) => setPatientPhone(e.target.value)}
                                    />
                                </div>

                                {/* Summary */}
                                <div className="p-4 rounded-lg bg-accent/50 space-y-2 mt-6">
                                    <h4 className="font-semibold">Appointment Summary</h4>
                                    <div className="text-sm space-y-1">
                                        <p><span className="text-muted-foreground">Clinic:</span> {selectedClinicData?.name}</p>
                                        <p><span className="text-muted-foreground">Date:</span> {selectedDate ? new Date(selectedDate).toLocaleDateString('en-ZA') : ''}</p>
                                        <p><span className="text-muted-foreground">Time:</span> {selectedTime}</p>
                                        <p><span className="text-muted-foreground">Type:</span> {APPOINTMENT_TYPES.find(t => t.value === appointmentType)?.label}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                                <Button
                                    className="flex-1"
                                    disabled={!patientName || !patientPhone || loading}
                                    onClick={handleBook}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Booking...
                                        </span>
                                    ) : (
                                        "Confirm Booking"
                                    )}
                                </Button>
                            </CardFooter>
                        </>
                    )}
                </Card>
            </div>
        </div>
    )
}
