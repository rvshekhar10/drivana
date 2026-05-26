import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Fleet from "@/components/Fleet";
import HowItWorks from "@/components/HowItWorks";
import WhyDrivana from "@/components/WhyDrivana";
import Destinations from "@/components/Destinations";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Fleet />
      <HowItWorks />
      <WhyDrivana />
      <Destinations />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
