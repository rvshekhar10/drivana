import { Metadata } from "next";
import FleetClient from "./FleetClient";

export const metadata: Metadata = {
  title:
    "Self-Drive Cars on Rent in Patna | Fleet & Prices - DRIVANA",
  description:
    "Browse DRIVANA's self-drive car fleet in Patna. Nissan Magnite, Tata Tiago, Maruti Alto & Ford Freestyle available from ₹1,399/day. Compare prices, specs & book on WhatsApp.",
  keywords: [
    "self drive cars patna",
    "car rental fleet patna",
    "cars on rent patna",
    "nissan magnite rent patna",
    "tata tiago rent patna",
    "maruti alto rent patna",
    "ford freestyle rent patna",
    "cheap car rental patna",
    "self drive car prices patna",
    "car hire patna without driver",
    "suv on rent patna",
    "hatchback on rent patna",
  ],
  openGraph: {
    title: "Self-Drive Cars on Rent in Patna | Fleet & Prices - DRIVANA",
    description:
      "Browse our fleet: Magnite, Tiago, Alto, Freestyle. Starting ₹1,399/day. Compare specs & book instantly.",
    url: "https://www.drivana.co.in/fleet",
    type: "website",
    images: [
      {
        url: "/drivana-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DRIVANA Fleet - Self Drive Cars in Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Self-Drive Cars on Rent in Patna - DRIVANA Fleet",
    description:
      "Magnite, Tiago, Alto, Freestyle. Starting ₹1,399/day. Book on WhatsApp.",
    images: ["/drivana-og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.drivana.co.in/fleet",
  },
};

export default function FleetPage() {
  return <FleetClient />;
}
