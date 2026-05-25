import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drivana.in"),
  title: {
    default:
      "DRIVANA | Self-Drive Car Rental in Patna, Bihar - Book via WhatsApp",
    template: "%s | DRIVANA - Self Drive Car Rental Patna",
  },
  description:
    "Rent self-drive cars in Patna starting ₹1,399/day. Well-maintained Nissan Magnite, Tata Tiago, Alto & Ford Freestyle. No driver needed. Transparent pricing, doorstep delivery at Bhoothnath Road. Book instantly on WhatsApp.",
  keywords: [
    "self drive car rental patna",
    "car rental patna",
    "rent a car patna",
    "self drive car patna bihar",
    "car hire patna",
    "drivana",
    "self drive bihar",
    "car on rent in patna",
    "patna car rental without driver",
    "cheap car rental patna",
    "magnite on rent patna",
    "tiago on rent patna",
    "alto on rent patna",
    "self drive car rental near me",
    "car rental patna bhoothnath road",
    "car rental patna airport",
    "monthly car rental patna",
    "wedding car rental patna",
    "outstation car rental patna",
    "car rental patna without driver",
  ],
  authors: [{ name: "Drivana", url: "https://drivana.in" }],
  creator: "Drivana",
  publisher: "Drivana",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://drivana.in",
    siteName: "DRIVANA",
    title: "DRIVANA | Self-Drive Car Rental in Patna - Book via WhatsApp",
    description:
      "Rent self-drive cars in Patna starting ₹1,399/day. Nissan Magnite, Tata Tiago, Alto & more. No driver needed. Book instantly on WhatsApp.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DRIVANA - Self Drive Car Rental in Patna, Bihar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRIVANA | Self-Drive Car Rental in Patna",
    description:
      "Rent self-drive cars in Patna starting ₹1,399/day. Book instantly on WhatsApp.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://drivana.in",
  },
  category: "Car Rental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoRental",
        "@id": "https://drivana.in/#business",
        name: "DRIVANA - Self Drive Car Rental",
        alternateName: "Drivana",
        url: "https://drivana.in",
        logo: "https://drivana.in/IMG_8609.PNG",
        image: "https://drivana.in/og-image.png",
        description:
          "Premium self-drive car rental service in Patna, Bihar. Rent well-maintained cars without a driver at affordable prices. Book via WhatsApp.",
        telephone: "+91-8252658488",
        email: "hello@drivana.in",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Patna",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          postalCode: "800001",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "25.6093",
          longitude: "85.1376",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Patna",
          },
          {
            "@type": "State",
            name: "Bihar",
          },
        ],
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
        priceRange: "₹1399 - ₹2198 per day",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Bank Transfer",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.4",
          reviewCount: "10",
          bestRating: "5",
          worstRating: "1",
        },
        sameAs: [
          "https://www.instagram.com/drivana.in",
          "https://www.facebook.com/drivana.in",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://drivana.in/#website",
        url: "https://drivana.in",
        name: "DRIVANA",
        publisher: {
          "@id": "https://drivana.in/#business",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://drivana.in/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What documents do I need to rent a self-drive car in Patna?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You need a valid driving license, Aadhaar card (or any government ID), and a security deposit starting from ₹5,000. The process is quick and hassle-free.",
            },
          },
          {
            "@type": "Question",
            name: "What is the minimum rental duration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The minimum rental duration is 24 hours. We also offer weekly and monthly packages at discounted rates.",
            },
          },
          {
            "@type": "Question",
            name: "Is fuel included in the rental price?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, fuel is not included. You receive the car with a certain fuel level and are expected to return it at the same level.",
            },
          },
          {
            "@type": "Question",
            name: "Do you provide doorstep delivery in Patna?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! We offer free doorstep delivery and pickup within Patna city limits. For locations outside the city, a nominal delivery charge applies.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the car breaks down?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We provide 24/7 roadside assistance. In case of a breakdown, call us immediately and we will arrange a replacement vehicle or repair at no extra cost.",
            },
          },
          {
            "@type": "Question",
            name: "Can I take the car for outstation trips from Patna?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, outstation trips are allowed. Inform us about your travel plan while booking. Additional per-km charges may apply beyond the included limit.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/IMG_8609.PNG" type="image/png" />
        <link rel="apple-touch-icon" href="/IMG_8609.PNG" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4AF37" />
        <meta name="geo.region" content="IN-BR" />
        <meta name="geo.placename" content="Patna" />
        <meta name="geo.position" content="25.6093;85.1376" />
        <meta name="ICBM" content="25.6093, 85.1376" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
