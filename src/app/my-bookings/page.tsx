import { Metadata } from "next";
import MyBookingsClient from "./MyBookingsClient";

export const metadata: Metadata = {
  title: "My Bookings",
  description: "View and manage your self-drive car bookings with DRIVANA Patna.",
};

export default function MyBookingsPage() {
  return <MyBookingsClient />;
}
