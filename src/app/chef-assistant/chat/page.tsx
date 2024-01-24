"use client";

import { ROUTES } from "@config/routes";
import { ERROR_RESPONSES } from "@utils/helpers/auth/enums";
import { createClient } from "@utils/supabase/client";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFirestore } from "reactfire";

export default function ChefAssistant() {
  const router = useRouter();
  const supabase = createClient();
  const db = useFirestore();

  const createChat = async () => {
    const { error, data } = await supabase.auth.getUser();
    const hasError = error || !data;

    if (hasError) {
      router.push(`${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.AUTH_REQUIRED}`);
    }

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

  return <>Loading new chat...</>;
}
