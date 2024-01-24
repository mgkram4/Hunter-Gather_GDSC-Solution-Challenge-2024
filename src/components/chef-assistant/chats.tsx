import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { ROUTES } from "../../config/routes";
import { useRouter } from "next/navigation";

export interface ChatsProps {
  chats: QuerySnapshot<DocumentData> | undefined;
}

export default function Chats({ chats }: ChatsProps) {
  const router = useRouter();

  return (
    <>
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
              router.push(`${ROUTES.CHEF_ASSISTANT}/${chat.id}`);
            }}
          >
            {chat.data().title || "New Chat"}
          </button>
        );
      })}
    </>
  );
}
