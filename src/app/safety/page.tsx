import { Metadata } from "next";
import SafetyClient from "./SafetyClient";

export const metadata: Metadata = {
  title: "Safety & Support | DRIVANA Self-Drive Car Rental Patna",
  description:
    "DRIVANA ensures your safety with regularly serviced cars, insurance coverage, on-ground breakdown support within Patna, emergency contact, and thorough vehicle inspections before and after every rental.",
  keywords: [
    "drivana safety",
    "car rental safety patna",
    "breakdown support patna",
    "self drive car insurance patna",
    "drivana roadside assistance",
    "car rental inspection patna",
    "safe car rental patna",
    "drivana emergency support",
  ],
  openGraph: {
    title: "Safety & Support | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Regularly serviced cars, insurance coverage, on-ground breakdown support, and thorough inspections. Your safety is our priority.",
    url: "https://www.drivana.co.in/safety",
    type: "website",
    images: [
      {
        url: "/drivana-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Safety & Support - DRIVANA Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safety & Support | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Serviced cars, insurance, on-ground breakdown support within Patna. Your safety comes first.",
    images: ["/drivana-og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.drivana.co.in/safety",
  },
};

export default function SafetyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Safety & Support - DRIVANA",
    description:
      "DRIVANA's safety measures including vehicle maintenance, insurance, breakdown support, and inspection protocols.",
    url: "https://www.drivana.co.in/safety",
    mainEntity: {
      "@type": "Service",
      name: "DRIVANA Roadside Assistance",
      provider: {
        "@type": "AutoRental",
        name: "DRIVANA",
      },
      areaServed: {
        "@type": "City",
        name: "Patna",
      },
      description:
        "On-ground breakdown support within Patna city limits for all DRIVANA rental vehicles.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SafetyClient />
    </>
  );
}
