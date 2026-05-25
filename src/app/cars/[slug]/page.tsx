import { Metadata } from "next";
import { notFound } from "next/navigation";
import carsData from "@/data/cars.json";
import CarDetailClient from "./CarDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return carsData.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = carsData.find((c) => c.slug === slug);

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
      url: `https://drivana.in/cars/${car.slug}`,
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
      canonical: `https://drivana.in/cars/${car.slug}`,
    },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = carsData.find((c) => c.slug === slug);

  if (!car) {
    notFound();
  }

  // JSON-LD for individual car (Product + Offer schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${car.name} ${car.model} - Self Drive Rental`,
    description: car.description,
    image: `https://drivana.in${car.image_url}`,
    brand: {
      "@type": "Brand",
      name: car.specs.brand,
    },
    category: `${car.category} Car Rental`,
    offers: {
      "@type": "Offer",
      price: car.price_per_day,
      priceCurrency: "INR",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoRental",
        name: "DRIVANA",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Bhoothnath Road",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          postalCode: "800001",
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

  // Get other cars for "You may also like"
  const otherCars = carsData.filter((c) => c.id !== car.id).slice(0, 3);

  // Cast media type field from string to literal union (JSON imports infer string)
  const typedCar = {
    ...car,
    media: car.media.map((m) => ({ ...m, type: m.type as "image" | "video" })),
  };
  const typedOtherCars = otherCars.map((c) => ({
    ...c,
    media: c.media.map((m) => ({ ...m, type: m.type as "image" | "video" })),
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
