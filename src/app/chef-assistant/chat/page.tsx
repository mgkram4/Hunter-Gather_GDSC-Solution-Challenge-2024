"use client";

import { useAuth } from "@/src/utils/hooks/auth-hook";
import { ROUTES } from "@config/routes";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFirestore } from "reactfire";

export default function ChefAssistant() {
  const router = useRouter();
  const db = useFirestore();

  const createChat = async () => {
    const data = await useAuth(router);

    const COLLECTION_PATHS = {
      CHATS: `users/${data.user!.id}/chats`,
      MESSAGES: `users/${data.user!.id}/chats/${data.user!.id}/messages`,
    };

    const chatCollectionRef = collection(db, COLLECTION_PATHS.CHATS);
    const newChatCollectionRef = await addDoc(chatCollectionRef, {
      createdAt: new Date(),
    });
    const messageCollectionRef = collection(db, COLLECTION_PATHS.MESSAGES);

    await addDoc(messageCollectionRef, {});

    router.push(`${ROUTES.CHEF_ASSISTANT}/${newChatCollectionRef.id}`);
  };

  // get the current user
  useEffect(() => {
    createChat();
  }, []);

  return <p className="text-center">Loading new chat...</p>;
}
