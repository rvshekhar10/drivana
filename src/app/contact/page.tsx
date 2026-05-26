import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | DRIVANA Self-Drive Car Rental Patna - WhatsApp & Call",
  description:
    "Contact DRIVANA for self-drive car rental in Patna. WhatsApp +91 82526 58488, email hello@drivana.in. Located at Bhoothnath Road, Patna. Open 9 AM - 9 PM, 7 days a week.",
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
      "Reach DRIVANA on WhatsApp, call, or email. Bhoothnath Road, Patna. Open 9 AM - 9 PM daily.",
    url: "https://drivana.in/contact",
    type: "website",
    images: [
      {
        url: "/og-image.png",
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
      "WhatsApp +91 82526 58488 | Bhoothnath Road, Patna | Open 9 AM - 9 PM daily.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://drivana.in/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact DRIVANA",
    url: "https://drivana.in/contact",
    mainEntity: {
      "@type": "AutoRental",
      name: "DRIVANA - Self Drive Car Rental",
      telephone: "+91-8252658488",
      email: "hello@drivana.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bhoothnath Road",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        postalCode: "800001",
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
