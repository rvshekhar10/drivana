import { Metadata } from "next";
import PartnerClient from "./PartnerClient";

export const metadata: Metadata = {
  title: "List Your Car | Earn from Your Idle Vehicle",
  description:
    "Earn upto ₹45,000/month from your idle car in Patna. List your vehicle on Drivana's self-drive platform. We handle maintenance, cleaning, repairs & weekly payouts. Start earning today.",
  keywords: [
    "list car for rent patna",
    "earn from idle car patna",
    "car rental partner patna",
    "rent my car patna",
    "vehicle onboarding drivana",
    "passive income car patna",
    "car sharing patna",
  ],
  openGraph: {
    title: "List Your Car on Drivana | Earn Weekly from Your Idle Vehicle",
    description:
      "Your car is sitting idle in Patna? Start earning upto ₹45,000/month. We handle everything - rentals, maintenance, cleaning, and repairs.",
    url: "https://www.drivana.co.in/partner",
  },
  alternates: {
    canonical: "https://www.drivana.co.in/partner",
  },
};

export default function PartnerPage() {
  return <PartnerClient />;
}
