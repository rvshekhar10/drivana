import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "About DRIVANA | Self-Drive Car Rental Platform in Patna, Bihar",
  description:
    "DRIVANA was founded to bring the self-drive car rental experience to Patna. We serve visitors from Delhi, Mumbai & Bangalore who want Zoomcar-like convenience in Bihar. Clean cars, transparent pricing, on-ground support.",
  keywords: [
    "about drivana",
    "self drive car rental patna",
    "car rental startup patna",
    "drivana patna story",
    "self drive bihar",
    "car rental bhoothnath road patna",
    "zoomcar alternative patna",
    "revv alternative patna",
  ],
  openGraph: {
    title: "About DRIVANA | Self-Drive Car Rental Platform in Patna, Bihar",
    description:
      "DRIVANA was founded to bring the self-drive car rental experience to Patna. Clean cars, transparent pricing, on-ground support for visitors from metro cities.",
    url: "https://drivana.in/about",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About DRIVANA - Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About DRIVANA | Self-Drive Car Rental Platform in Patna",
    description:
      "Founded to solve the self-drive car rental gap in Patna for visitors from metro cities.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://drivana.in/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About DRIVANA",
    description:
      "DRIVANA is a self-drive car rental platform in Patna, Bihar, founded to serve visitors from metro cities who expect a seamless car rental experience.",
    url: "https://drivana.in/about",
    mainEntity: {
      "@type": "AutoRental",
      name: "DRIVANA",
      foundingLocation: {
        "@type": "Place",
        name: "Patna, Bihar",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bhoothnath Road",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        postalCode: "800001",
        addressCountry: "IN",
      },
    },
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-6">
            About DRIVANA
          </h1>
          <p className="text-lg text-white/70 mb-10">
            The self-drive car rental platform built for Patna — by people who
            understand what visitors from metro cities expect.
          </p>

          <h2 className="text-2xl font-semibold text-gold mb-4">Our Story</h2>
          <p className="text-white/70 mb-6">
            If you&apos;ve ever flown into Patna from Delhi, Mumbai, or
            Bangalore, you know the drill. You land, open Zoomcar or Revv, and
            find… nothing. No self-drive options. Just traditional rentals with
            drivers you don&apos;t need, at prices that don&apos;t make sense.
          </p>
          <p className="text-white/70 mb-6">
            DRIVANA was born out of that exact frustration. We founded this
            platform to bridge the gap — to give visitors (and locals) the
            freedom to rent a car and drive on their own terms. No driver
            hovering. No awkward negotiations. Just you, the keys, and the open
            road.
          </p>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            Our Mission
          </h2>
          <p className="text-white/70 mb-6">
            Make self-drive car rental accessible in tier-2 cities, starting with
            Patna. We believe everyone deserves the convenience of picking up a
            clean, well-maintained car and exploring a city at their own pace —
            whether you&apos;re visiting family, attending a wedding, or here on
            business.
          </p>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            Who We Serve
          </h2>
          <p className="text-white/70 mb-6">
            Our core audience is people from metro cities — Delhi, Mumbai,
            Bangalore, Hyderabad — who are visiting Patna and expect the same
            seamless car rental experience they get back home. We also serve
            locals who want a car for a day trip, a weekend getaway, or a special
            occasion without the commitment of ownership.
          </p>

          <h2 className="text-2xl font-semibold text-gold mb-4">Our Values</h2>
          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-gold pl-4 py-2">
              <h3 className="text-lg font-medium text-white">Transparency</h3>
              <p className="text-white/70">
                No hidden charges. What you see is what you pay. KM limits, fuel
                policy, deposit — everything is upfront.
              </p>
            </div>
            <div className="border-l-4 border-gold pl-4 py-2">
              <h3 className="text-lg font-medium text-white">Clean Cars</h3>
              <p className="text-white/70">
                Every vehicle is sanitized and inspected before handover. We
                maintain our fleet to the standards you&apos;d expect from a
                metro-city rental service.
              </p>
            </div>
            <div className="border-l-4 border-gold pl-4 py-2">
              <h3 className="text-lg font-medium text-white">
                On-Ground Support
              </h3>
              <p className="text-white/70">
                Breakdown? Flat tyre? We&apos;re not a faceless app. Our team
                provides real, on-ground support within Patna city limits. One
                call and we&apos;re there.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            Our Location
          </h2>
          <p className="text-white/70 mb-2">
            We&apos;re based at <strong className="text-white">Bhoothnath Road, Patna, Bihar 800001</strong>.
            Pickup and delivery available across Patna city.
          </p>
          <p className="text-white/70">
            Have questions? Reach us on WhatsApp at{" "}
            <a
              href="https://wa.me/918252658488"
              className="text-gold hover:text-gold-light underline"
            >
              +91 82526 58488
            </a>
            .
          </p>
        </div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
