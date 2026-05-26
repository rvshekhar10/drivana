"use client";

// Firestore is loaded lazily to avoid Turbopack SSR resolution issues.
// Import this file only in client components.

import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export { db };
