import { Metadata } from "next";
import AboutClient from "./AboutClient";

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
    url: "https://www.drivana.co.in/about",
    type: "website",
    images: [
      {
        url: "/drivana-og-image.jpg",
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
    images: ["/drivana-og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.drivana.co.in/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
