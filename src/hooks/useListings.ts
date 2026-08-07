"use client";

import { useState, useEffect } from "react";
import { fetchListings } from "@/lib/api-client";
import carsData from "@/data/cars.json";
import type { AssetListing } from "@/types/xrmlite";

interface UseListingsOptions {
  city?: string;
  category?: number;
  brand?: number;
}

/**
 * Hook to fetch asset listings from the XRMlite API with automatic fallback
 * to the local static cars.json data.
 */
export function useListings(options?: UseListingsOptions) {
  const { city, category, brand } = options || {};

  const [listings, setListings] = useState<AssetListing[]>(
    carsData as unknown as AssetListing[]
  );
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "static">("static");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchListings({ city, category, brand });

        if (cancelled) return;

        if (result.success && result.data && result.data.length > 0) {
          setListings(result.data);
          setSource(result.source === "api" ? "api" : "static");
        } else {
          // API returned empty or failed — use static data
          setListings(carsData as unknown as AssetListing[]);
          setSource("static");
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to fetch");
        setListings(carsData as unknown as AssetListing[]);
        setSource("static");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [city, category, brand]);

  return { listings, loading, source, error };
}
