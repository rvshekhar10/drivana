"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { ServiceCity } from "@/types/xrmlite";

const STORAGE_KEY = "drivana_selected_city";

interface CityContextType {
  /** All active cities from the API */
  cities: ServiceCity[];
  /** Currently selected city (null = not yet selected, needs picker) */
  selectedCity: ServiceCity | null;
  /** Whether we're still loading cities from API */
  loading: boolean;
  /** Whether the city picker modal should show */
  showCityPicker: boolean;
  /** Set the selected city (persists to localStorage) */
  setCity: (city: ServiceCity) => void;
  /** Open the city picker modal manually */
  openCityPicker: () => void;
  /** Close the city picker modal */
  closeCityPicker: () => void;
}

const CityContext = createContext<CityContextType>({
  cities: [],
  selectedCity: null,
  loading: true,
  showCityPicker: false,
  setCity: () => {},
  openCityPicker: () => {},
  closeCityPicker: () => {},
});

export function CityProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<ServiceCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<ServiceCity | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCityPicker, setShowCityPicker] = useState(false);

  // Fetch cities on mount
  useEffect(() => {
    async function loadCities() {
      try {
        const res = await fetch("/api/cities");
        const data = await res.json();

        if (data.success && data.data && data.data.length > 0) {
          const activeCities: ServiceCity[] = data.data;
          setCities(activeCities);

          // Try to restore cached city
          const cached = localStorage.getItem(STORAGE_KEY);
          if (cached) {
            try {
              const parsed = JSON.parse(cached) as ServiceCity;
              // Verify the cached city is still active
              const match = activeCities.find((c) => c.id === parsed.id);
              if (match) {
                setSelectedCity(match);
                setLoading(false);
                return;
              }
            } catch {
              // Invalid cache, ignore
            }
          }

          // Auto-select if only one city
          if (activeCities.length === 1) {
            setSelectedCity(activeCities[0]);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activeCities[0]));
          } else {
            // Multiple cities, no cached selection — show picker
            setShowCityPicker(true);
          }
        } else {
          // No cities from API — default to Patna
          const defaultCity: ServiceCity = {
            id: 1,
            name: "Patna",
            slug: "patna",
            state: "Bihar",
            state_code: "BR",
            country: "India",
            country_code: "IN",
          };
          setCities([defaultCity]);
          setSelectedCity(defaultCity);
        }
      } catch {
        // API failed — default to Patna
        const defaultCity: ServiceCity = {
          id: 1,
          name: "Patna",
          slug: "patna",
          state: "Bihar",
          state_code: "BR",
          country: "India",
          country_code: "IN",
        };
        setCities([defaultCity]);
        setSelectedCity(defaultCity);
      } finally {
        setLoading(false);
      }
    }

    loadCities();
  }, []);

  const setCity = useCallback((city: ServiceCity) => {
    setSelectedCity(city);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(city));
    setShowCityPicker(false);
  }, []);

  const openCityPicker = useCallback(() => setShowCityPicker(true), []);
  const closeCityPicker = useCallback(() => {
    // Only allow close if a city is already selected
    if (selectedCity) {
      setShowCityPicker(false);
    }
  }, [selectedCity]);

  return (
    <CityContext.Provider
      value={{
        cities,
        selectedCity,
        loading,
        showCityPicker,
        setCity,
        openCityPicker,
        closeCityPicker,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
