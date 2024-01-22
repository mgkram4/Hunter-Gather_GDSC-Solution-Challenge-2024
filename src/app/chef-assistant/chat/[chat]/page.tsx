"use client";

import { ROUTES } from "@/src/config/routes";
import { createClient } from "@/src/utils/supabase/client";
import { on } from "events";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { getFirestore } from "firebase/firestore";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ObservableStatus,
  useFirebaseApp,
  useFirestore,
  useFirestoreCollection,
} from "reactfire";

export default function ChefAssistant() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const db = useFirestore();

  const [prompt, setPrompt] = useState<string>();
  const [messages, setMessages] = useState<QuerySnapshot<DocumentData>>();
  const [chats, setChats] = useState<QuerySnapshot<DocumentData>>();
  const [userId, setUserId] = useState<string>("");

  const loadData = async () => {
    const { error, data } = await supabase.auth.getUser();

    if (!data || error) {
      router.push(
        `${ROUTES.SIGNIN}?error=${"You must be signed in to access this page."}`
      );
    }
    setUserId(data.user!.id);

    const chatsCollectionRef = collection(db, `users/${data.user!.id}/chats`);
    const messagesCollectionRef = collection(
      db,
      `users/${data.user!.id}/chats/${params.chat}/messages`
    );
    const messageDocs = await getDocs(messagesCollectionRef);

    const chatsQuery = query(chatsCollectionRef, orderBy("createdAt", "desc"));
    const chatsDocs = await getDocs(chatsQuery);

    onSnapshot(messagesCollectionRef, (snapshot) => {
      setMessages(snapshot);
    });
    onSnapshot(chatsQuery, (snapshot) => {
      setChats(snapshot);
    });

    setChats(chatsDocs);
    setMessages(messageDocs);
  };

  const handleSendMessages = async () => {
    const messageCollectionRef = collection(
      db,
      `users/${userId}/chats/${params.chat}/messages`
    );

    await addDoc(messageCollectionRef, { prompt: prompt });

    await updateDoc(doc(db, `users/${userId}/chats/${params.chat}`), {
      title: messages!.docs[messages!.docs.length - 1].data().prompt || prompt,
    });
    setPrompt("");
  };

  useEffect(() => {
    loadData();
  }, []);

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
        {chats?.docs.map((chat) => {
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
          {messages?.docs.map((doc) => {
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
              setPrompt(e.target.value);
            }}
            type="text"
            placeholder="Type here..."
            value={prompt}
          />
          <button className={"p-2"} onClick={handleSendMessages}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
