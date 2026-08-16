"use client";

import { useState, useEffect } from "react";
import { fetchListings } from "@/lib/api-client";
import type { AssetListing } from "@/types/xrmlite";

interface UseListingsOptions {
  city?: string;
  cityId?: number;
  category?: number;
  brand?: number;
}

/**
 * Hook to fetch asset listings from the XRMlite API.
 * No static fallback — purely API-driven.
 */
export function useListings(options?: UseListingsOptions) {
  const { city, cityId, category, brand } = options || {};

  const [listings, setListings] = useState<AssetListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "static">("api");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchListings({ city, cityId, category, brand });

        if (cancelled) return;

        if (result.success && result.data) {
          setListings(result.data);
          setSource(result.source === "api" ? "api" : "static");
        } else {
          setListings([]);
          setSource("api");
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to fetch");
        setListings([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [city, cityId, category, brand]);

  return { listings, loading, source, error };
}
