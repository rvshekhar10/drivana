import { Metadata } from "next";
import BookingDetailClient from "./BookingDetailClient";

export const metadata: Metadata = {
  title: "Booking Details",
  description: "View and manage your booking with DRIVANA.",
};

export default function BookingDetailPage() {
  return <BookingDetailClient />;
}
