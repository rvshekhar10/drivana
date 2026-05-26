import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Terms & Conditions | DRIVANA Self-Drive Car Rental Patna",
  description:
    "Read the terms and conditions for renting a self-drive car from DRIVANA in Patna. Eligibility, booking policy, security deposit, KM limits, cancellation, and vehicle return conditions.",
  keywords: [
    "drivana terms and conditions",
    "car rental terms patna",
    "self drive car rules patna",
    "drivana cancellation policy",
    "security deposit car rental patna",
    "km limit car rental patna",
    "car rental eligibility patna",
  ],
  openGraph: {
    title: "Terms & Conditions | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Eligibility, booking policy, security deposit, KM limits, cancellation, and vehicle return conditions for DRIVANA car rentals.",
    url: "https://drivana.in/terms",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Terms & Conditions - DRIVANA Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Complete terms for renting a self-drive car from DRIVANA in Patna.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://drivana.in/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-6">
            Terms & Conditions
          </h1>
          <p className="text-white/70 mb-10">
            By renting a vehicle from DRIVANA, you agree to the following terms.
            Please read them carefully before booking.
          </p>

          {/* Eligibility */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            1. Eligibility
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>You must be at least 18 years of age.</li>
            <li>
              A valid Indian Driving License (original) is mandatory at the time
              of pickup.
            </li>
            <li>
              A government-issued photo ID (Aadhaar Card, Passport, or Voter ID)
              is required for verification.
            </li>
            <li>
              International visitors must carry a valid International Driving
              Permit (IDP) along with their passport.
            </li>
          </ul>

          {/* Booking & Payment */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            2. Booking & Payment
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              Bookings are confirmed only after document verification and
              security deposit payment.
            </li>
            <li>
              Payment can be made via UPI, bank transfer, or cash at the time of
              pickup.
            </li>
            <li>
              Rental charges are calculated on a 24-hour basis from the time of
              pickup.
            </li>
            <li>
              Late returns will be charged on a pro-rata basis (hourly rate
              applicable after a 30-minute grace period).
            </li>
          </ul>

          {/* Cancellation */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            3. Cancellation Policy
          </h2>
          <div className="border-l-4 border-gold pl-4 py-2 bg-white/5 rounded-r mb-8">
            <ul className="text-white/70 space-y-2">
              <li>
                <strong className="text-white">
                  24+ hours before pickup:
                </strong>{" "}
                Full refund, no cancellation fee.
              </li>
              <li>
                <strong className="text-white">
                  12–24 hours before pickup:
                </strong>{" "}
                50% of one day&apos;s rental charged as cancellation fee.
              </li>
              <li>
                <strong className="text-white">
                  Less than 12 hours / No-show:
                </strong>{" "}
                Full day&apos;s rental charged.
              </li>
            </ul>
          </div>

          {/* Security Deposit */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            4. Security Deposit
          </h2>
          <div className="border-l-4 border-gold pl-4 py-2 bg-white/5 rounded-r mb-4">
            <ul className="text-white/70 space-y-2">
              <li>
                <strong className="text-white">Maruti Alto:</strong> ₹3,000
                refundable deposit
              </li>
              <li>
                <strong className="text-white">All other vehicles:</strong>{" "}
                ₹5,000 refundable deposit
              </li>
            </ul>
          </div>
          <p className="text-white/70 mb-8">
            The deposit is refunded within 24–48 hours of vehicle return after
            inspection. Deductions may apply for damages, excessive dirt/stains,
            or missing fuel.
          </p>

          {/* KM Limits */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            5. Kilometre Limits
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              Each vehicle has a daily KM limit as mentioned on the car listing
              page.
            </li>
            <li>
              Excess kilometres are charged at the per-km rate specified for each
              vehicle.
            </li>
            <li>
              For outstation trips, inform us at the time of booking. Additional
              KM packages may be available.
            </li>
          </ul>

          {/* Fuel Policy */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            6. Fuel Policy
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>Fuel is NOT included in the rental price.</li>
            <li>
              The car is handed over with a noted fuel level. You must return it
              at the same level.
            </li>
            <li>
              If the fuel level is lower upon return, the difference will be
              deducted from your deposit at prevailing fuel rates + a ₹100
              convenience charge.
            </li>
          </ul>

          {/* Vehicle Return */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            7. Vehicle Return Conditions
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              Return the vehicle at the agreed time and location. A 30-minute
              grace period is allowed.
            </li>
            <li>
              The car must be returned in a reasonably clean condition (interior
              and exterior).
            </li>
            <li>
              Excessive dirt, stains, pet hair, or smoke smell may result in a
              cleaning fee of ₹300–₹500 deducted from the deposit.
            </li>
            <li>
              Any new damage (scratches, dents, broken parts) will be assessed
              and repair costs deducted from the deposit. If repair costs exceed
              the deposit, you are liable for the difference.
            </li>
          </ul>

          {/* Breakdown Support */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            8. Breakdown & Support
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              On-ground breakdown support is available within Patna city limits.
            </li>
            <li>
              For breakdowns outside city limits, we will assist remotely and
              coordinate with local mechanics where possible.
            </li>
            <li>
              Mechanical failures due to normal use are covered by DRIVANA at no
              cost to you.
            </li>
            <li>
              Damage caused by negligence, rash driving, or misuse is the
              renter&apos;s responsibility.
            </li>
          </ul>

          {/* Prohibited Use */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            9. Prohibited Use
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              The vehicle must not be used for racing, off-roading, or any
              illegal activity.
            </li>
            <li>
              Sub-letting or allowing unauthorized persons to drive is strictly
              prohibited.
            </li>
            <li>
              Driving under the influence of alcohol or drugs is prohibited and
              will result in immediate termination of the rental.
            </li>
            <li>
              Traffic violations and challans incurred during the rental period
              are the renter&apos;s responsibility.
            </li>
          </ul>

          {/* Liability */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            10. Liability
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              DRIVANA is not liable for any loss of personal belongings left in
              the vehicle.
            </li>
            <li>
              In case of an accident, the renter must inform DRIVANA immediately
              and file a police report if required.
            </li>
            <li>
              The renter is responsible for all fines, tolls, and parking charges
              incurred during the rental period.
            </li>
          </ul>

          <div className="border-l-4 border-gold pl-4 py-3 bg-white/5 rounded-r">
            <p className="text-white/70">
              <strong className="text-white">Questions?</strong> Reach us on
              WhatsApp at{" "}
              <a
                href="https://wa.me/918252658488"
                className="text-gold hover:text-gold-light underline"
              >
                +91 82526 58488
              </a>{" "}
              or email{" "}
              <a
                href="mailto:hello@drivana.in"
                className="text-gold hover:text-gold-light underline"
              >
                hello@drivana.in
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
