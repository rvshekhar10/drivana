/* eslint-disable @typescript-eslint/no-explicit-any */

// Firebase 12 doesn't ship .d.ts files in all environments.
declare module "firebase/analytics" {
  import { FirebaseApp } from "firebase/app";

  export interface Analytics {
    app: FirebaseApp;
  }

  export function getAnalytics(app?: FirebaseApp): Analytics;
  export function isSupported(): Promise<boolean>;
  export function logEvent(analytics: Analytics, eventName: string, eventParams?: any): void;
}
