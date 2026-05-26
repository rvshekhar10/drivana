/* eslint-disable @typescript-eslint/no-explicit-any */

// Firebase 12 doesn't ship .d.ts files in all environments.
// This declaration file provides the Firestore types we use.
declare module "firebase/firestore" {
  import { FirebaseApp } from "firebase/app";

  export interface Firestore {
    app: FirebaseApp;
    type: string;
  }

  export interface DocumentReference {
    id: string;
    path: string;
    parent: CollectionReference;
  }

  export interface CollectionReference {
    id: string;
    path: string;
    parent: DocumentReference | null;
  }

  export interface DocumentSnapshot {
    id: string;
    ref: DocumentReference;
    exists(): boolean;
    data(): any;
    get(fieldPath: string): any;
  }

  export interface QuerySnapshot {
    docs: DocumentSnapshot[];
    size: number;
    empty: boolean;
    forEach(callback: (doc: DocumentSnapshot) => void): void;
  }

  export function getFirestore(app?: FirebaseApp): Firestore;
  export function collection(firestore: Firestore, path: string, ...pathSegments: string[]): CollectionReference;
  export function doc(firestore: Firestore, path: string, ...pathSegments: string[]): DocumentReference;
  export function doc(reference: CollectionReference, path?: string, ...pathSegments: string[]): DocumentReference;
  export function getDoc(reference: DocumentReference): Promise<DocumentSnapshot>;
  export function getDocs(query: any): Promise<QuerySnapshot>;
  export function setDoc(reference: DocumentReference, data: any, options?: any): Promise<void>;
  export function updateDoc(reference: DocumentReference, data: any): Promise<void>;
  export function deleteDoc(reference: DocumentReference): Promise<void>;
  export function addDoc(reference: CollectionReference, data: any): Promise<DocumentReference>;
  export function query(query: any, ...queryConstraints: any[]): any;
  export function where(fieldPath: string, opStr: string, value: any): any;
  export function orderBy(fieldPath: string, directionStr?: string): any;
  export function limit(limit: number): any;
  export function serverTimestamp(): any;
  export const Timestamp: any;
}
