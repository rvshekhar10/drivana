import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | DRIVANA Self-Drive Car Rental Patna - WhatsApp & Call",
  description:
    "Contact DRIVANA for self-drive car rental in Patna. WhatsApp +91 92055 48488, call +91 70791 38350, email drivanaofficial@gmail.com. Located at Bhootnath Road, Patna. Open 24 hours, 7 days a week.",
  keywords: [
    "drivana contact",
    "drivana phone number",
    "drivana whatsapp",
    "car rental contact patna",
    "drivana location patna",
    "drivana bhoothnath road",
    "self drive car rental contact patna",
    "drivana email",
  ],
  openGraph: {
    title: "Contact Us | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Reach DRIVANA on WhatsApp, call, or email. Bhootnath Road, Patna. Open 24 hours daily.",
    url: "https://www.drivana.co.in/contact",
    type: "website",
    images: [
      {
        url: "/drivana-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact DRIVANA - Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | DRIVANA Self-Drive Car Rental Patna",
    description:
      "WhatsApp +91 92055 48488 | Bhootnath Road, Patna | Open 24 hours daily.",
    images: ["/drivana-og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.drivana.co.in/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact DRIVANA",
    url: "https://www.drivana.co.in/contact",
    mainEntity: {
      "@type": "AutoRental",
      name: "DRIVANA - Self Drive Car Rental",
      telephone: "+91-7079138350",
      email: "drivanaofficial@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "162, MIG - Bhootnath Road, Near Global Public School",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        postalCode: "800026",
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
