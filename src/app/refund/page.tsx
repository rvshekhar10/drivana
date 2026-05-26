import { Metadata } from "next";
import RefundClient from "./RefundClient";

export const metadata: Metadata = {
  title: "Refund Policy | DRIVANA Self-Drive Car Rental Patna",
  description:
    "DRIVANA's refund policy covers security deposit refunds, damage deductions, cancellation refunds, and timelines. Transparent refund process for self-drive car rentals in Patna.",
  keywords: [
    "drivana refund policy",
    "car rental refund patna",
    "security deposit refund drivana",
    "cancellation refund car rental patna",
    "drivana deposit return",
    "self drive car refund policy",
  ],
  openGraph: {
    title: "Refund Policy | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Security deposit refunds, damage deductions, and cancellation refund timelines for DRIVANA car rentals in Patna.",
    url: "https://drivana.in/refund",
    type: "website",
    images: [
      {
        url: "/drivana-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Refund Policy - DRIVANA Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Transparent refund process. Security deposit returned within 24-48 hours of vehicle return.",
    images: ["/drivana-og-image.jpg"],
  },
  alternates: {
    canonical: "https://drivana.in/refund",
  },
};

export default function RefundPage() {
  return <RefundClient />;
}
