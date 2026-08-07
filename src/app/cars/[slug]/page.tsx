import { Metadata } from "next";
import { notFound } from "next/navigation";
import carsData from "@/data/cars.json";
import { getXRMListingBySlug } from "@/lib/xrmlite";
import { adaptAssetToListing } from "@/lib/asset-adapter";
import CarDetailClient from "./CarDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

// Static params from our known data (ensures SSG for existing cars)
export async function generateStaticParams() {
  return carsData.map((car) => ({
    slug: car.slug,
  }));
}

/**
 * Fetch car data — tries XRMlite API first, falls back to static JSON.
 */
async function getCarData(slug: string) {
  // Try API first
  try {
    const result = await getXRMListingBySlug(slug);
    if (result.success && result.data) {
      return adaptAssetToListing(result.data);
    }
  } catch {
    // API failed, fall through to static
  }

  // Fallback to static data
  const staticCar = carsData.find((c) => c.slug === slug);
  return staticCar || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarData(slug);

  if (!car) {
    return { title: "Car Not Found" };
  }

  const title = `${car.name} on Rent in Patna | ₹${car.price_per_day}/day Self Drive | DRIVANA`;
  const description = `Rent ${car.name} ${car.model} in Patna at just ₹${car.price_per_day}/day. ${car.transmission} transmission, ${car.fuel_type}, ${car.specs.seating_capacity}. Pickup from ${car.pickup_location}. Book via WhatsApp. ${car.discount}% off!`;

  return {
    title,
    description,
    keywords: [
      `${car.name.toLowerCase()} on rent in patna`,
      `${car.name.toLowerCase()} rental patna`,
      `self drive ${car.name.toLowerCase()} patna`,
      `${car.name.toLowerCase()} without driver patna`,
      `rent ${car.name.toLowerCase()} patna`,
      `${car.name.toLowerCase()} hire patna`,
      `${car.category.toLowerCase()} on rent patna`,
      `cheap car rental patna`,
      `self drive car bhoothnath road patna`,
      `car rental near me patna`,
    ],
    openGraph: {
      title: `${car.name} on Rent in Patna - ₹${car.price_per_day}/day | DRIVANA`,
      description,
      url: `https://www.drivana.co.in/cars/${car.slug}`,
      images: [{ url: car.image_url, width: 800, height: 500, alt: `${car.name} ${car.model} on rent in Patna` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${car.name} on Rent - ₹${car.price_per_day}/day | DRIVANA Patna`,
      description,
      images: [car.image_url],
    },
    alternates: {
      canonical: `https://www.drivana.co.in/cars/${car.slug}`,
    },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = await getCarData(slug);

  if (!car) {
    notFound();
  }

  // JSON-LD for individual car (Product + Offer schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${car.name} ${car.model} - Self Drive Rental`,
    description: car.description,
    image: `https://www.drivana.co.in${car.image_url}`,
    brand: {
      "@type": "Brand",
      name: car.specs.brand,
    },
    category: `${car.category} Car Rental`,
    offers: {
      "@type": "Offer",
      price: car.price_per_day,
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoRental",
        name: "DRIVANA",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Bhootnath Road",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          postalCode: "800026",
          addressCountry: "IN",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: car.rating.toString(),
      reviewCount: car.review_count.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Transmission", value: car.transmission },
      { "@type": "PropertyValue", name: "Fuel Type", value: car.fuel_type },
      { "@type": "PropertyValue", name: "Seating", value: car.specs.seating_capacity },
      { "@type": "PropertyValue", name: "Engine", value: car.specs.engine_capacity },
    ],
  };

  // Get other cars for "You may also like" (static fallback is fine here)
  const otherCars = carsData.filter((c) => c.id !== car.id).slice(0, 3);

  // Normalize media fields to match CarDetailClient's expected types
  const typedCar = {
    ...car,
    specs: {
      brand: car.specs.brand,
      model_name: car.specs.model_name,
      manufacturing_year: car.specs.manufacturing_year,
      body_type: car.specs.body_type,
      fuel: car.specs.fuel,
      engine_capacity: car.specs.engine_capacity,
      transmission_type: car.specs.transmission_type,
      seating_capacity: car.specs.seating_capacity,
      baggage_capacity: car.specs.baggage_capacity,
      mileage: car.specs.mileage,
      km_limit: car.specs.km_limit,
      excess_km_charge: car.specs.excess_km_charge,
      air_conditioning: car.specs.air_conditioning || "Yes",
      power_steering: car.specs.power_steering || "Yes",
      power_windows: car.specs.power_windows || "Yes",
      abs: car.specs.abs || "Yes",
      airbags: car.specs.airbags || "Dual Front Airbags",
      infotainment: car.specs.infotainment || "Standard",
      rear_camera: car.specs.rear_camera || "No",
      keyless_entry: car.specs.keyless_entry || "No",
    },
    media: car.media.map((m) => ({
      type: m.type as "image" | "video",
      url: m.url,
      alt: m.alt || `${car.name} ${car.model}`,
      featured: m.featured ?? false,
    })),
  };
  const typedOtherCars = otherCars.map((c) => ({
    ...c,
    specs: {
      brand: c.specs.brand,
      model_name: c.specs.model_name,
      manufacturing_year: c.specs.manufacturing_year,
      body_type: c.specs.body_type,
      fuel: c.specs.fuel,
      engine_capacity: c.specs.engine_capacity,
      transmission_type: c.specs.transmission_type,
      seating_capacity: c.specs.seating_capacity,
      baggage_capacity: c.specs.baggage_capacity,
      mileage: c.specs.mileage,
      km_limit: c.specs.km_limit,
      excess_km_charge: c.specs.excess_km_charge,
      air_conditioning: c.specs.air_conditioning || "Yes",
      power_steering: c.specs.power_steering || "Yes",
      power_windows: c.specs.power_windows || "Yes",
      abs: c.specs.abs || "Yes",
      airbags: c.specs.airbags || "Dual Front Airbags",
      infotainment: c.specs.infotainment || "Standard",
      rear_camera: c.specs.rear_camera || "No",
      keyless_entry: c.specs.keyless_entry || "No",
    },
    media: c.media.map((m) => ({
      type: m.type as "image" | "video",
      url: m.url,
      alt: m.alt || `${c.name} ${c.model}`,
      featured: m.featured ?? false,
    })),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarDetailClient car={typedCar} otherCars={typedOtherCars} />
    </>
  );
}
