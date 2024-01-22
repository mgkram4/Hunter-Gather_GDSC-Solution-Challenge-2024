"use client";

import { ROUTES } from "@/src/config/routes";
import { createClient } from "@/src/utils/supabase/client";
import { update } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";
import {
  useFirebaseApp,
  useFirestore,
  useFirestoreCollection,
  useFirestoreCollectionData,
} from "reactfire";

export default function ChefAssistant() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const db = useFirestore();
  const [message, setMessage] = useState<string>("");

  const chatsCollectionRef = collection(db, `users/${params.uid}/chats`);
  const messageCollectionRef = collection(
    db,
    `users/${params.uid}/chats/${params.cid}/messages`
  );

  const chatsQuery = query(chatsCollectionRef, orderBy("createdAt", "desc"));

  const messages = useFirestoreCollection(messageCollectionRef);
  const chats = useFirestoreCollection(chatsQuery);

  const handleSendMessages = async () => {
    await addDoc(messageCollectionRef, { prompt: message });

    await updateDoc(doc(db, `users/${params.uid}/chats/${params.cid}`), {
      title: messages.data?.docs[0].data().prompt || message,
    });
    setMessage("");
  };

  return (
    <div className={"flex h-full"}>
      {/* TODO: get specific sizes added into figma */}
      <div className="w-1/5 flex flex-col text-center h-screen border-gray-700 border-2">
        <button
          className={"border-2 border-gray-700 w-full"}
          onClick={() => {
            router.push(ROUTES.CHEF_ASSISTANT);
          }}
        >
          Start a new chat
        </button>
        {chats.data?.docs.map((chat) => {
          return (
            <button
              className="border-2 border-gray-700 w-full"
              onClick={() => {
                router.push(
                  `${ROUTES.CHEF_ASSISTANT}/uid/${params.uid}/cid/${chat.id}`
                );
              }}
            >
              {chat.data().title || "New Chat"}
            </button>
          );
        })}
      </div>
      <div className={"w-4/5 flex flex-col h-screen"}>
        <h1 className={"text-xl ml-2"}>Chef Assistant</h1>
        <div className={"overflow-scroll"}>
          {messages.data?.docs.map((doc) => {
            return (
              doc.data().prompt && (
                <div className="flow-root ml-2 mr-2 flex-grow">
                  <div
                    className={"bg-green-800 text-white rounded-md p-2 w-fit"}
                  >
                    {doc.data().prompt}
                  </div>
                  <div
                    className={
                      "float-right right-0 bg-neutral-200 p-2 w-fit max-w-[50%] rounded-md"
                    }
                  >
                    {doc.data().status &&
                    doc.data().status.state === "COMPLETED"
                      ? doc.data().response
                      : "Loading.."}
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div
          className={
            "flex w-full aboslute border-y-2 border-r-2 border-gray-700 bottom-0 h-10"
          }
        >
          <input
            className={"w-[90%]"}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            placeholder="Type here..."
            value={message}
          />
          <button className={"p-2"} onClick={handleSendMessages}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
