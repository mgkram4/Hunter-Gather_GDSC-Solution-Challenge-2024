"use client";

import { ROUTES } from "@/src/config/routes";
import { createClient } from "@/src/utils/supabase/client";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useParams } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";
import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreCollectionData,
} from "reactfire";

export default function ChefAssistant() {
  const supabase = createClient();
  const params = useParams();
  const [message, setMessage] = useState<string>("");

  const chatCollectionRef = collection(
    useFirestore(),
    `users/${params.uid}/chats/${params.cid}/messages`
  );
  const messages = useFirestoreCollection(chatCollectionRef);

  const handleSendMessages = async () => {
    await addDoc(chatCollectionRef, { prompt: message });
  };

  return (
    <>
      {messages.data?.docs.map((doc) => {
        return (
          <div>
            {doc.data().prompt} <br />{" "}
            {doc.data().response ? doc.data().response : "No response yet"}
          </div>
        );
      })}
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendMessages}>Send</button>
    </>
  );
}
