import { DocumentData, QuerySnapshot } from "firebase/firestore";

export interface MessagesProps {
  messages: QuerySnapshot<DocumentData> | undefined;
}

export default function Messages({ messages }: MessagesProps) {
  return messages?.docs.map((doc) => {
    return (
      doc.data().prompt && (
        <div className="flow-root ml-2 mr-2 flex-grow">
          <div className={"bg-green-800 text-white rounded-md p-2 w-fit"}>
            {doc.data().prompt}
          </div>
          <div
            className={
              "float-right right-0 bg-neutral-200 p-2 w-fit max-w-[50%] rounded-md"
            }
          >
            {doc.data().status && doc.data().status.state === "COMPLETED"
              ? doc.data().response
              : doc.data().status && doc.data().status.state === "ERROR"
                ? `Gemini Error: ${doc.data().status.error}`
                : "Loading..."}
          </div>
        </div>
      )
    );
  });
}
