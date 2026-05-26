import { Metadata } from "next";
import HowItWorksClient from "./HowItWorksClient";

export const metadata: Metadata = {
  title: "How It Works | Rent a Self-Drive Car in Patna - DRIVANA",
  description:
    "Rent a self-drive car in Patna in 4 simple steps. Message us on WhatsApp, verify your documents, pick up or get doorstep delivery, and drive. No app download needed.",
  keywords: [
    "how to rent car patna",
    "self drive car booking process patna",
    "drivana booking steps",
    "rent car without driver patna",
    "car rental process patna",
    "whatsapp car booking patna",
    "documents for car rental patna",
    "self drive car deposit patna",
  ],
  openGraph: {
    title: "How It Works | Rent a Self-Drive Car in Patna - DRIVANA",
    description:
      "4 simple steps to rent a self-drive car in Patna. WhatsApp booking, quick verification, pickup/delivery, and you're on the road.",
    url: "https://drivana.in/how-it-works",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "How DRIVANA Works - Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | Rent a Self-Drive Car in Patna - DRIVANA",
    description:
      "4 simple steps: WhatsApp → Verify → Pickup → Drive. No app needed.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://drivana.in/how-it-works",
  },
};

export default function HowItWorksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Rent a Self-Drive Car in Patna with DRIVANA",
    description:
      "Step-by-step guide to renting a self-drive car in Patna via WhatsApp.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Send a WhatsApp Message",
        text: "Message us on WhatsApp at +91 70791 38350 with your preferred car, dates, and pickup location.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Quick Verification",
        text: "Share your driving license and Aadhaar card photo for verification. Pay the security deposit.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Pickup or Delivery",
        text: "Pick up the car from Bhootnath Road or get doorstep delivery within Patna city limits.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Drive & Return",
        text: "Enjoy your drive! Return the car at the agreed time with the same fuel level.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HowItWorksClient />
    </>
  );
}
