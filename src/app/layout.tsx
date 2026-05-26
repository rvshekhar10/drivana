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
      "Self-Drive Car Rental in Patna | ₹1,399/day | DRIVANA - Book on WhatsApp",
    template: "%s | DRIVANA - Self Drive Car Rental Patna",
  },
  description:
    "Rent self-drive cars in Patna starting ₹1,399/day. Nissan Magnite, Tata Tiago, Maruti Alto & Ford Freestyle. No driver needed. Doorstep delivery at Bhoothnath Road. 15% off weekly, 20% off monthly. Book instantly on WhatsApp +91 82526 58488.",
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
    "ford freestyle on rent patna",
    "self drive car rental near me",
    "car rental patna bhoothnath road",
    "car rental patna airport",
    "monthly car rental patna",
    "weekly car rental patna",
    "wedding car rental patna",
    "outstation car rental patna",
    "car rental patna without driver",
    "car rental patna to rajgir",
    "car rental patna to bodh gaya",
    "car rental patna to varanasi",
    "car rental patna to ranchi",
    "zoomcar patna alternative",
    "revv patna alternative",
    "self drive suv patna",
    "hatchback on rent patna",
    "car rental for wedding patna",
    "car rental for business trip patna",
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
    title: "Self-Drive Car Rental in Patna | ₹1,399/day - DRIVANA",
    description:
      "Rent self-drive cars in Patna from ₹1,399/day. Magnite, Tiago, Alto, Freestyle. No driver. Doorstep delivery. Book on WhatsApp.",
    images: [
      {
        url: "/drivana-hero-image.avif",
        width: 1200,
        height: 630,
        alt: "DRIVANA - Self Drive Car Rental in Patna, Bihar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Self-Drive Car Rental in Patna | ₹1,399/day - DRIVANA",
    description:
      "Rent self-drive cars in Patna. No driver needed. Book on WhatsApp +91 82526 58488.",
    images: ["/drivana-hero-image.avif"],
  },
  alternates: {
    canonical: "https://drivana.in",
    languages: {
      "en-IN": "https://drivana.in",
    },
  },
  category: "Car Rental",
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization / AutoRental
      {
        "@type": ["AutoRental", "LocalBusiness"],
        "@id": "https://drivana.in/#business",
        name: "DRIVANA - Self Drive Car Rental Patna",
        alternateName: ["Drivana", "DRIVANA Patna", "Drivana Car Rental"],
        url: "https://drivana.in",
        logo: {
          "@type": "ImageObject",
          url: "https://drivana.in/drivana-logo-patna.png",
          width: 180,
          height: 50,
        },
        image: [
          "https://drivana.in/drivana-hero-image.avif",
          "https://drivana.in/drivana-logo-patna.png",
        ],
        description:
          "DRIVANA is Patna's premium self-drive car rental platform. Rent well-maintained Nissan Magnite, Tata Tiago, Maruti Alto & Ford Freestyle without a driver. Starting ₹1,399/day with doorstep delivery. Book via WhatsApp.",
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
        geo: {
          "@type": "GeoCoordinates",
          latitude: 25.6093,
          longitude: 85.1376,
        },
        hasMap: "https://maps.google.com/?q=Bhoothnath+Road+Patna+Bihar",
        areaServed: [
          { "@type": "City", name: "Patna" },
          { "@type": "State", name: "Bihar" },
          { "@type": "City", name: "Danapur" },
          { "@type": "City", name: "Hajipur" },
        ],
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 25.6093,
            longitude: 85.1376,
          },
          geoRadius: "50000",
        },
        openingHoursSpecification: [
          {
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
        ],
        priceRange: "₹1,399 - ₹2,198 per day",
        currenciesAccepted: "INR",
        paymentAccepted: ["Cash", "UPI", "Bank Transfer"],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.4",
          reviewCount: "10",
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Ankit Sharma" },
            reviewRating: { "@type": "Rating", ratingValue: "5" },
            reviewBody:
              "Booked the Magnite for a wedding in Danapur. Car delivered to hotel within an hour. Way better than local cabs.",
          },
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Priya Menon" },
            reviewRating: { "@type": "Rating", ratingValue: "5" },
            reviewBody:
              "The Tiago was brand new and spotless. Drove to Rajgir and Nalanda. WhatsApp booking was smoother than any app.",
          },
        ],
        sameAs: [
          "https://www.instagram.com/drivana.in",
          "https://www.facebook.com/drivana.in",
        ],
        knowsAbout: [
          "Self-drive car rental",
          "Car hire without driver",
          "Vehicle rental Patna",
          "Outstation car rental Bihar",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Self-Drive Cars in Patna",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Car",
                name: "Nissan Magnite 2023",
                vehicleConfiguration: "SUV",
              },
              price: "2198",
              priceCurrency: "INR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "2198",
                priceCurrency: "INR",
                unitText: "DAY",
              },
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Car",
                name: "Tata Tiago 2025",
                vehicleConfiguration: "Hatchback",
              },
              price: "1999",
              priceCurrency: "INR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "1999",
                priceCurrency: "INR",
                unitText: "DAY",
              },
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Car",
                name: "Maruti Alto 2012",
                vehicleConfiguration: "Hatchback",
              },
              price: "1399",
              priceCurrency: "INR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "1399",
                priceCurrency: "INR",
                unitText: "DAY",
              },
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Car",
                name: "Ford Freestyle 2018",
                vehicleConfiguration: "Crossover",
              },
              price: "2198",
              priceCurrency: "INR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "2198",
                priceCurrency: "INR",
                unitText: "DAY",
              },
              availability: "https://schema.org/InStock",
            },
          ],
        },
      },
      // WebSite with SearchAction
      {
        "@type": "WebSite",
        "@id": "https://drivana.in/#website",
        url: "https://drivana.in",
        name: "DRIVANA",
        description: "Self-drive car rental platform in Patna, Bihar",
        publisher: { "@id": "https://drivana.in/#business" },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://drivana.in/fleet?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": "https://drivana.in/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://drivana.in",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Self-Drive Cars",
            item: "https://drivana.in/fleet",
          },
        ],
      },
      // FAQPage
      {
        "@type": "FAQPage",
        "@id": "https://drivana.in/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What documents do I need to rent a self-drive car in Patna?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You need a valid driving license, Aadhaar card (or any government ID), and a security deposit (₹3,000 for Alto, ₹5,000 for other cars). The process is quick - verify on WhatsApp and pick up the car.",
            },
          },
          {
            "@type": "Question",
            name: "What is the minimum rental duration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The minimum rental duration is 24 hours. We offer weekly rentals at 15% discount and monthly rentals at 20% discount.",
            },
          },
          {
            "@type": "Question",
            name: "Is fuel included in the rental price?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, fuel is not included in any rental plan. You receive the car with a noted fuel level and return it at the same level.",
            },
          },
          {
            "@type": "Question",
            name: "Do you provide doorstep delivery in Patna?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! We offer free doorstep delivery and pickup within Patna city limits including Boring Road, Bailey Road, Kankarbagh, Patliputra, and Danapur.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the car breaks down?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We provide on-ground breakdown support within Patna city limits. Our team physically reaches you for any mechanical issue. For outstation breakdowns, we coordinate remotely with local mechanics.",
            },
          },
          {
            "@type": "Question",
            name: "Can I take the car for outstation trips from Patna?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, outstation trips to Rajgir, Nalanda, Bodh Gaya, Varanasi, Ranchi and more are allowed. Inform us while booking. KM limits apply (200-250 km/day depending on vehicle).",
            },
          },
          {
            "@type": "Question",
            name: "How much is the security deposit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Security deposit is ₹3,000 for Maruti Alto and ₹5,000 for Nissan Magnite, Tata Tiago, and Ford Freestyle. Refundable within 24-48 hours after vehicle return.",
            },
          },
          {
            "@type": "Question",
            name: "What are the km limits per day?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Maruti Alto: 200 km/day (₹7/km excess). Tata Tiago: 250 km/day (₹8/km excess). Nissan Magnite: 250 km/day (₹8/km excess). Ford Freestyle: 200 km/day (₹9/km excess).",
            },
          },
          {
            "@type": "Question",
            name: "Is there a Zoomcar or Revv alternative in Patna?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! DRIVANA is Patna's self-drive car rental platform - built as an alternative to Zoomcar and Revv which don't operate in Patna. Book via WhatsApp, no app needed.",
            },
          },
          {
            "@type": "Question",
            name: "What is the cancellation policy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Free cancellation 24+ hours before pickup. 12-24 hours: 50% of one day charged. Less than 12 hours or no-show: full day charged. Security deposit is always refunded.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/drivana-logo-patna.png" type="image/png" />
        <link rel="apple-touch-icon" href="/drivana-logo-patna.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4AF37" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="geo.region" content="IN-BR" />
        <meta name="geo.placename" content="Patna" />
        <meta name="geo.position" content="25.6093;85.1376" />
        <meta name="ICBM" content="25.6093, 85.1376" />
        <meta name="format-detection" content="telephone=yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
