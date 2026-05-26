import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Safety & Support | DRIVANA Self-Drive Car Rental Patna",
  description:
    "DRIVANA ensures your safety with regularly serviced cars, insurance coverage, on-ground breakdown support within Patna, emergency contact, and thorough vehicle inspections before and after every rental.",
  keywords: [
    "drivana safety",
    "car rental safety patna",
    "breakdown support patna",
    "self drive car insurance patna",
    "drivana roadside assistance",
    "car rental inspection patna",
    "safe car rental patna",
    "drivana emergency support",
  ],
  openGraph: {
    title: "Safety & Support | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Regularly serviced cars, insurance coverage, on-ground breakdown support, and thorough inspections. Your safety is our priority.",
    url: "https://drivana.in/safety",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Safety & Support - DRIVANA Self Drive Car Rental Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safety & Support | DRIVANA Self-Drive Car Rental Patna",
    description:
      "Serviced cars, insurance, on-ground breakdown support within Patna. Your safety comes first.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://drivana.in/safety",
  },
};

export default function SafetyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Safety & Support - DRIVANA",
    description:
      "DRIVANA's safety measures including vehicle maintenance, insurance, breakdown support, and inspection protocols.",
    url: "https://drivana.in/safety",
    mainEntity: {
      "@type": "Service",
      name: "DRIVANA Roadside Assistance",
      provider: {
        "@type": "AutoRental",
        name: "DRIVANA",
      },
      areaServed: {
        "@type": "City",
        name: "Patna",
      },
      description:
        "On-ground breakdown support within Patna city limits for all DRIVANA rental vehicles.",
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
            Safety & Support
          </h1>
          <p className="text-lg text-white/70 mb-10">
            Your safety is non-negotiable. Every car in our fleet goes through
            rigorous checks, and our on-ground team is always a call away within
            Patna.
          </p>

          {/* Vehicle Maintenance */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gold mb-4">
              Regular Servicing & Sanitization
            </h2>
            <div className="border-l-4 border-gold pl-4 py-2 bg-white/5 rounded-r">
              <ul className="text-white/70 space-y-2">
                <li>
                  Every vehicle is serviced as per manufacturer-recommended
                  schedules.
                </li>
                <li>
                  Cars are sanitized and deep-cleaned between every rental -
                  seats, steering, dashboard, and door handles.
                </li>
                <li>
                  Tyre pressure, engine oil, coolant, and brake fluid are checked
                  before each handover.
                </li>
                <li>
                  AC, lights, wipers, and all electrical systems are tested
                  before every trip.
                </li>
              </ul>
            </div>
          </div>

          {/* Insurance */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gold mb-4">
              Insurance Coverage
            </h2>
            <p className="text-white/70 mb-3">
              All DRIVANA vehicles carry valid comprehensive insurance:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-2">
              <li>
                Third-party liability coverage as mandated by Indian motor
                vehicle law.
              </li>
              <li>
                Comprehensive coverage for the vehicle against theft, fire, and
                natural disasters.
              </li>
              <li>
                In case of an accident, inform us immediately. We&apos;ll guide
                you through the insurance claim process.
              </li>
            </ul>
            <div className="border-l-4 border-gold pl-4 py-2 bg-white/5 rounded-r mt-3">
              <p className="text-white/70">
                <strong className="text-white">Note:</strong> Damage caused by
                negligence, drunk driving, or unauthorized use may not be covered
                under insurance. The renter is liable in such cases.
              </p>
            </div>
          </div>

          {/* Breakdown Support */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gold mb-4">
              On-Ground Breakdown Support
            </h2>
            <p className="text-white/70 mb-3">
              Unlike app-based services where you&apos;re left talking to a
              chatbot, DRIVANA provides real, human, on-ground support:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 mb-3">
              <li>
                <strong className="text-white">Within Patna city limits:</strong>{" "}
                Our team reaches you physically for any mechanical issue - flat
                tyre, battery dead, engine trouble.
              </li>
              <li>
                <strong className="text-white">Outside city limits:</strong> We
                coordinate with local mechanics and guide you remotely until help
                arrives.
              </li>
              <li>
                Mechanical failures due to normal use are resolved at no cost to
                you.
              </li>
              <li>
                If the issue can&apos;t be fixed on-spot, we arrange a
                replacement vehicle (subject to availability).
              </li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gold mb-4">
              Emergency Contact
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <p className="text-white/70 mb-4">
                If you face any emergency during your rental - breakdown,
                accident, or safety concern - contact us immediately:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+918252658488"
                  className="inline-flex items-center gap-2 bg-gold/20 border border-gold text-gold font-semibold px-5 py-3 rounded-lg hover:bg-gold/30 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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
                  Call: +91 82526 58488
                </a>
                <a
                  href="https://wa.me/918252658488?text=EMERGENCY:%20I%20need%20help%20with%20my%20rental%20car"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Emergency
                </a>
              </div>
              <p className="text-white/50 text-sm mt-4">
                Available during business hours (9 AM – 9 PM). For after-hours
                emergencies, WhatsApp is monitored.
              </p>
            </div>
          </div>

          {/* Vehicle Inspection */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gold mb-4">
              Vehicle Inspection Protocol
            </h2>
            <p className="text-white/70 mb-3">
              Every rental includes a thorough inspection - before and after:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border-l-4 border-gold pl-4 py-2">
                <h3 className="text-white font-medium mb-2">Before Handover</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Exterior photos documenting existing condition</li>
                  <li>• Interior cleanliness check</li>
                  <li>• Fuel level noted</li>
                  <li>• Odometer reading recorded</li>
                  <li>• All documents (RC, insurance) in the car</li>
                </ul>
              </div>
              <div className="border-l-4 border-gold pl-4 py-2">
                <h3 className="text-white font-medium mb-2">After Return</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Exterior inspection for new damage</li>
                  <li>• Interior condition check</li>
                  <li>• Fuel level compared</li>
                  <li>• Odometer reading for KM calculation</li>
                  <li>• Photos taken for records</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div>
            <h2 className="text-2xl font-semibold text-gold mb-4">
              Safety Tips for Your Drive
            </h2>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-2">
              <li>Always wear your seatbelt and ensure all passengers do too.</li>
              <li>
                Familiarize yourself with the car&apos;s controls before driving
                off.
              </li>
              <li>
                Keep our emergency number saved - call us first if anything feels
                off with the car.
              </li>
              <li>
                Avoid driving in waterlogged areas during monsoon season.
              </li>
              <li>
                If you&apos;re new to Patna, use Google Maps - some roads can be
                narrow and busy.
              </li>
              <li>
                Park in well-lit areas and always lock the car when unattended.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
