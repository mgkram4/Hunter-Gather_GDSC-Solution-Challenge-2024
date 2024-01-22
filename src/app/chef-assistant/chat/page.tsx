"use client";

import { ROUTES } from "@/src/config/routes";
import { createClient } from "@/src/utils/supabase/client";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { add } from "husky";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  useFirebaseApp,
  useFirestore,
  useFirestoreCollectionData,
} from "reactfire";

export default function ChefAssistant() {
  const router = useRouter();
  const supabase = createClient();
  const db = useFirestore();

  const createChat = async () => {
    const { error, data } = await supabase.auth.getUser();

    if (!data || error) {
      router.push(
        `${ROUTES.SIGNIN}?error=${"You must be signed in to access this page."}`
      );
    }

    const chatCollectionRef = collection(db, `users/${data.user!.id}/chats`);
    const newChatCollectionRef = await addDoc(chatCollectionRef, {});
    const messageCollectionRef = collection(db, `users/${data.user!.id}/chats/${newChatCollectionRef.id}/messages`);

    await addDoc(messageCollectionRef, {});

    router.push(`${ROUTES.CHEF_ASSISTANT}/uid/${data.user?.id}/cid/${newChatCollectionRef.id}`);
  };

  // get the current user
  useEffect(() => {
    createChat();
  }, []);

  return <>hi</>;
}
