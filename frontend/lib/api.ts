export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Patient {
  id: number;
  name: string;
  id_number: string;
  province: string;
  symptoms: string;
  needs_assistance: boolean;
  language_preference: string;
  status: "Waiting" | "In Consultation" | "Completed" | "No Show";
  queue_number: number;
}

export async function fetchBookings(): Promise<Patient[]> {
  const response = await fetch(`${API_BASE_URL}/bookings/`);
  if (!response.ok) throw new Error("Failed to fetch bookings");
  return response.json();
}

export async function createBooking(data: any): Promise<Patient> {
  const response = await fetch(`${API_BASE_URL}/bookings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create booking");
  return response.json();
}

export async function updateBookingStatus(id: number, status: string): Promise<Patient> {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}/status?status=${status}`, {
    method: "PUT",
  });
  if (!response.ok) throw new Error("Failed to update status");
  return response.json();
}
