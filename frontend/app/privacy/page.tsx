"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ArrowLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
)

export default function PrivacyPage() {
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
                        <CardTitle className="text-2xl text-foreground">Privacy Policy</CardTitle>
                        <p className="text-muted-foreground">Last updated: February 2024</p>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none space-y-6">
                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">1. Information We Collect</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                NoShowIQ collects personal information necessary to provide healthcare queue management services, including your name, SA ID number, contact details, and health-related information you choose to share through our pre-visit forms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
                            <ul className="text-muted-foreground text-sm space-y-2">
                                <li>• Schedule and manage your healthcare appointments</li>
                                <li>• Send appointment reminders and updates</li>
                                <li>• Provide pre-visit information to healthcare providers</li>
                                <li>• Improve our services through anonymized analytics</li>
                                <li>• Comply with South African healthcare regulations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">3. Data Protection</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                We comply with the Protection of Personal Information Act (POPIA) of South Africa. Your data is encrypted, stored securely, and only accessible to authorized healthcare personnel involved in your care.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">4. Data Sharing</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                We only share your information with healthcare facilities you visit through our platform and as required by South African law. We never sell your personal data to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">5. Your Rights</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Under POPIA, you have the right to access, correct, or delete your personal information. Contact us at privacy@noshowiq.co.za for any data-related requests.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">6. Contact Us</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Information Officer: NoShowIQ Privacy Team<br />
                                Email: privacy@noshowiq.co.za<br />
                                Address: Johannesburg, South Africa
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
