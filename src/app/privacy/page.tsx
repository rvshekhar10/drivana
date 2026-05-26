import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | DRIVANA - Self-Drive Car Rental Patna",
  description:
    "DRIVANA's privacy policy explains how we collect, use, and protect your personal data including driving license, Aadhaar, and contact information for self-drive car rental verification in Patna.",
  keywords: [
    "drivana privacy policy",
    "car rental privacy patna",
    "drivana data protection",
    "self drive car rental privacy",
    "drivana personal data",
  ],
  openGraph: {
    title: "Privacy Policy | DRIVANA - Self-Drive Car Rental Patna",
    description:
      "How DRIVANA collects, uses, and protects your personal data for self-drive car rental verification.",
    url: "https://www.drivana.co.in/privacy",
    type: "website",
    images: [
      {
        url: "/drivana-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - DRIVANA Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | DRIVANA - Self-Drive Car Rental Patna",
    description:
      "How DRIVANA handles your personal data. No data sold to third parties.",
    images: ["/drivana-og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.drivana.co.in/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
