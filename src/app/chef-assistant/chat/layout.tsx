"use client";

import { FirestoreProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from "firebase/firestore";

export default function ChefAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const firebaseInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firebaseInstance}>{children}</FirestoreProvider>
  );
}
