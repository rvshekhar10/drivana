import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Contact Us | DRIVANA Self-Drive Car Rental Patna — WhatsApp & Call",
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
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-white/70 mb-10">
            Have a question or ready to book? Reach out to us — we respond fast
            on WhatsApp.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gold mb-3">
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">WhatsApp</p>
                      <a
                        href="https://wa.me/918252658488"
                        className="text-gold hover:text-gold-light underline"
                      >
                        +91 82526 58488
                      </a>
                      <p className="text-white/50 text-sm mt-1">
                        Fastest way to reach us
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <a
                        href="tel:+918252658488"
                        className="text-gold hover:text-gold-light underline"
                      >
                        +91 82526 58488
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <a
                        href="mailto:hello@drivana.in"
                        className="text-gold hover:text-gold-light underline"
                      >
                        hello@drivana.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-white/70">
                        Bhoothnath Road, Patna, Bihar 800001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Business Hours</p>
                      <p className="text-white/70">
                        9:00 AM — 9:00 PM, 7 days a week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Booking CTA */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gold mb-3">
                Quick Booking
              </h2>
              <p className="text-white/70 mb-6">
                The fastest way to book a car is via WhatsApp. Just send us a
                message with your preferred car, dates, and pickup location.
              </p>
              <a
                href="https://wa.me/918252658488?text=Hi%20DRIVANA!%20I%20want%20to%20book%20a%20self-drive%20car%20in%20Patna."
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book on WhatsApp
              </a>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white font-medium mb-2">
                  What to include in your message:
                </h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Preferred car (Magnite, Tiago, Alto, Freestyle)</li>
                  <li>• Rental dates and times</li>
                  <li>• Pickup location or delivery needed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            Find Us on the Map
          </h2>
          <div className="rounded-lg overflow-hidden border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.5!2d85.1376!3d25.6093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBhoothnath+Road%2C+Patna%2C+Bihar!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DRIVANA Location - Bhoothnath Road, Patna"
            />
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
