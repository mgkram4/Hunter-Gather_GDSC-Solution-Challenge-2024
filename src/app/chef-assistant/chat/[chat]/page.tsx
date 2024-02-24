"use client";

import Chats from "@components/chef-assistant/chats";
import Messages from "@components/chef-assistant/messages";
import { ROUTES } from "@config/routes";
import { ERROR_RESPONSES } from "@utils/helpers/auth/enums";
import { createClient } from "@utils/supabase/client";
import { set } from "date-fns";
import {
  CollectionReference,
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

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SuspenseWithPerf, useFirestore } from "reactfire";

export default function ChefAssistant() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const db = useFirestore();

  const [prompt, setPrompt] = useState<string>();
  const [messages, setMessages] = useState<QuerySnapshot<DocumentData>>();
  const [chats, setChats] = useState<QuerySnapshot<DocumentData>>();
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const updateHooks = async (
    messagesCollectionRef: CollectionReference<DocumentData>,
    chatsCollectionRef: CollectionReference<DocumentData>,
  ) => {
    const chatsQuery = query(chatsCollectionRef, orderBy("createdAt", "desc"));
    const messagesQuery = query(
      messagesCollectionRef,
      orderBy("createTime", "asc"),
    );

    const chatsDocs = await getDocs(chatsQuery);
    const messageDocs = await getDocs(messagesQuery);

    onSnapshot(messagesQuery, (snapshot) => {
      setMessages(snapshot);
    });
    onSnapshot(chatsQuery, (snapshot) => {
      setChats(snapshot);
    });

    setChats(chatsDocs);
    setMessages(messageDocs);
  };

  const loadData = async () => {
    const { error, data } = await supabase.auth.getUser();
    const hasError = error || !data;

    if (hasError) {
      router.push(`${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.AUTH_REQUIRED}`);
    }
    setUserId(data.user!.id);

    const COLLECTION_PATHS = {
      CHATS: `users/${data.user?.id}/chats`,
      MESSAGES: `users/${data.user?.id}/chats/${params.chat}/messages`,
    };

    const chatsCollectionRef = collection(db, COLLECTION_PATHS.CHATS);
    const messagesCollectionRef = collection(db, COLLECTION_PATHS.MESSAGES);

    await updateHooks(messagesCollectionRef, chatsCollectionRef);
  };

  const handleSendMessages = async () => {
    setLoading(true);
    const COLLECTION_PATHS = {
      CHATS: `users/${userId}/chats/${params.chat}`,
      MESSAGES: `users/${userId}/chats/${params.chat}/messages`,
    };

    const messageCollectionRef = collection(db, COLLECTION_PATHS.MESSAGES);

    await addDoc(messageCollectionRef, { prompt: prompt });
    await updateDoc(doc(db, COLLECTION_PATHS.CHATS), {
      title: messages?.docs[0]?.data().prompt || prompt,
    });

    setPrompt("");
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-secondary via-ghost to-white m-4 rounded-xl border-2 border-slate-200">
      <div className={"flex w-full h-full"}>
        {/* TODO: get specific sizes added into figma */}
        <div className="w-1/5 flex flex-col text-center border-l-2 border-r-2 border-slate-200">
          {chats ? <Chats chats={chats} /> : "Loading..."}
        </div>
        <div className={"w-4/5 flex flex-col h-full"}>
          <h1 className={"text-xl ml-2"}>Chef Assistant</h1>

          <div className="h-full flex flex-col overflow-y-scroll">
            {messages ? (
              <Messages messages={messages} />
            ) : (
              <div className="flow-root ml-2 mr-2">
                <div className={"bg-green-800 text-white rounded-md p-2 w-fit"}>
                  Loading...
                </div>
                <div
                  className={
                    "float-right right-0 bg-neutral-200 px-2 w-fit max-w-[50%] rounded-md"
                  }
                >
                  Loading...
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 mb-4"></div>
          <div
            className={"flex border-y-2 border-r-2 border-slate-200 bg-white"}
          >
            <input
              className={"w-[90%] h-16"}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              type="text"
              placeholder="Type here..."
              value={prompt}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessages();
                }
              }}
            />
            <button
              className={
                "p-2 bg-primary hover:opacity-90 cursor-pointer active:bg-secondary"
              }
              onClick={handleSendMessages}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
