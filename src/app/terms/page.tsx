import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions | DRIVANA Self-Drive Car Rental Patna",
  description:
    "Read the terms and conditions for renting a self-drive car from DRIVANA in Patna. Eligibility, booking policy, security deposit, KM limits, cancellation, and vehicle return conditions.",
  keywords: [
    "drivana terms and conditions",
    "car rental terms patna",
    "self drive car rules patna",
    "drivana cancellation policy",
    "security deposit car rental patna",
    "km limit car rental patna",
    "car rental eligibility patna",
  ],
  openGraph: {
    title: "Terms & Conditions | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Eligibility, booking policy, security deposit, KM limits, cancellation, and vehicle return conditions for DRIVANA car rentals.",
    url: "https://drivana.in/terms",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Terms & Conditions - DRIVANA Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Complete terms for renting a self-drive car from DRIVANA in Patna.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://drivana.in/terms",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
