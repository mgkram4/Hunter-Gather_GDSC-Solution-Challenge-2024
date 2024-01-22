"use client";

import {
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
  useFirestore,
} from "reactfire";
import { FIREBASE_CONFIG } from "@/src/config/constants";
import { firestore } from "firebase-admin";
import { getFirestore } from "firebase/firestore";

export default function ChefAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const firebaseInstance = getFirestore(useFirebaseApp());
  return <FirestoreProvider sdk={firebaseInstance}>{children}</FirestoreProvider>;
}
