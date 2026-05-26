import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Privacy Policy | DRIVANA — Self-Drive Car Rental Patna",
  description:
    "DRIVANA's privacy policy explains how we collect, use, and protect your personal data including driving license, Aadhaar, and contact information for self-drive car rental verification in Patna.",
  keywords: [
    "drivana privacy policy",
    "car rental privacy patna",
    "drivana data protection",
    "self drive car rental privacy",
    "drivana personal data",
  ],
  openGraph: {
    title: "Privacy Policy | DRIVANA — Self-Drive Car Rental Patna",
    description:
      "How DRIVANA collects, uses, and protects your personal data for self-drive car rental verification.",
    url: "https://drivana.in/privacy",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - DRIVANA Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | DRIVANA — Self-Drive Car Rental Patna",
    description:
      "How DRIVANA handles your personal data. No data sold to third parties.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://drivana.in/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-6">
            Privacy Policy
          </h1>
          <p className="text-white/70 mb-10">
            At DRIVANA, we respect your privacy. This policy explains what data
            we collect, why we collect it, and how we protect it. By using our
            services, you agree to the practices described below.
          </p>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            1. Information We Collect
          </h2>
          <p className="text-white/70 mb-3">
            We collect the following information for the purpose of identity
            verification and rental processing:
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              <strong className="text-white">Full Name</strong> — to identify
              you and create your rental record.
            </li>
            <li>
              <strong className="text-white">Phone Number</strong> — for
              communication regarding your booking via WhatsApp and calls.
            </li>
            <li>
              <strong className="text-white">Driving License</strong> — to
              verify that you hold a valid license to drive the rented vehicle.
            </li>
            <li>
              <strong className="text-white">Aadhaar Card / Government ID</strong>{" "}
              — for identity verification as required for vehicle handover.
            </li>
            <li>
              <strong className="text-white">Pickup/Drop Location</strong> — to
              arrange delivery and return of the vehicle.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            2. How We Use Your Data
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>To verify your identity before handing over the vehicle.</li>
            <li>
              To communicate with you about your booking, pickup, and return via
              WhatsApp and phone calls.
            </li>
            <li>
              To maintain rental records for operational and legal purposes.
            </li>
            <li>
              To contact you regarding refunds, damage claims, or disputes.
            </li>
            <li>
              To send you promotional offers or updates (only with your consent;
              you can opt out anytime).
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            3. WhatsApp Communication
          </h2>
          <p className="text-white/70 mb-8">
            DRIVANA primarily communicates via WhatsApp for bookings,
            confirmations, and support. By initiating a conversation with us on
            WhatsApp, you consent to receiving messages related to your rental.
            We do not use automated bots — all conversations are handled by our
            team.
          </p>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            4. Data Sharing
          </h2>
          <div className="border-l-4 border-gold pl-4 py-3 bg-white/5 rounded-r mb-8">
            <p className="text-white font-medium mb-2">
              We do NOT sell your data to third parties.
            </p>
            <p className="text-white/70">
              Your personal information is never shared with advertisers,
              marketing agencies, or data brokers. We may share limited
              information with law enforcement only if legally required.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            5. Data Storage & Security
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              Your documents (DL, Aadhaar photos) are stored securely and
              deleted within 30 days of rental completion.
            </li>
            <li>
              Basic rental records (name, phone, dates) are retained for
              operational purposes.
            </li>
            <li>
              We use reasonable security measures to protect your data from
              unauthorized access.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            6. Your Rights
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              You can request deletion of your personal data by contacting us.
            </li>
            <li>
              You can opt out of promotional messages at any time by replying
              &quot;STOP&quot; on WhatsApp.
            </li>
            <li>
              You can request a copy of the data we hold about you.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            7. Cookies & Website Analytics
          </h2>
          <p className="text-white/70 mb-8">
            Our website uses Vercel Analytics to understand traffic patterns. We
            do not use third-party tracking cookies or retargeting pixels. No
            personally identifiable information is collected through our website
            analytics.
          </p>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            8. Changes to This Policy
          </h2>
          <p className="text-white/70 mb-8">
            We may update this privacy policy from time to time. Changes will be
            posted on this page. Continued use of our services after changes
            constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-semibold text-gold mb-4">
            9. Contact Us
          </h2>
          <p className="text-white/70">
            For any privacy-related questions or requests, reach us at:
          </p>
          <ul className="text-white/70 space-y-1 mt-2">
            <li>
              WhatsApp:{" "}
              <a
                href="https://wa.me/918252658488"
                className="text-gold hover:text-gold-light underline"
              >
                +91 82526 58488
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:hello@drivana.in"
                className="text-gold hover:text-gold-light underline"
              >
                hello@drivana.in
              </a>
            </li>
            <li>Address: Bhoothnath Road, Patna, Bihar 800001</li>
          </ul>
        </div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
