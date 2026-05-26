/* eslint-disable @typescript-eslint/no-explicit-any */

// Firebase 12 doesn't ship .d.ts files in all environments.
// This declaration file provides the types we use.
declare module "firebase/auth" {
  import { FirebaseApp } from "firebase/app";

  export interface User {
    uid: string;
    phoneNumber: string | null;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: any;
    providerData: any[];
    refreshToken: string;
    tenantId: string | null;
    delete(): Promise<void>;
    getIdToken(forceRefresh?: boolean): Promise<string>;
    getIdTokenResult(forceRefresh?: boolean): Promise<any>;
    reload(): Promise<void>;
    toJSON(): object;
  }

  export interface Auth {
    app: FirebaseApp;
    currentUser: User | null;
    languageCode: string | null;
    tenantId: string | null;
  }

  export interface ConfirmationResult {
    verificationId: string;
    confirm(verificationCode: string): Promise<{ user: User }>;
  }

  export interface ApplicationVerifier {
    type: string;
    verify(): Promise<string>;
  }

  export class RecaptchaVerifier implements ApplicationVerifier {
    constructor(auth: Auth, container: string | HTMLElement, parameters?: object);
    type: string;
    clear(): void;
    render(): Promise<number>;
    verify(): Promise<string>;
  }

  export type Unsubscribe = () => void;

  export function getAuth(app?: FirebaseApp): Auth;
  export function onAuthStateChanged(
    auth: Auth,
    nextOrObserver: (user: User | null) => void
  ): Unsubscribe;
  export function signOut(auth: Auth): Promise<void>;
  export function signInWithPhoneNumber(
    auth: Auth,
    phoneNumber: string,
    appVerifier: ApplicationVerifier
  ): Promise<ConfirmationResult>;
}
