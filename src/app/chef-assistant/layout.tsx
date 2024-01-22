"use client";

import { FirebaseAppProvider } from "reactfire";
import { FIREBASE_CONFIG } from "@/src/config/constants";

export default function ChefAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <FirebaseAppProvider firebaseConfig={FIREBASE_CONFIG}>{children}</FirebaseAppProvider>
  );
}
