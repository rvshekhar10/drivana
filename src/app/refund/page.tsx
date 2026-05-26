import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Refund Policy | DRIVANA Self-Drive Car Rental Patna",
  description:
    "DRIVANA's refund policy covers security deposit refunds, damage deductions, cancellation refunds, and timelines. Transparent refund process for self-drive car rentals in Patna.",
  keywords: [
    "drivana refund policy",
    "car rental refund patna",
    "security deposit refund drivana",
    "cancellation refund car rental patna",
    "drivana deposit return",
    "self drive car refund policy",
  ],
  openGraph: {
    title: "Refund Policy | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Security deposit refunds, damage deductions, and cancellation refund timelines for DRIVANA car rentals in Patna.",
    url: "https://drivana.in/refund",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Refund Policy - DRIVANA Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Transparent refund process. Security deposit returned within 24-48 hours of vehicle return.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://drivana.in/refund",
  },
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-6">
            Refund Policy
          </h1>
          <p className="text-white/70 mb-10">
            We believe in transparency. Here&apos;s exactly how refunds work at
            DRIVANA - no surprises, no hidden deductions.
          </p>

          {/* Security Deposit Refund */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            1. Security Deposit Refund
          </h2>
          <div className="border-l-4 border-gold pl-4 py-3 bg-white/5 rounded-r mb-4">
            <ul className="text-white/70 space-y-2">
              <li>
                <strong className="text-white">Maruti Alto:</strong> ₹3,000
                deposit
              </li>
              <li>
                <strong className="text-white">All other vehicles:</strong>{" "}
                ₹5,000 deposit
              </li>
            </ul>
          </div>
          <p className="text-white/70 mb-3">
            Your security deposit is fully refundable upon satisfactory return of
            the vehicle. The refund process:
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              Vehicle is inspected at the time of return for damage, cleanliness,
              and fuel level.
            </li>
            <li>
              If no issues are found, the full deposit is refunded within{" "}
              <strong className="text-white">24–48 hours</strong> via UPI or
              bank transfer.
            </li>
            <li>
              If deductions apply, you&apos;ll be informed of the exact amount
              and reason before the refund is processed.
            </li>
          </ul>

          {/* Damage Deductions */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            2. Damage Deductions
          </h2>
          <p className="text-white/70 mb-3">
            Deductions from the security deposit may apply in the following
            cases:
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-2">
            <li>
              <strong className="text-white">New scratches or dents:</strong>{" "}
              Repair cost as assessed at a local service center.
            </li>
            <li>
              <strong className="text-white">Broken parts:</strong> Replacement
              cost of the damaged component.
            </li>
            <li>
              <strong className="text-white">Interior damage:</strong> Stains,
              burns, or tears - cleaning or repair cost.
            </li>
            <li>
              <strong className="text-white">Excessive cleaning required:</strong>{" "}
              ₹300–₹500 for heavy dirt, pet hair, smoke smell, or food stains.
            </li>
            <li>
              <strong className="text-white">Missing fuel:</strong> Fuel cost at
              prevailing rates + ₹100 convenience charge.
            </li>
          </ul>
          <div className="border-l-4 border-gold pl-4 py-2 bg-white/5 rounded-r mb-8">
            <p className="text-white/70">
              <strong className="text-white">Note:</strong> Pre-existing damage
              is documented before handover. You will not be charged for anything
              that was already noted.
            </p>
          </div>

          {/* Cancellation Refunds */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            3. Cancellation Refunds
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 pr-4 text-gold font-semibold">
                    When You Cancel
                  </th>
                  <th className="py-3 text-gold font-semibold">Refund</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">24+ hours before pickup</td>
                  <td className="py-3">
                    <span className="text-green-400">Full refund</span> - no
                    cancellation fee
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">12–24 hours before pickup</td>
                  <td className="py-3">
                    50% of one day&apos;s rental deducted as cancellation fee
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">Less than 12 hours / No-show</td>
                  <td className="py-3">
                    Full day&apos;s rental charged - no refund on rental amount
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white/70 mb-8">
            Security deposit paid in advance is always refunded in full
            regardless of cancellation timing.
          </p>

          {/* Refund Timeline */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            4. Refund Timeline
          </h2>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-8 ml-2">
            <li>
              <strong className="text-white">Security deposit:</strong> 24–48
              hours after vehicle return and inspection.
            </li>
            <li>
              <strong className="text-white">Cancellation refund:</strong>{" "}
              Within 48 hours of cancellation confirmation.
            </li>
            <li>
              <strong className="text-white">Refund method:</strong> Same method
              as payment (UPI or bank transfer). Cash deposits are refunded via
              UPI.
            </li>
          </ul>

          {/* Disputes */}
          <h2 className="text-2xl font-semibold text-gold mb-4">
            5. Disputes
          </h2>
          <p className="text-white/70 mb-8">
            If you disagree with any deduction, reach out to us within 7 days of
            the refund. We&apos;ll review the inspection photos and discuss the
            matter. We aim to resolve all disputes fairly and promptly.
          </p>

          <div className="border-l-4 border-gold pl-4 py-3 bg-white/5 rounded-r">
            <p className="text-white/70">
              <strong className="text-white">Need help with a refund?</strong>{" "}
              WhatsApp us at{" "}
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
