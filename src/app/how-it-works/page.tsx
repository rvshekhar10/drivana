import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

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
        text: "Message us on WhatsApp at +91 82526 58488 with your preferred car, dates, and pickup location.",
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
        text: "Pick up the car from Bhoothnath Road or get free doorstep delivery within Patna city limits.",
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
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-6">
            How DRIVANA Works
          </h1>
          <p className="text-lg text-white/70 mb-12">
            Renting a self-drive car in Patna is as simple as sending a WhatsApp
            message. No app downloads, no lengthy forms. Here&apos;s how it
            works:
          </p>

          {/* Step 1 */}
          <div className="mb-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                <span className="text-gold font-bold text-lg">1</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gold mb-2">
                  Send a WhatsApp Message
                </h2>
                <p className="text-white/70 mb-2">
                  Message us at{" "}
                  <a
                    href="https://wa.me/918252658488"
                    className="text-gold hover:text-gold-light underline"
                  >
                    +91 82526 58488
                  </a>{" "}
                  with:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1 ml-2">
                  <li>Your preferred car (Magnite, Tiago, Alto, Freestyle)</li>
                  <li>Rental dates and times</li>
                  <li>Pickup location or if you need delivery</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                <span className="text-gold font-bold text-lg">2</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gold mb-2">
                  Quick Verification
                </h2>
                <p className="text-white/70 mb-3">
                  Share photos of the following documents on WhatsApp:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1 ml-2 mb-3">
                  <li>Valid Driving License (original required at pickup)</li>
                  <li>Aadhaar Card or Government ID</li>
                </ul>
                <div className="border-l-4 border-gold pl-4 py-2 bg-white/5 rounded-r">
                  <p className="text-white/70">
                    <strong className="text-white">Security Deposit:</strong>{" "}
                    ₹3,000 for Maruti Alto | ₹5,000 for all other cars.
                    Refundable upon return.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                <span className="text-gold font-bold text-lg">3</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gold mb-2">
                  Pickup or Doorstep Delivery
                </h2>
                <p className="text-white/70 mb-2">
                  Choose what works for you:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1 ml-2">
                  <li>
                    <strong className="text-white">Self-pickup:</strong> Collect
                    the car from our location at Bhoothnath Road, Patna
                  </li>
                  <li>
                    <strong className="text-white">Doorstep delivery:</strong>{" "}
                    Free delivery within Patna city limits
                  </li>
                </ul>
                <p className="text-white/70 mt-2">
                  We&apos;ll do a quick walkthrough of the car, note existing
                  scratches/dents, and hand over the keys.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="mb-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                <span className="text-gold font-bold text-lg">4</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gold mb-2">
                  Drive & Return
                </h2>
                <p className="text-white/70 mb-2">
                  Enjoy your drive! When your rental period ends:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1 ml-2">
                  <li>Return the car at the agreed time and location</li>
                  <li>Fuel level should match what you received</li>
                  <li>
                    We inspect the car and refund your deposit (minus any
                    deductions if applicable)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="mt-12 bg-white/5 rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold text-gold mb-4">
              Good to Know
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-gold pl-4">
                <h3 className="text-white font-medium">KM Limits</h3>
                <p className="text-white/70">
                  Each vehicle comes with a daily KM limit (mentioned on the car
                  listing). Excess KMs are charged per km as per the vehicle
                  rate.
                </p>
              </div>
              <div className="border-l-4 border-gold pl-4">
                <h3 className="text-white font-medium">Fuel Policy</h3>
                <p className="text-white/70">
                  Fuel is not included in the rental price. You receive the car
                  with a certain fuel level and return it at the same level.
                </p>
              </div>
              <div className="border-l-4 border-gold pl-4">
                <h3 className="text-white font-medium">Breakdown Support</h3>
                <p className="text-white/70">
                  If anything goes wrong within Patna city limits, call us. Our
                  on-ground team will reach you for support.
                </p>
              </div>
              <div className="border-l-4 border-gold pl-4">
                <h3 className="text-white font-medium">Cancellation</h3>
                <p className="text-white/70">
                  Free cancellation up to 24 hours before your booking start
                  time. After that, a cancellation fee may apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
