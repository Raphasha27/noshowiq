"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ArrowLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
)

export default function TermsPage() {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/get-started">
                    <Button className="mb-8 bg-transparent border border-input hover:bg-accent text-foreground">
                        <ArrowLeftIcon />
                        <span className="ml-2">Back to Registration</span>
                    </Button>
                </Link>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-2xl text-foreground">Terms of Service</CardTitle>
                        <p className="text-muted-foreground">Effective Date: February 2024</p>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none space-y-6">
                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                By using NoShowIQ, you agree to these terms. If you do not agree, please do not use our services. These terms are governed by the laws of the Republic of South Africa.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">2. Service Description</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                NoShowIQ provides a healthcare queue management platform that enables patients to book appointments, share pre-visit information, and reduce waiting times at participating healthcare facilities across South Africa.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">3. User Responsibilities</h2>
                            <ul className="text-muted-foreground text-sm space-y-2">
                                <li>• Provide accurate personal and health information</li>
                                <li>• Keep your account credentials secure</li>
                                <li>• Attend scheduled appointments or cancel in advance</li>
                                <li>• Use the platform only for legitimate healthcare purposes</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">4. Healthcare Disclaimer</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                NoShowIQ is a scheduling and queue management tool only. We do not provide medical advice or treatment. All medical decisions are made by qualified healthcare providers at participating facilities.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">5. Limitation of Liability</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                NoShowIQ is not liable for any delays, missed appointments, or medical outcomes. We strive to minimize wait times but cannot guarantee exact appointment times due to the nature of healthcare services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">6. Account Termination</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or repeatedly fail to attend scheduled appointments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">7. Contact</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                For questions about these terms, contact us at legal@noshowiq.co.za
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
